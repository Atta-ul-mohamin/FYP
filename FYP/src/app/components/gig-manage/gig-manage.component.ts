// import { Component, OnInit } from '@angular/core';
// import { ParseService } from 'src/app/services/parse.service';

// @Component({
//   selector: 'app-gig-manage',
//   templateUrl: './gig-manage.component.html',
//   styleUrls: ['./gig-manage.component.css']
// })
// export class GigManageComponent implements OnInit {
//   gigs: any[] = []; // Using any for simplicity
//   user:any;
//   constructor(private parseService: ParseService) {
//     console.log('inside constructor');
//   }

 

//   ngOnInit() {
//     console.log('inside oninit');
//     this.loadGigs();
//     this.user = this.parseService.user;
//     console.log(this.user.objectId);
//   }

//   async loadGigs() {
//     try {
//         console.log('inside function');

//         // Check if this.user is defined
//         if (this.user && this.user.sessionToken) {
//             this.gigs = await this.parseService.getGigs(this.user.sessionToken);
//             console.log(this.gigs);
//             console.log('inside function q');
//         } else {
//             console.error('User or user sessionToken is undefined.');
//         }
//     } catch (error) {
//         console.error('Error loading gigs', error);
//     }
//   }}





  import { Component, OnInit } from '@angular/core';
  import { ParseService } from 'src/app/services/parse.service';
  
  @Component({
  selector: 'app-gig-manage',
  templateUrl: './gig-manage.component.html',
  styleUrls: ['./gig-manage.component.css']
})
export class GigManageComponent implements OnInit {
  gigs: any[] = []; // Using any for simplicity
  user:any;
  constructor(private parseService: ParseService) {
    console.log('inside constructor');
  }

 

  ngOnInit() {
    console.log('inside oninit');
    this.loadGigs();
    this.user = this.parseService.user;
  }

  async loadGigs() {
    try {
      console.log('inside function');
      this.gigs = await this.parseService.getGigs();
      console.log(this.gigs);
      console.log('inside function q');
    } catch (error) {
      console.error('Error loading gigs', error);
    }
  }
}