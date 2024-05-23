import { Component , OnInit } from '@angular/core';
import { ParseService } from '../services/parse.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-incomplete-orders',
  templateUrl: './incomplete-orders.component.html',
  styleUrl: './incomplete-orders.component.css'
})
export class IncompleteOrdersComponent {
  orders: any[] = []; // Using any for simplicity
  user:any;
  orderId:string='';
  constructor(private parseService: ParseService ,  public datePipe: DatePipe) {
 
  }

 

  ngOnInit() {
    this.loadIncompleteOrders();
    this.user = this.parseService.user;
  
  }

  async loadIncompleteOrders() {
    try {
      console.log('inside function');
      this.orders = await this.parseService.getIncompleteOrders();
      console.log(this.orders);
      console.log('inside function q');
    } catch (error) {
      console.error('Error loading orders', error);
    }
  }
}
