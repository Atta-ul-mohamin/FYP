import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParseService } from 'src/app/services/parse.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-profession-details',
  templateUrl: './profession-details.component.html',
  styleUrls: ['./profession-details.component.css']
})
export class ProfessionDetailsComponent  {
 
  selectedCategory: string = '';
  schoolName: string = '';
  schoolLevel: string = '';
  collegelevel: string = '';
  field: string = '';
  subjectsToTeach: string = '';

  constructor(
    private service: ParseService,
    private authService: AuthService,
    private router: Router,
    private el: ElementRef
  ) {}
  onCategoryChange(category: string) {
    this.selectedCategory = category;
  }



  async proffesionEducation(schoolName: string , schoolClass : string , schoolType : string , collegeName : string , collegeClass : string , collegeType : string , universityName: string , universityDegree: string  , skills : string , hobbies : string) {
    // if (!this.schoolName || !this.field || !this.subjectsToTeach) {

    //   alert('Please fill in all fields');
    //   return false;
    // }

    alert(' teacher proffesion  created successfully');

      
    // this.router.navigate(['/login']);
   const result =   await this.service.submit_education_proffesion(schoolName,schoolClass , schoolType , collegeName , collegeClass , collegeType, universityName, universityDegree , skills, hobbies  );
   if (result.status===1)
   {
alert('proffesional details successfuly upload')
   } 
    else{
      alert('error coming in uploading proffesional details')
    }
  }
 
  // personal_detail_to_home() {
  //   this.router.navigate(['/home-after-login']);
  // }
}
