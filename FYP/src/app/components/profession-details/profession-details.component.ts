import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profession-details',
  templateUrl: './profession-details.component.html',
  styleUrls: ['./profession-details.component.css']
})
export class ProfessionDetailsComponent {
    //yaha par jo parse service lagana he yaha ae ga or authentication b neche construtor pass akre ge 

constructor( private router: Router){}

  personal_detail_to_home(){
    this.router.navigate(['/home-after-login']);

  }

}
