import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ParseService } from 'src/app/services/parse.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 


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
skillLevel :string = '';
price : string = '';
selectedLevel: string = '';
selectedPrice1: boolean= false;
selectedPrice2: boolean = false;
selectedPrice3: boolean = false;
homePrice: string = '';
Price1: string= '';
Price2: string = '';
Price3: string = '';
  constructor(private service: ParseService, private authService: AuthService, private router: Router) { 
//     if(this.selectedPrice1===true){
//        this.homePrice = this.Price1;
//        console.log("okkk" ,this.homePrice);
//     }
//     if(this.selectedPrice2===true){
//       this.homePrice = this.Price2;
//    }
//    if(this.selectedPrice3===true){
//     this.homePrice = this.Price3;
//  }
  }


//   checkbox() {
//     if(this.selectedPrice1===false){
//       this.homePrice = this.Price1;
//       console.log("okkk" ,this.homePrice);
//    }
//    if(this.selectedPrice2===false){
//      this.homePrice = this.Price2;
//   }
//   if(this.selectedPrice3===false){
//    this.homePrice = this.Price3;
// }
//   }
updateSelectedPrice(priceLevel: string, event: Event) {
  const checkbox = event.target as HTMLInputElement; // Cast to HTMLInputElement to access 'checked'
  const isChecked = checkbox.checked;

  // Reset all selections
  this.selectedPrice1 = false;
  this.selectedPrice2 = false;
  this.selectedPrice3 = false;

  // Enable the selected price if isChecked is true
  if (isChecked) {
    this['selectedPrice' + priceLevel.charAt(priceLevel.length - 1)] = true; // Dynamically sets the correct selectedPriceX
    this.homePrice = this['Price' + priceLevel.charAt(priceLevel.length - 1)]; // Sets homePrice to the selected price
  } else {
    this.homePrice = ''; // Clears homePrice if the checkbox is unchecked
  }
}





 

  async gigInfoAdd(title : string , year_Of_Experience: string  , type: string, skill: string , level: string   , level_1_Description: string  ,  level_1_Price: string  , level_2_Description: string  , level_2_Price: string  ,  level_3_Description: string  , level_3_Price: string  ){
   
    console.log(this.homePrice,"dss")
    const result = await this.service.gig_info_add( title, year_Of_Experience  , type  , skill  , level  , level_1_Description  ,  level_1_Price  , level_2_Description  , level_2_Price  ,  level_3_Description  , level_3_Price , this.homePrice);
    if(result.status===1){
     alert('gig created successfuly')
    }
    else{
      alert('error created in gig')
    }
    ;
  }


  
}
