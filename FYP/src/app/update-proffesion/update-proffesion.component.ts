
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
  schoolName : string = ''; 
  schoolType: string = '';
  schoolLevel: string = '';
  collegeName : string = '';
  collegelevel: string = '';
  collegeType : string = '';
  universityName : string = '';
  universityDegree : string = '';
  skills : string = '';
  hobbies : string = '';
  professionId : string = '';

  constructor(
    private service: ParseService,
    private authService: AuthService,
    private router: Router,
    private el: ElementRef,
    private route: ActivatedRoute 
  ) {}

  ngOnInit() {
    this.teacherID = this.route.snapshot.paramMap.get('id') as string;
    this.fetchProffesionData();
  }

  async fetchProffesionData() {
    
    try {
      const result = await this.service.getProfessionById(this.teacherID);
      
      if (result.status === 1) {

       console.log(result)
       console.log(result.data.schoolname, "opippi");
       this.schoolName = result.data.schoolname;
       this.schoolLevel = result.data.schoolclass;
       this.schoolType = result.data.schooltype;
       this.collegeName = result.data.collegename;
       this.collegelevel = result.data.collegeclass;
       this.collegeType = result.data.collegetype;
       this.universityName = result.data.universityname;
       this.universityDegree = result.data.universitydegree;
       this.skills = result.data.skills;
       this.hobbies = result.data.hobbies;
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
