import { Component } from '@angular/core';
import { ParseService } from 'src/app/services/parse.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
constructor(private parseService: ParseService){}
  ngOnInit(): void {
    this.parseService.logout();
  }
}
