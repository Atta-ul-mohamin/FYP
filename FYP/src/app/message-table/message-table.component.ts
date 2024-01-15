import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ParseService } from 'src/app/services/parse.service';

@Component({
  selector: 'app-message-table',
  templateUrl: './message-table.component.html',
  styleUrls: ['./message-table.component.css']
})
export class MessageTableComponent {
  studentNames: any[] = []; // To store just the names of students

  constructor(private parseService: ParseService,private router: Router) {}

  async ngOnInit() {
    try {
      if (this.parseService.user) {
        const teacherId = this.parseService.user.objectId;
        console.log(teacherId, 'ts teacher present user id');
        const studentIds = await this.parseService.getStudentIdsByTeacherId(teacherId);
        console.log(studentIds, 'student arrays matching with teacher id');

        // Assuming getStudentNamesByIds returns an array of objects with a 'name' property
        const students = await this.parseService.getStudentNamesByIds(studentIds);
        console.log(students, 'full student data');
        this.studentNames = students;
        // Extracting only the names
        // Assuming students is an array of objects with a 'name' property
        // this.studentNames = (students as any[]).map(student => student.name);
        
        console.log(this.studentNames, 'student names');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

 
onRowClick(id: string) {
  
console.log('Clicked on:', id);
this.router.navigate(['/chat-page' , id]);
}
}




