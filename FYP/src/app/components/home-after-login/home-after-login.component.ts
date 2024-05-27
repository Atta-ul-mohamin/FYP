import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ParseService } from 'src/app/services/parse.service';

@Component({
  selector: 'app-home-after-login',
  templateUrl: './home-after-login.component.html',
  styleUrls: ['./home-after-login.component.css']
})
export class HomeAfterLoginComponent implements OnInit {
  auth = inject(AuthService);
  isAuthenticated: boolean = false;
  isAppAuthenticated : boolean = false;
  isAppLogin: boolean = false;
  name : string ='';
  email:string ='';
  picture:string='';
  orderCount : string =''; 
  historyOrderCount : string ='';
  totalPrice : string ='';
  averageRating : string = '';
  

  user: any;
  userName!: string; 
  teacherId:any;
  pictur:string="";

  constructor(private service: ParseService, private authService: AuthService,) {
    const userJson = sessionStorage.getItem("loggedInUser") || '{}';

    const users = JSON.parse(userJson);
    this.name = users.name;
    this.picture = users.picture;
    this.email = users.email;
  }

  ngOnInit() {

    this.authService.isAuthenticated.subscribe((status) => {
      this.isAuthenticated = status;
      console.log(this.isAuthenticated);
    });
    this.teacherId = this.service.user.objectId;
    this.getHomeData();
    console.log(this.teacherId);
    this.fetchProfileData();

    // Subscribe to the userProfile observable to get the user's name
    this.authService.userProfile.subscribe(profile => {
      if (profile) {
        this.userName = profile.name;
      }
    });

    // Assuming you're also fetching user data from ParseService
    this.user = this.service.user;
  }


  async getHomeData(){
    const result = await this.service.getHomeData(this.teacherId);
   this.orderCount= result.orderCount 
   this.historyOrderCount= result.historyOrderCount
   this.totalPrice= result.totalPrice
   this.averageRating= result.averageRating
  }

   signOutGoogle(){
    sessionStorage.removeItem("loggedInUser");
    this.auth.signOutGoogle();
   }

  async fetchProfileData() {
    
    try {
      const result = await this.service.getProfileById(this.teacherId);
      if (result.status === 1) {
       console.log(result) 
       this.pictur =  result.data.pictur;
      } else {
       
      }
    } catch (error) {
      console.error('Error loading card details', error);     
    }   
    }
}



