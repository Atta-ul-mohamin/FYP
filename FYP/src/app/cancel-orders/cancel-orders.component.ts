import { Component , OnInit } from '@angular/core';
import { ParseService } from '../services/parse.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-cancel-orders',
  templateUrl: './cancel-orders.component.html',
  styleUrls: ['./cancel-orders.component.css']
})
export class CancelOrdersComponent {
  orders: any[] = []; // Using any for simplicity
  user:any;
  orderId:string='';
  constructor(private parseService: ParseService ,  public datePipe: DatePipe) {
 
  }

 

  ngOnInit() {
    this.loadCancelOrders();
    this.user = this.parseService.user;
  
  }

  async loadCancelOrders() {
    try {
      console.log('inside function');
      this.orders = await this.parseService.getCancelOrders();
      console.log(this.orders);
      console.log('inside function q');
    } catch (error) {
      console.error('Error loading orders', error);
    }
  }


}
