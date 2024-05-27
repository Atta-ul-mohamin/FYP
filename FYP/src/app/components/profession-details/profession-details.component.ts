import { Component, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { ParseService } from 'src/app/services/parse.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-profession-details',
  templateUrl: './profession-details.component.html',
  styleUrls: ['./profession-details.component.css']
})
export class ProfessionDetailsComponent {

  selectedCategory: string = '';
  schoolName: string = '';
  userChecked : any;
userBoolean: boolean =false;
  schoolLevel: string = '';
  collegelevel: string = '';
  field: string = '';
  subjectsToTeach: string = '';

  constructor(
    private service: ParseService,
    private authService: AuthService,
    private router: Router,
    private el: ElementRef
  
  ) { }
  onCategoryChange(category: string) {
    this.selectedCategory = category;
  }


  ngOnInit() {
    this.userChecked = this.service.user.status;
    if(this.userChecked==2){
      this.userBoolean=true;
    }
  }

 




  async proffesionEducation(schoolName: string, schoolClass: string, schoolType: string, collegeName: string, collegeClass: string, collegeType: string, universityName: string, universityDegree: string, skills: string, hobbies: string) {
    if (this.schoolLevel === 'no school') {
      if (!skills) {
        alert('Please fill skills field');
      }
      else if (!hobbies) {
        alert('Please fill hobbies field');
        return;
      }
    }

    if (this.schoolLevel === '9' || this.schoolLevel === '10' || this.schoolLevel === '8 or less') {
      if (!schoolName) {
        alert('Please fill school name field');
        return;
      }
      if (!skills) {
        alert('Please fill hobbies field');
        return;
      }
      if (!hobbies) {
        alert('Please fill hobbies filed');
        return;
      }
    }

    if (this.schoolLevel === '9' || this.schoolLevel === '10') {
      if (!schoolName) {
        alert('Please fill school name field');
        return;
      }
      if (!schoolType) {
        alert('Please fill school type field');
        return;
      }
      if (!skills) {
        alert('Please fill skills field');
        return;
      }
      if (!hobbies) {
        alert('Please fill hobbies filed');
        return;
      }
    }

    if (this.schoolLevel === 'more than 10' || this.collegelevel === '11' || this.collegelevel === '12') {
      if (!schoolName) {
        alert('Please fill school name field');
        return;
      }
      if (!schoolType) {
        alert('Please fill school type field');
        return;
      }
      if (!collegeName) {
        alert('Please fill college name field');
        return;
      }
      if (!collegeType) {
        alert('Please fill college type field');
        return;
      }
      if (!collegeClass) {
        alert('Please fill college class field')
      }
      if (!skills) {
        alert('Please fill skills field');
        return;
      }
      if (!hobbies) {
        alert('Please fill hobbies filed');
        return;
      }
    }

    if (this.collegelevel === 'more than 12') {
      if (!schoolName) {
        alert('Please fill school name field');
        return;
      }
      if (!schoolClass) {
        alert('Please fill school class field');
        return;
      }
      if (!schoolType) {
        alert('Please fill school type field');
        return;
      }
      if (!collegeName) {
        alert('Please fill college name field');
        return;
      }
      if (!collegeType) {
        alert('Please fill college type field');
        return;
      }
      if (!collegeClass) {
        alert('Please fill college class field');
        return;
      }
      if (!universityName) {
        alert('Please fill university name');
        return;
      }
      
      if (!universityDegree) {
        alert('Please fill university Degree');
        return;
      }
      if (!skills) {
        alert('Please fill skills field');
        return;
      }
      if (!hobbies) {
        alert('Please fill hobbies filed');
        return;
      }
    }




    // this.router.navigate(['/login']);
    const result = await this.service.submit_education_proffesion(schoolName, schoolClass, schoolType, collegeName, collegeClass, collegeType, universityName, universityDegree, skills, hobbies);
    if (result.status === 1) {
      alert('proffesional details successfuly upload'),
        this.router.navigate(['/home-after-login']);
    }
    else {
      alert('error coming in uploading proffesional details')
    }

  }




}
