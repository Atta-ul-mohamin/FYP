import { Component, OnInit } from '@angular/core';
import { ParseService } from '../services/parse.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-historyorders',
  templateUrl: './historyorders.component.html',
<<<<<<< Updated upstream
  styleUrls: ['./historyorders.component.css'] // Corrected property name from 'styleUrl' to 'styleUrls'
=======
  styleUrls: ['./historyorders.component.css'],
>>>>>>> Stashed changes
})
export class HistoryordersComponent implements OnInit {
  
  orders: any[] = [];
  user: any;
  orderId: string = '';

  constructor(private parseService: ParseService , public datePipe: DatePipe) { }

  ngOnInit() {
    this.loadOrders();
    this.user = this.parseService.user;
  }

  async loadOrders() {
    try {
      console.log('Loading history orders');
      this.orders = await this.parseService.getHistoryOrders();
      this.orders.forEach(order => {
        order.timeCompletion = this.timeCompletion(order.orderDate, order.completion);
      });
      console.log(this.orders);
    } catch (error) {
      console.error('Error loading orders', error);
    }
  }

  timeCompletion(orderDate: string, completionDate: string): string {
    const orderDateObj = new Date(orderDate);
    const completionDateObj = new Date(completionDate);

    // Calculate the difference in milliseconds
    const diff = completionDateObj.getTime() - orderDateObj.getTime();

    // Calculate days, hours, minutes
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${days} day${days !== 1 ? 's' : ''} ${hours} hour${hours !== 1 ? 's' : ''} ${minutes} minute${minutes !== 1 ? 's' : ''}`;
  }
}
