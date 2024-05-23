import { Component, OnInit } from '@angular/core';
import { ParseService } from '../services/parse.service';
import { DatePipe } from '@angular/common';

import { interval } from 'rxjs';
@Component({
  selector: 'app-current-orders',

  templateUrl: './current-orders.component.html',
  
  styleUrls: ['./current-orders.component.css'],
})
export class CurrentOrdersComponent implements OnInit{


  orders: any[] = []; // Using any for simplicity
  user:any;
  orderId:string='';
  constructor(private parseService: ParseService , public datePipe: DatePipe) {
 
  }

 

  ngOnInit() {
    this.loadOrders();
    this.user = this.parseService.user;
    interval(1000).subscribe(() => {
      this.updateTimers();
    });
  }

  async loadOrders() {
    try {
      console.log('inside function');
      this.orders = await this.parseService.getOrders();
      this.updateTimers(); 
      // console.log(this.orders);
      // console.log('inside function q');
    } catch (error) {
      console.error('Error loading orders', error);
    }
  }

  updateTimers() {
    const now = new Date();
  
    this.orders.forEach(async (order: any) => {
      const createdAt = new Date(order.created);
      const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
      const deadline = new Date(createdAt.getTime() + order.orderDay * millisecondsPerDay);
      const timeRemaining = this.getTimeRemaining(deadline, now);
      order.timeLeft = timeRemaining.formatted;
      order.isExpired = timeRemaining.expired;
  
      // Check if the order time is expired
      if (timeRemaining.expired) {
        // Call a method to move the order to incompleteOrders and remove it from orders
        await this.handleIncompleteOrder(order);
      }
    });
  }
  
  async handleIncompleteOrder(order: any) {
    try {
      const result = await this.parseService.moveToIncompleteOrders(order.objectId);
      if (result.status == 1) {
        // Remove the order from the orders array
        this.orders = this.orders.filter(o => o.objectId !== order.objectId);
      } else {
        console.error('Error moving order to incompleteOrders', result.message);
      }
    } catch (error) {
      console.error('Error in handleIncompleteOrder', error);
    }
  }
  
  
  

  getTimeRemaining(endtime: Date, now: Date) {
    const total = Date.parse(endtime.toString()) - Date.parse(now.toString());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
   
    const isExpired = total <= 0; // Check if the time left is 0 or less
    return {
      formatted: `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`,
      expired: isExpired
    };
  }

 async onComplete(id:string){
  const confirmation = confirm('Are you sure you have completed the order? This action cannot be undone.');
  if(confirmation){
this.orderId=id;
 const result = await  this.parseService.onCompleteFunction(this.orderId);
 if(result.status==1){
  alert('order completed and move to history');
 }
else{
  alert('error in completing order');
}
     
  }
}
}

