import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParseService } from 'src/app/services/parse.service';
import { AuthService } from 'src/app/services/auth.service';

declare var $: any; // Declare jQuery

@Component({
  selector: 'app-profession-details',
  templateUrl: './profession-details.component.html',
  styleUrls: ['./profession-details.component.css']
})
export class ProfessionDetailsComponent implements AfterViewInit {
  //for files upload do this
  degree: File | undefined;
  certificatesFile: File | undefined;

  constructor(
    private service: ParseService,
    private authService: AuthService,
    private router: Router,
    private el: ElementRef
  ) {}

  ngAfterViewInit() {
    $(this.el.nativeElement).find('.datepicker').datepicker({
      format: 'yyyy',
      viewMode: 'years',
      minViewMode: 'years'
    });
  }

  onFileSelected(type: 'degree' | 'certificates', event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const fileList = inputElement.files;
  
    if (fileList && fileList.length > 0) {
      if (type === 'degree') {
        this.degree = fileList[0];
      } else if (type === 'certificates') {
        this.certificatesFile = fileList[0];
      }
    }
  }
  

  async submit_proffesion(
    occupation: string,
    start_date_str: string,
    end_date_str: string,
    skills: string,
    university: string,
    college: string,
    degreeInput: HTMLInputElement,
    certificatesInput: HTMLInputElement
  ) {
    const start_date = new Date(start_date_str);
    const end_date = new Date(end_date_str);

    const degreeFile = degreeInput.files?.[0];
    const certificatesFile = certificatesInput.files?.[0];

    if (degreeFile && certificatesFile) {
      await this.service.submit_proffesion(
        occupation,
        start_date,
        end_date,
        skills,
        university,
        college,
        degreeFile,
        certificatesFile
      );
      return true;
    } else {
      console.error('No files selected');
      return false;
    }
  }

  personal_detail_to_home() {
    this.router.navigate(['/home-after-login']);
  }
}
