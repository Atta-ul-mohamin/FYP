import { Component, OnInit } from '@angular/core';
import { ParseService } from '../services/parse.service';
@Component({
  selector: 'app-current-orders',

  templateUrl: './current-orders.component.html',
  styleUrl: './current-orders.component.css'
})
export class CurrentOrdersComponent implements OnInit{


  orders: any[] = []; // Using any for simplicity
  user:any;
  constructor(private parseService: ParseService) {
 
  }

 

  ngOnInit() {
    this.loadOrders();
    this.user = this.parseService.user;
  }

  async loadOrders() {
    try {
      console.log('inside function');
      this.orders = await this.parseService.getOrders();
      console.log(this.orders);
      console.log('inside function q');
    } catch (error) {
      console.error('Error loading orders', error);
    }
  }

}
