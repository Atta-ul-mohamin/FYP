import { Component, OnInit } from '@angular/core';
import { ParseService } from '../services/parse.service';
import { interval } from 'rxjs';
@Component({
  selector: 'app-current-orders',

  templateUrl: './current-orders.component.html',
  styleUrl: './current-orders.component.css'
})
export class CurrentOrdersComponent implements OnInit{


  orders: any[] = []; // Using any for simplicity
  user:any;
  orderId:string='';
  constructor(private parseService: ParseService) {
 
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
      console.log(this.orders);
      console.log('inside function q');
    } catch (error) {
      console.error('Error loading orders', error);
    }
  }

  updateTimers() {
    const now = new Date();
    console.log("Current time:", now);
  
    this.orders.forEach(order => {
      const createdAt = new Date(order.created);
      console.log("Order created at:", createdAt);
  
      // Calculate the deadline by adding days in milliseconds
      const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
      const deadline = new Date(createdAt.getTime() + order.orderDay * millisecondsPerDay);
  
      console.log("Deadline for order:", deadline);
  
      order.timeLeft = this.getTimeRemaining(deadline, now);
      console.log("Time left for order:", order.timeLeft);
    });
  }
  
  

  getTimeRemaining(endtime: Date, now: Date) {
    const total = Date.parse(endtime.toString()) - Date.parse(now.toString());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
   
    // return `${days} days ${hours} hours ${minutes} minutes`;
    return `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
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

