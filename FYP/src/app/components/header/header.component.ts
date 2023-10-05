import { Component } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isMenuOpened: boolean = false;
  toggleMenu(): void{
    this.isMenuOpened =!this.isMenuOpened; 
  }
  clickedOutside(): void{
    this.isMenuOpened =false;
  }
 
}

