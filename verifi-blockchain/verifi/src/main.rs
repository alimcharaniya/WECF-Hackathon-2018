extern crate verifi;
extern crate exonum;

use exonum::node::Node;
use exonum::storage::MemoryDB;
use verifi::CurrencyService;
use verifi::node_config;

// Service identifier
const SERVICE_ID: u16 = 1;
// Identifier for wallet creation transaction type
const TX_CREATE_PROFILE_ID: u16 = 1;
// Identifier for send prescription transaction type
const TX_SEND_PRESCRIPTION_ID: u16 = 2;



fn main() {
    exonum::helpers::init_logger().unwrap();
    
     println!("Creating in-memory database...");
    let node = Node::new(
        Box::new(MemoryDB::new()),
        vec![Box::new(CurrencyService)],
        node_config(),
    );
    println!("Starting a single node...");
    println!("Blockchain is ready for transactions!");
    node.run().unwrap();
}
