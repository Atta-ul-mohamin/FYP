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

  constructor(private service: ParseService, private authService: AuthService, private router: Router) { }

  async next_to_img(
    gigtitle: HTMLInputElement,
    category: HTMLSelectElement,
    discription :HTMLTextAreaElement,
    images: HTMLInputElement,
    sampledocument: HTMLInputElement,
    pricediscription: HTMLTextAreaElement,
    dileverytime:HTMLSelectElement,
    price: HTMLInputElement
  ) {

    await this.service.next_to_img({
      gigtitle: gigtitle.value,
      category: category.value,
      discription: discription.value,
      images: images?.files?.[0],
      sampledocument: sampledocument?.files?.[0],
      pricediscription: pricediscription.value,
      dileverytime: dileverytime.value,
      price: +price.value  // convert string to number using the unary plus operator
    });
  }

  gig_to_img() {
    this.router.navigate(['/home-after-login']);
  }
}
