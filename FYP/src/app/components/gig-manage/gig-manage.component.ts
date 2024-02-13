


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

  async deleteGig(gigId : string) {
    // Ask the user for confirmation before deleting the account
    
    const confirmation = confirm('Are you sure you want to delete your Gig? This action cannot be undone.');
    if (confirmation) {
      const result = await this.parseService.deleteGig(gigId);
      
    if(result.status===1){
        console.log("in delete");
       
        
        alert('Gig deleted successfully.');
        // Navigate the user away from the current page or refresh the application state as needed
     
    } else {
      // User clicked 'Cancel', do not delete the account
      alert('error in gig deletion');
    }
  }
  else{
   
    console.log("Gig deletion cancelled.");
  }
  }
}