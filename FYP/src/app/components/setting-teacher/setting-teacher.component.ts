import { Component } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ParseService } from 'src/app/services/parse.service';

@Component({
  selector: 'app-setting-teacher',
  templateUrl: './setting-teacher.component.html',
  styleUrls: ['./setting-teacher.component.css']
})
export class SettingTeacherComponent {
  teacherID: string ='';
  
  constructor(private service: ParseService, private authService: AuthService, private router: Router) { }
  ngOnInit() {
     this.teacherid() 
  }

  async teacherid(){
    this.teacherID= await this.service.user.objectId;
    console.log(this.teacherID, "dwedwe");
  }
}
