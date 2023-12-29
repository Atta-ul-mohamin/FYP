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
selectedCategory: string = '';
selectedType: string = '';
title : string = '';
description_about_work : string = '';
description_about_price: string = '';
min_days: string = '';
max_days: string = '';
price : string = '';

  constructor(private service: ParseService, private authService: AuthService, private router: Router) { }

  onCategoryChange(category: string) {
    this.selectedCategory = category;
  }

  onTypeChange(type: string) {
    this.selectedType = type;
  }


 

  async gigInfoAdd(category:string,gigtitle: string,  discription_about_work: string,price:string,discription_about_price: string, type:string, min_price:string,max_price:string  ){
    alert('gig created successfully');
    
    await this.service.gig_info_add(category,gigtitle,discription_about_work,price,discription_about_price,type, min_price , max_price);
    return true;
  }


  
}
