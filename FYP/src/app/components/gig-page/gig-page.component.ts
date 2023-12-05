import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ParseService } from 'src/app/services/parse.service';
import * as Parse from 'parse';

@Component({
  selector: 'app-gig-page',
  templateUrl: './gig-page.component.html',
  styleUrls: ['./gig-page.component.css']
})
export class GigPageComponent {
[x: string]: any;

  constructor(private service: ParseService, private authService: AuthService, private router: Router) { }

  // async next_to_img(
  //   gigtitle: HTMLInputElement,
  //   category: HTMLSelectElement,
  //   discription :HTMLTextAreaElement,
  //   pricediscription: HTMLTextAreaElement,
  //   dileverytime:HTMLSelectElement,
  //   price: HTMLInputElement
  // ) {

  //   await this.service.gig_info_add({
  //     gigtitle: gigtitle.value,
  //     category: category.value,
  //     discription: discription.value,
    
  //     pricediscription: pricediscription.value,
  //     dileverytime: dileverytime.value,
  //     price: +price.value  // convert string to number using the unary plus operator
  //   });
  // }

  // async gigInfoAdd(gigtitle: HTMLInputElement, category: HTMLInputElement, discription: HTMLInputElement,pricediscription:HTMLInputElement,dileverytime:HTMLInputElement,price:HTMLInputElement){
  //   const gig_title = gigtitle.value;
  //   const categoryies = category.value;
  //   const discriptions = discription.value;
  //   const pricediscriptions = pricediscription.value;
  //   const dilevery_time = dileverytime.value;
  //   const prices = price.value;
  
  //   await this.service.gig_info_add(gig_title,categoryies,discriptions,pricediscriptions,dilevery_time,prices);
  //   return true;
  // }

  async gigInfoAdd(gigtitle: string, category:string, discription: string,pricediscription:string,dileverytime:string,price:string){
    alert('gig created successfully');
    const numericPrice: number = parseFloat(price);
    await this.service.gig_info_add(gigtitle,category,discription,pricediscription,dileverytime, numericPrice);
    return true;
  }
  

  // gig_to_img() {
  //   this.router.navigate(['/home-after-login']);
  // }
}
