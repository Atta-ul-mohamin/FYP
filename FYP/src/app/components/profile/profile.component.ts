import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  //yaha par jo parse service lagana he yaha ae ga or authentication b
  constructor(private authService: AuthService, private router: Router){}

  profile_to_personal_details(){
    this.router.navigate(['/profession-details']);
  }
}
