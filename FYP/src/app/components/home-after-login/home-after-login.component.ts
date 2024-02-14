import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ParseService } from 'src/app/services/parse.service';

@Component({
  selector: 'app-home-after-login',
  templateUrl: './home-after-login.component.html',
  styleUrls: ['./home-after-login.component.css']
})
export class HomeAfterLoginComponent implements OnInit {
  user: any;
  userName!: string; 

  constructor(private parseService: ParseService, private authService: AuthService) {}

  ngOnInit() {
    // Subscribe to the userProfile observable to get the user's name
    this.authService.userProfile.subscribe(profile => {
      if (profile) {
        this.userName = profile.name;
      }
    });

    // Assuming you're also fetching user data from ParseService
    this.user = this.parseService.user;
  }
}



// import { AuthService } from 'src/app/services/auth.service';

// @Component({
//   selector: 'app-home-after-login',
//   templateUrl: './home-after-login.component.html',
//   styleUrls: ['./home-after-login.component.css']
// })
// export class HomeAfterLoginComponent implements OnInit {
//   userName!: string;

//   constructor(private authService: AuthService) {}

//   ngOnInit() {
//     this.authService.userProfile.subscribe(profile => {
//       if (profile) {
//         this.userName = profile.name;
//       }
//     });
//   }
// }

