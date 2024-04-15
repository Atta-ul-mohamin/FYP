import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service'; 
import { ParseService } from 'src/app/services/parse.service';// Adjust the import path as necessary

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isMenuOpened: boolean = false;
  // isLoggedIn: boolean = false;
  teacherId:any;
  pictur:string="";
  name : string="";
  private authSubscription: Subscription = new Subscription();

  constructor(private service: ParseService,public authService: AuthService) {}

  ngOnInit(): void {
    this.teacherId = this.service.user.objectId;
    console.log(this.teacherId);
    this.fetchProfileData();
    this.fetchSignupData();

    // this.authSubscription = this.authService.isLoggedInStatus.subscribe(status => {
    //   this.isLoggedIn = status;
    // });
  }
  async fetchProfileData() {
    
    try {
      const result = await this.service.getProfileById(this.teacherId);
      if (result.status === 1) {
       console.log(result) 
       this.pictur =  result.data.pictur;
      } else {
        // Handle the error case
      }
    } catch (error) {
      console.error('Error loading card details', error);     
    }   
    }

    async fetchSignupData() {
    
      try {
        const result = await this.service.getSignupById(this.teacherId);
        if (result.status === 1) {
            console.log(result)
            this.name = result.data.name;
            // this.email = result.data.email;
            // const createdParts = new Date(result.data.created).toString().split(' ').slice(1, 4).join(' ');
            // this.created = createdParts;
        } else {
            // Handle the error case
        }
      } catch (error) {
        console.error('Error loading sign up details', error);     
      } 
      }
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  toggleMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;
  }

  clickedOutside(): void {
    this.isMenuOpened = false;
  }

  logout(): void {
    this.authService.logout();
  }
}