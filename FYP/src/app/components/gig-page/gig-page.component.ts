import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ParseService } from 'src/app/services/parse.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 


@Component({
  selector: 'app-gig-page',
  templateUrl: './gig-page.component.html',
  styleUrls: ['./gig-page.component.css']
})
export class GigPageComponent {
[x: string]: any;
selectedCategory: string = '';
selectedType: string = '';
userChecked : any;
userBoolean: boolean =false;
title : string = '';

year_Of_Experience : number | undefined = undefined;
 age: number | undefined = undefined;
skillLevel :string = '';
// price : string = '';
selectedLevel: string = '';
selectedPrice1: boolean= false;
selectedPrice2: boolean = false;
selectedPrice3: boolean = false;
selectedFile1: File | null = null;
fileBinaryString1: string | null = null;
selectedFile2: File | null = null;
fileBinaryString2: string | null = null;
selectedFile3: File | null = null;
fileBinaryString3: string | null = null;
homePrice: string = '';
level1DescriptionCount: number | null = null;
level1IsDescriptionLimitReached : boolean = false;
level2DescriptionCount: number | null = null;
level2IsDescriptionLimitReached : boolean = false;
level3DescriptionCount: number | null = null;
level3IsDescriptionLimitReached : boolean = false;
Price1: number | undefined = undefined;
Price2: number | undefined = undefined;
Price3: number | undefined = undefined;
orderDay1: number | undefined = undefined;
orderDay2 : number | undefined = undefined;
orderDay3 : number | undefined = undefined;

fullTitle : string = '';
profileId : string = '';
teacherId : string = '';
photos: File[] = [];

handleFileInput(event: Event, photoId: string) {
  const files = (event.target as HTMLInputElement).files!;
  if (files.length > 0) {
    const file = files[0];
    if (photoId === 'photo1') {
      this.photos[0] = file;
    } else if (photoId === 'photo2') {
      this.photos[1] = file;
    } else if (photoId === 'photo3') {
      this.photos[2] = file;
    }
    console.log('File uploaded:', file.name);  // For debug purpose
  }
}


categoriesWithSub: any[] = [
  { category: 'Business', subcategories: ['Branding Services', 'Business Consulting', 'Business Plans', 'Career Counseling', 'Data Entry', 'E-Commerce Management', 'Financial Consulting', 'Flyer Distribution', 'HR Consulting', 'Lead Generation', 'Legal Consulting', 'Market Research', 'Presentations', 'Project Management', 'Virtual Assistant', 'other'] },
  { category: 'Digital Marketing', subcategories: ['Domain Research', 'E-Commerce Marketing', 'Influencer Marketing', 'Local SEO', 'Mobile Marketing & Advertising', 'Music Promotion', 'Web Traffic', 'other'] },
  { category: 'Lifestyle', subcategories: ['Arts & Crafts', 'Astrology & Readings', 'Celebrity Impersonators', 'Collectibles', 'Cooking Lessons', 'Craft Lessons', 'Family & Genealogy', 'Fitness Lessons', 'Gaming', 'Greeting Cards & Videos', 'Health Nutrition & Fitness', 'Online Lessons', 'Personal Stylists', 'Relationship Advice', 'Spiritual & Healing', 'Traveling', 'Viral Videos', 'other'] },
  { category: 'Music & Audio', subcategories: ['Audio Ads Production', 'Audiobook Production', 'DJ Drops & Tags', 'Dialogue Editing', 'Jingles & Intros', 'Mixing & Mastering', 'Music Transcription', 'Online Music Lessons', 'Podcast Editing', 'Producers & Composers', 'Session Musicians', 'Singers & Vocalists', 'Songwriters', 'Sound Design', 'Vocal Tuning', 'Voice Over', 'other'] },
  { category: 'Programming & Tech', subcategories: ['Chatbots', 'Convert Files', 'Cybersecurity & Data Protection', 'Data Analysis & Reports', 'Databases', 'Desktop Applications', 'Development for Streamers', 'E-Commerce Development', 'Game Development', 'Mobile Apps', 'Online Coding Lessons', 'QA', 'Support & IT', 'User Testing', 'Web Programming', 'Website Builders & CMS', 'WordPress', 'C++ Programming', 'C# Programming', 'Java Programming', 'Python Programming', 'JavaScript Programming', 'PHP Programming', 'other'] },
  { category: 'Video & Animation', subcategories: ['3D Product Animation', 'Animated GIFs', 'Animation for Kids', 'Animation for Streamers', 'App & Website Previews', 'Article to Video', 'Book Trailers', 'Character Animation', 'Game Trailers', 'Intros & Outros', 'Live Action Explainers', 'Local Photography', 'Logo Animation', 'Lyric & Music Videos', 'Product Photography', 'Real Estate Promos', 'Screencasting Videos', 'Short Video Ads', 'Slideshows Videos', 'Spokespersons Videos', 'Subtitles & Captions', 'Unboxing Videos', 'Video Editing', 'Visual Effects', 'Whiteboard & Animated Explainers', 'eLearning Video Production', 'other'] },
  { category: 'Writing & Translation', subcategories: ['Articles & Blog Posts', 'Beta Reading', 'Book & eBook Writing', 'Book Editing', 'Brand Voice & Tone', 'Business Names & Slogans', 'Case Studies', 'Cover Letters', 'Creative Writing', 'Email Copy', 'Grant Writing', 'Legal Writing', 'LinkedIn Profiles', 'Online Language Lessons', 'Podcast Writing', 'Press Releases', 'Product Descriptions', 'Proofreading & Editing', 'Research & Summaries', 'Resume Writing', 'Sales Copy', 'Scriptwriting', 'Social Media Copy', 'Speechwriting', 'Technical Writing', 'Transcripts', 'Translation', 'UX Writing', 'Website Content', 'White Papers', 'other'] },
  { category: 'Education & Learning', subcategories: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'English Literature', 'History', 'Geography', 'Islamic Studies', 'Urdu', 'Business Studies', 'Accounting', 'Economics', 'Law', 'Psychology', 'Sociology', 'other'] }
];


filteredSubcategories: string[] = [];
selectedCategory1: string = '';
selectedSubcategory: string = '';
  constructor(private service: ParseService, private authService: AuthService, private router: Router) { 
    
  }

  ngOnInit() {
    this.teacherId = this.service.user.objectId;
    this.userChecked = this.service.user.status;
    if(this.userChecked==2){
      this.userBoolean=true;
    }
    this.fetchProfileData();
    console.log(this.userBoolean);
    console.log(this.userChecked);
  }




  async fetchProfileData() {
    try {
      const result = await this.service.getProfileById(this.teacherId);
    
      if (result.status === 1) {
       this.profileId = result.data.objectId;
       
       
      } else {
     
      }
    } catch (error) {
      console.error('Error getting profileId', error);
    }
    }

  
 
  onCategoryChange() {
    const category = this.categoriesWithSub.find(cat => cat.category === this.selectedCategory1);
    this.filteredSubcategories = category ? category.subcategories : [];
  }



updateSelectedPrice(priceLevel: string, event: Event) {
  const checkbox = event.target as HTMLInputElement; // Cast to HTMLInputElement to access 'checked'
  const isChecked = checkbox.checked;

  // Reset all selections
  this.selectedPrice1 = false;
  this.selectedPrice2 = false;
  this.selectedPrice3 = false;

  // Enable the selected price if isChecked is true
  if (isChecked) {
    this['selectedPrice' + priceLevel.charAt(priceLevel.length - 1)] = true; // Dynamically sets the correct selectedPriceX
    this.homePrice = this['Price' + priceLevel.charAt(priceLevel.length - 1)]; // Sets homePrice to the selected price
  } else {
    this.homePrice = ''; // Clears homePrice if the checkbox is unchecked
  }
}





 

  async gigInfoAdd(title : string , year_Of_Experience: number , type: string, skill: string , level: string   , level_1_Description: string  ,  level_1_Price: number  , level_2_Description: string  , level_2_Price: number  ,  level_3_Description: string  , level_3_Price: number, selectedCategory1: string, selectedSubcategory: string ,orderDay1:number,orderDay2:number,orderDay3:number){
    this.fullTitle = `I do ${title}`;
    const titles= title.trim();
    const level_1_Descriptions =  level_1_Description.trim();
    // const level_1_Prices = level_1_Price.trim();
    // const orderDay1s = orderDay1.trim();
    const level_2_Descriptions =  level_2_Description.trim();
    // const level_2_Prices = level_2_Price.trim();
    // const orderDay2s = orderDay2.trim();
    const level_3_Descriptions =  level_3_Description.trim();
    // const level_3_Prices = level_3_Price.trim();
    // const orderDay3s = orderDay3.trim();

    if (titles.length < 10 || titles.length > 30) {
      alert('title must be between 15 and 35 characters long.');
      return;
    }
   
    if (year_Of_Experience <= -1 || year_Of_Experience > 81) {
      alert('year_of_experience can not be negative or exceed 80 years');
      return;
    }

    if(level=='level1' || level=='' || level=='level2' || level=='level3'){
    if(level_1_Descriptions.length < 50 || level_1_Descriptions.length > 100){
      alert('description in low price should be between 50 and 100 characters ');
      return;
    }

    if(orderDay1 < 1 || orderDay1 > 30){
      alert('order days in low price should be between 1 and 30 days ');
      return;
    }

    if(level_1_Price < 100 || level_1_Price > 100000){
      alert('price in low price should be between 100 and 1000000 rupees');
      return;
    }

    
  }
    if(level=='level2' || level=='level3' || level==''){
    if(level_2_Descriptions.length < 50 || level_2_Descriptions.length > 100){
      alert('description in mid price should be between 50 and 100 characters ');
      return;
    }

    if(orderDay2<= 1 || orderDay2>= 30){
      alert('order days in mid price should be between 1 and 30 days ');
      return;
    }

    if(level_2_Price < 100 || level_2_Price> 100000){
      alert('price in mid price should be between 100 and 1000000 rupees');
      return;
    }
    
  }
    if(level=='level3' || level==''){
    if(level_3_Descriptions.length <= 50 || level_3_Descriptions.length >= 100){
      alert('description in high price should be between 50 and 100 characters ');
      return;
    }

    
    if(level_3_Price < 100 || level_3_Price> 100000){
      alert('price in high price should be between 100 and 1000000 rupees');
      return;
    }

    if(orderDay3< 1 || orderDay3 > 30){
      alert('order days in high price should be between 1 and 30 days ');
      return;
    }
  }
  
 

    // if (!firstname || !email || !password) {
    //   alert('Please fill in all the fields.');
    //   return;
    // }
    // if (firstname.length < 3 || firstname.length > 20) {
    //   alert('Name must be between 3 and 20 characters long.');
    //   return;
    // }
    const result = await this.service.gig_info_add( titles , year_Of_Experience  , type  , skill  , level  , level_1_Descriptions  ,  level_1_Price , level_2_Descriptions  , level_2_Price  ,  level_3_Descriptions  , level_3_Price , this.homePrice , selectedCategory1, selectedSubcategory , this.profileId ,this.fileBinaryString1! , this.fileBinaryString2! , this.fileBinaryString3!,orderDay1,orderDay2,orderDay3);
    if(result.status===1){
     alert('gig created successfuly')
     this.router.navigate(['/gigmanage']);
    }
    else{
      alert('error created in gig')
    }
    ;
  }


  onDescriptionInput(value: string) {
    this.level1DescriptionCount = value.length;
    this.level1IsDescriptionLimitReached = this.level1DescriptionCount >= 100 ;
  }
  submitForm() {
    const fullTitle = `I will ${this.title}`;
    // Now use fullTitle for your submission or processing logic
  }
  
  
  onFileChanged1(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      this.selectedFile1 = null;
      this.fileBinaryString1 = null;
    } else {
      this.selectedFile1 = input.files[0];
      const blobUrl = URL.createObjectURL(this.selectedFile1);
      this.convertBlobUrlToBase64String1(blobUrl)
        .then(base64String => {
          this.fileBinaryString1 = base64String; // Store Base64 string
          console.log('Generated Base64 String:', this.fileBinaryString1.substring(0, 50) + '...');
        })
        .catch(error => console.error('Error reading file as Base64 string:', error));
    }
  }
  
  // Method to convert Blob URL to Base64 string
  async convertBlobUrlToBase64String1(blobUrl: string): Promise<string> {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result; // This is a Base64 string
        resolve(base64String as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob); // Changed to readAsDataURL for Base64
    });
  }

  onFileChanged2(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      this.selectedFile2 = null;
      this.fileBinaryString2 = null;
    } else {
      this.selectedFile2 = input.files[0];
      const blobUrl = URL.createObjectURL(this.selectedFile2);
      this.convertBlobUrlToBase64String2(blobUrl)
        .then(base64String => {
          this.fileBinaryString2 = base64String; // Store Base64 string
          console.log('Generated Base64 String:', this.fileBinaryString2.substring(0, 50) + '...');
        })
        .catch(error => console.error('Error reading file as Base64 string:', error));
    }
  }
  
  // Method to convert Blob URL to Base64 string
  async convertBlobUrlToBase64String2(blobUrl: string): Promise<string> {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result; // This is a Base64 string
        resolve(base64String as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob); // Changed to readAsDataURL for Base64
    });
  }

  onFileChanged3(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      this.selectedFile3 = null;
      this.fileBinaryString3 = null;
    } else {
      this.selectedFile3 = input.files[0];
      const blobUrl = URL.createObjectURL(this.selectedFile3);
      this.convertBlobUrlToBase64String3(blobUrl)
        .then(base64String => {
          this.fileBinaryString3 = base64String; // Store Base64 string
          console.log('Generated Base64 String:', this.fileBinaryString3.substring(0, 50) + '...');
        })
        .catch(error => console.error('Error reading file as Base64 string:', error));
    }
  }

  
  // Method to convert Blob URL to Base64 string
  async convertBlobUrlToBase64String3(blobUrl: string): Promise<string> {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result; // This is a Base64 string
        resolve(base64String as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob); // Changed to readAsDataURL for Base64
    });
  }

  
}
