import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WritePrescriptionComponent } from './components/write-prescription/write-prescription.component';
import { ShippingInfoComponent } from './components/shipping-info/shipping-info.component';
import { Router, RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { BlockchainService } from './services/blockchain.service'
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    WritePrescriptionComponent,
    ShippingInfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path: '', component: WritePrescriptionComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'shipping-info', component: ShippingInfoComponent},
    ])
  ],
  providers: [BlockchainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
