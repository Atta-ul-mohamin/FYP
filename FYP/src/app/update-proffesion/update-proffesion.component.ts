
import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParseService } from 'src/app/services/parse.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-proffesion',
  templateUrl: './update-proffesion.component.html',
  styleUrls: ['./update-proffesion.component.css']
})
export class UpdateProffesionComponent  {
  teacherID : string ='';
  schoolNames : string = ''; 
  schoolTypes: string = '';
  schoolLevel: string = '';
  collegeNames : string = '';
  collegelevel: string = '';
  collegeTypes : string = '';
  universityNames : string = '';
  universityDegrees : string = '';
  skillss : string = '';
  hobbiess : string = '';
  professionId : string = '';
  userChecked : any;
  userBoolean: boolean =false;

  constructor(
    private service: ParseService,
    private authService: AuthService,
    private router: Router,
    private el: ElementRef,
    private route: ActivatedRoute 
  ) {}

  ngOnInit() {
    this.teacherID = this.route.snapshot.paramMap.get('id') as string;
    this.userChecked = this.service.user.status;
    if(this.userChecked==2){
      this.userBoolean=true;
    }
    this.fetchProffesionData();
  }

  async fetchProffesionData() {
    
    try {
      const result = await this.service.getProfessionById(this.teacherID);
      
      if (result.status === 1) {

       console.log(result)
       console.log(result.data.schoolname, "opippi");
       this.schoolNames = result.data.schoolname;
       this.schoolLevel = result.data.schoolclass;
       this.schoolTypes = result.data.schooltype;
       this.collegeNames = result.data.collegename;
       this.collegelevel = result.data.collegeclass;
       this.collegeTypes = result.data.collegetype;
       this.universityNames = result.data.universityname;
       this.universityDegrees = result.data.universitydegree;
       this.skillss = result.data.skills;
       this.hobbiess = result.data.hobbies;
       this.professionId = result.data.objectId;
    
       
      } else {
        // Handle the error case
      }
    } catch (error) {
      console.error('Error loading profession details', error);
      // Handle the error
    }
          
     
    }

  
 
 








  async proffesionEducation(schoolName: string , schoolClass : string , schoolType : string , collegeName : string , collegeClass : string , collegeType : string , universityName: string , universityDegree: string  , skills : string , hobbies : string) {

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


    
   const result =   await this.service.update_submit_education_proffesion(this.professionId,schoolName,schoolClass , schoolType , collegeName , collegeClass , collegeType, universityName, universityDegree , skills, hobbies  );
   if (result.status===1)
   {
alert('proffesional details successfuly edited')
   } 
    else{
      alert('error coming in editing proffesional details')
    }
  }
 

  async deleteProfession(TeacherId : string) {
    // Ask the user for confirmation before deleting the account
    
    const confirmation = confirm('Are you sure you want to delete your Profession? This action cannot be undone.');
    if (confirmation) {
      const result = await this.service.deleteProfession(TeacherId);
      
    if(result.status===1){
        console.log("in delete");
       
        
        alert('Profession deleted successfully.');
        this.router.navigate(['/home-after-login']);
        // Navigate the user away from the current page or refresh the application state as needed
          
    } else {
      // User clicked 'Cancel', do not delete the account
      alert('error in Profession deletion');
    }
  }
  else{
   
    console.log("Profession deletion cancelled.");
  }
  }
 

}
