import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ParseService } from 'src/app/services/parse.service';

@Component({
  selector: 'app-home-after-login',
  templateUrl: './home-after-login.component.html',
  styleUrls: ['./home-after-login.component.css']
})
export class HomeAfterLoginComponent {
  constructor(private parseService: ParseService) {}
  user:any;
  ngOnInit() {
    this.user = this.parseService.user;
  }
}
