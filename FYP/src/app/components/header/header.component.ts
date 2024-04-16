import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service'; 
import { ParseService } from 'src/app/services/parse.service';// Adjust the import path as necessary

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  categories = [
    { category: 'Business', subcategories: ['Branding Services', 'Business Consulting', 'Business Plans', 'Career Counseling', 'Data Entry', 'E-Commerce Management', 'Financial Consulting', 'Flyer Distribution', 'HR Consulting', 'Lead Generation', 'Legal Consulting', 'Market Research', 'Presentations', 'Project Management', 'Virtual Assistant', 'other'] },
    { category: 'Digital Marketing', subcategories: ['Domain Research', 'E-Commerce Marketing', 'Influencer Marketing', 'Local SEO', 'Mobile Marketing & Advertising', 'Music Promotion', 'Web Traffic', 'other'] },
    { category: 'Lifestyle', subcategories: ['Arts & Crafts', 'Astrology & Readings', 'Celebrity Impersonators', 'Collectibles', 'Cooking Lessons', 'Craft Lessons', 'Family & Genealogy', 'Fitness Lessons', 'Gaming', 'Greeting Cards & Videos', 'Health Nutrition & Fitness', 'Online Lessons', 'Personal Stylists', 'Relationship Advice', 'Spiritual & Healing', 'Traveling', 'Viral Videos', 'other'] },
    { category: 'Music & Audio', subcategories: ['Audio Ads Production', 'Audiobook Production', 'DJ Drops & Tags', 'Dialogue Editing', 'Jingles & Intros', 'Mixing & Mastering', 'Music Transcription', 'Online Music Lessons', 'Podcast Editing', 'Producers & Composers', 'Session Musicians', 'Singers & Vocalists', 'Songwriters', 'Sound Design', 'Vocal Tuning', 'Voice Over', 'other'] },
    { category: 'Programming & Tech', subcategories: ['Chatbots', 'Convert Files', 'Cybersecurity & Data Protection', 'Data Analysis & Reports', 'Databases', 'Desktop Applications', 'Development for Streamers', 'E-Commerce Development', 'Game Development', 'Mobile Apps', 'Online Coding Lessons', 'QA', 'Support & IT', 'User Testing', 'Web Programming', 'Website Builders & CMS', 'WordPress', 'C++ Programming', 'C# Programming', 'Java Programming', 'Python Programming', 'JavaScript Programming', 'PHP Programming', 'other'] },
    { category: 'Video & Animation', subcategories: ['3D Product Animation', 'Animated GIFs', 'Animation for Kids', 'Animation for Streamers', 'App & Website Previews', 'Article to Video', 'Book Trailers', 'Character Animation', 'Game Trailers', 'Intros & Outros', 'Live Action Explainers', 'Local Photography', 'Logo Animation', 'Lyric & Music Videos', 'Product Photography', 'Real Estate Promos', 'Screencasting Videos', 'Short Video Ads', 'Slideshows Videos', 'Spokespersons Videos', 'Subtitles & Captions', 'Unboxing Videos', 'Video Editing', 'Visual Effects', 'Whiteboard & Animated Explainers', 'eLearning Video Production', 'other'] },
    { category: 'Writing & Translation', subcategories: ['Articles & Blog Posts', 'Beta Reading', 'Book & eBook Writing', 'Book Editing', 'Brand Voice & Tone', 'Business Names & Slogans', 'Case Studies', 'Cover Letters', 'Creative Writing', 'Email Copy', 'Grant Writing', 'Legal Writing', 'LinkedIn Profiles', 'Online Language Lessons', 'Podcast Writing', 'Press Releases', 'Product Descriptions', 'Proofreading & Editing', 'Research & Summaries', 'Resume Writing', 'Sales Copy', 'Scriptwriting', 'Social Media Copy', 'Speechwriting', 'Technical Writing', 'Transcripts', 'Translation', 'UX Writing', 'Website Content', 'White Papers', 'other'] },
    { category: 'Education & Learning', subcategories: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'English Literature', 'History', 'Geography', 'Islamic Studies', 'Urdu', 'Business Studies', 'Accounting', 'Economics', 'Law', 'Psychology', 'Sociology', 'other'] }
  ];
  isMenuOpened: boolean = false;
  // isLoggedIn: boolean = false;
  teacherId:any;
  pictur:string="";
  name : string="";
  private authSubscription: Subscription = new Subscription();

  constructor(private service: ParseService,public authService: AuthService) {}

  ngOnInit(): void {
    this.teacherId = this.service.user.objectId;
    console.log(this.teacherId);
    this.fetchProfileData();
    this.fetchSignupData();

    // this.authSubscription = this.authService.isLoggedInStatus.subscribe(status => {
    //   this.isLoggedIn = status;
    // });
  }
  async fetchProfileData() {
    
    try {
      const result = await this.service.getProfileById(this.teacherId);
      if (result.status === 1) {
       console.log(result) 
       this.pictur =  result.data.pictur;
      } else {
        // Handle the error case
      }
    } catch (error) {
      console.error('Error loading card details', error);     
    }   
    }

    async fetchSignupData() {
    
      try {
        const result = await this.service.getSignupById(this.teacherId);
        if (result.status === 1) {
            console.log(result)
            this.name = result.data.name;
            // this.email = result.data.email;
            // const createdParts = new Date(result.data.created).toString().split(' ').slice(1, 4).join(' ');
            // this.created = createdParts;
        } else {
            // Handle the error case
        }
      } catch (error) {
        console.error('Error loading sign up details', error);     
      } 
      }
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  toggleMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;
  }

  clickedOutside(): void {
    this.isMenuOpened = false;
  }

  logout(): void {
    this.authService.logout();
  }
}