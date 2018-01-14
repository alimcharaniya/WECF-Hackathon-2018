#!/bin/bash

set -e

# Exit status
STATUS=0

# Launches the cryptocurrency demo and waits until it starts listening
# on the TCP port 8000.
function launchServer {
    cd ..
    cd verifi
    cargo run &
    CTR=0
    MAXCTR=60
    while [[ ( -z `lsof -iTCP -sTCP:LISTEN -n -P 2>/dev/null |  awk '{ if ($9 == "*:8000") { print $2 } }'` ) && ( $CTR -lt $MAXCTR ) ]]; do
      sleep 1
      CTR=$(( $CTR + 1 ))
    done
    if [[ $CTR == $MAXCTR ]]; then
        echo "Failed to launch the server; aborting"
        exit 1
    fi
    cd ..
    cd examples
}

# Kills whatever program is listening on the TCP port 8000, on which the cryptocurrency
# demo needs to bind to.
function killServer {
    SERVER_PID=`lsof -iTCP -sTCP:LISTEN -n -P 2>/dev/null |  awk '{ if ($9 == "*:8000") { print $2 } }'`
    if [[ -n $SERVER_PID ]]; then
        kill -9 $SERVER_PID
    fi
}

# Creates a wallet in the cryptocurrency demo.
#
# Arguments:
# - $1: filename with the transaction data
function createWallet {
    RESP=`curl -H "Content-Type: application/json" -X POST -d @$1 http://127.0.0.1:8000/api/services/cryptocurrency/v1/wallets 2>/dev/null`
}

# Performs a transfer in the cryptocurrency demo.
#
# Arguments:
# - $1: filename with the transaction data
function transfer {
    RESP=`curl -H "Content-Type: application/json" -X POST -d @$1 http://127.0.0.1:8000/api/services/cryptocurrency/v1/wallets/transfer 2>/dev/null`
}

function requestPerscription {
    echo "IM HERE REQUESTING THE API";
     RESP=`curl -H "Content-Type: application/json" -X POST -d @$1 http://127.0.0.1:8000/api/services/cryptocurrency/v1/wallet/requestPerscription 2>/dev/null`
}

# Checks a response to an Exonum transaction.
#
# Arguments:
# - $1: expected start of the transaction hash returned by the server
function checkTransaction {
    if [[ `echo $RESP | jq .tx_hash` =~ ^\"$1 ]]; then
        echo "OK, got expected transaction hash $1"
    else
        echo "Unexpected response: $RESP"
        STATUS=1
    fi
}

# Checks a response to a read request.
#
# Arguments:
# - $1: expected user name
# - $2: expected user balance
# - $3: response JSON that encodes user's wallet information
function checkRequest {
    if [[ ( `echo $3 | jq .name` == "\"$1\"" ) && ( `echo $3 | jq .balance` == "\"$2\"" ) ]]; then
        echo "OK, got expected transaction balance $2 for user $1"
    else
        # $RESP here is intentional; we want to output the entire incorrect response
        echo "Unexpected response: $RESP"
        STATUS=1
    fi
}

# Checks a `TxCreateWallet` transaction in the blockchain explorer.
#
# Arguments:
# - $1: expected user name
# - $2: expected transaction JSON
# - $3: response JSON
function checkCreateTx {
    if [[ \
      ( `echo $3 | jq .type` == \"Committed\" ) && \
      ( `echo $3 | jq .content.body.name` == "\"$1\"" ) && \
      ( `echo $3 | jq ".content == $2"` == "true" ) \
    ]]; then
        echo "OK, got expected TxCreateWallet for user $1"
    else
        echo "Unexpected response: $3"
        STATUS=1
    fi
}

# Checks a `TxCreateWallet` transaction in the blockchain explorer.
#
# Arguments:
# - $1: expected transaction JSON
# - $2: response JSON
function checkTransferTx {
    if [[ \
      ( `echo $2 | jq .type` == \"Committed\" ) && \
      ( `echo $2 | jq ".content == $1"` == "true" ) \
    ]]; then
        echo "OK, got expected TxTransfer between wallets"
    else
        echo "Unexpected response: $2"
        STATUS=1
    fi
}

killServer
#Launch server listener in main.rs for Exonum node  
launchServer

# CREATE WALLETS 
createWallet create-wallet-3.json

echo "TEST REQUEST PERSCRIPTION..."
# requestPerscription create-wallet-1.json

# createWallet create-wallet-1.json
checkTransaction 44c6c2c5

# echo "Creating a wallet for Janie..."
# createWallet create-wallet-2.json
# checkTransaction 8714e906

# echo "Transferring funds from Johnny to Janie"
# transfer transfer-funds.json
# checkTransaction e63b28ca

# echo "Waiting until transactions are committed..."
# sleep 7

# echo "Retrieving info on all wallets..."
# RESP=`curl http://127.0.0.1:8000/api/services/cryptocurrency/v1/wallets 2>/dev/null`
# # Wallet records in the response are deterministically ordered by increasing
# # public key. As Johnny's pubkey is lexicographically lesser than Janie's, it it possible to
# # determine his wallet as .[0] and hers as .[1].
# # checkRequest "Johnny Doe" 90 "`echo $RESP | jq .[0]`"
# # checkRequest "Janie Roe" 110 "`echo $RESP | jq .[1]`"

# echo "Retrieving info on Johnny's wallet..."
# RESP=`curl http://127.0.0.1:8000/api/services/cryptocurrency/v1/wallet/03e657ae71e51be60a45b4bd20bcf79ff52f0c037ae6da0540a0e0066132b472 2>/dev/null`
# # checkRequest "Johnny Doe" 90 "$RESP"

# echo "Retrieving Johnny's transaction info..."
# TXID=44c6c2c58eaab71f8d627d75ca72f244289bc84586a7fb42186a676b2ec4626b
# RESP=`curl http://127.0.0.1:8000/api/system/v1/transactions/$TXID 2>/dev/null`
# EXP=`cat create-wallet-1.json`
# checkCreateTx "Johnny Doe" "$EXP" "$RESP"

# echo "Retrieving transfer transaction info..."
# TXID=e63b28caa07adffb6e2453390a59509a1469e66698c75b4cfb2f0ae7a6887fdc
# RESP=`curl http://127.0.0.1:8000/api/system/v1/transactions/$TXID 2>/dev/null`
# EXP=`cat transfer-funds.json`
# checkTransferTx "$EXP" "$RESP"

killServer
exit $STATUS
