import { Component, OnInit } from '@angular/core';
import { ParseService } from 'src/app/services/parse.service';

@Component({
  selector: 'app-gig-manage',
  templateUrl: './gig-manage.component.html',
  styleUrls: ['./gig-manage.component.css']
})
export class GigManageComponent implements OnInit {
  gigs: any[] = []; // Using any for simplicity

  constructor(private parseService: ParseService) {}

  ngOnInit() {
    this.loadGigs();
  }

  async loadGigs() {
    try {
      this.gigs = await this.parseService.getGigs();
      console.log(this.gigs);
    } catch (error) {
      console.error('Error loading gigs', error);
    }
  }
}
