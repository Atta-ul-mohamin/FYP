import { Component, OnInit } from '@angular/core'
import { ParseService } from 'src/app/services/parse.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-gig',
  templateUrl: './update-gig.component.html',
  styleUrls: ['./update-gig.component.css']
})
export class UpdateGigComponent implements OnInit {
  [x: string]: any;
 gigId : string = '';
 title: string = '';
 fullTitle : string = '';
 cardId: string = '';
 cardName: string = '';
 level_1_Price : string = '';
 level_2_Price : string = '';
 level_3_Price : string = '';
 level_1_Description : string = '';
 level_2_Description : string = '';
 level_3_Description: string = ''
 year_Of_Experience: string = '';
 selectedPrice1: boolean= false;
selectedPrice2: boolean = false;
selectedPrice3: boolean = false;
homePrice: string = '';
 selectedLevel: string = '';
 skillLevel : string = '';
 selectedType : string = '';
 selectedCategory1 : string = '';


 selectedSubcategory :  string = '';
 categoriesWithSub: any[] = [
  { category: 'Business', subcategories: ['Branding Services', 'Business Consulting', 'Business Plans', 'Career Counseling', 'Data Entry', 'E-Commerce Management', 'Financial Consulting', 'Flyer Distribution', 'HR Consulting', 'Lead Generation', 'Legal Consulting', 'Market Research', 'Presentations', 'Project Management', 'Virtual Assistant' , 'other'] },
  { category: 'Digital Marketing', subcategories: ['Domain Research', 'E-Commerce Marketing', 'Influencer Marketing', 'Local SEO', 'Mobile Marketing & Advertising', 'Music Promotion', 'Web Traffic' , 'other'] },
  { category: 'Lifestyle', subcategories: ['Arts & Crafts', 'Astrology & Readings', 'Celebrity Impersonators', 'Collectibles', 'Cooking Lessons', 'Craft Lessons', 'Family & Genealogy', 'Fitness Lessons', 'Gaming', 'Greeting Cards & Videos', 'Health Nutrition & Fitness', 'Online Lessons', 'Personal Stylists', 'Relationship Advice', 'Spiritual & Healing', 'Traveling', 'Viral Videos', 'other'] },
  { category: 'Music & Audio', subcategories: ['Audio Ads Production', 'Audiobook Production', 'DJ Drops & Tags', 'Dialogue Editing', 'Jingles & Intros', 'Mixing & Mastering', 'Music Transcription', 'Online Music Lessons', 'Podcast Editing', 'Producers & Composers', 'Session Musicians', 'Singers & Vocalists', 'Songwriters', 'Sound Design', 'Vocal Tuning', 'Voice Over', 'other'] },
  { category: 'Programming & Tech', subcategories: ['Chatbots', 'Convert Files', 'Cybersecurity & Data Protection', 'Data Analysis & Reports', 'Databases', 'Desktop Applications', 'Development for Streamers', 'E-Commerce Development', 'Game Development', 'Mobile Apps', 'Online Coding Lessons', 'QA', 'Support & IT', 'User Testing', 'Web Programming', 'Website Builders & CMS', 'WordPress', 'other'] },
  { category: 'Video & Animation', subcategories: ['3D Product Animation', 'Animated GIFs', 'Animation for Kids', 'Animation for Streamers', 'App & Website Previews', 'Article to Video', 'Book Trailers', 'Character Animation', 'Game Trailers', 'Intros & Outros', 'Live Action Explainers', 'Local Photography', 'Logo Animation', 'Lyric & Music Videos', 'Product Photography', 'Real Estate Promos', 'Screencasting Videos', 'Short Video Ads', 'Slideshows Videos', 'Spokespersons Videos', 'Subtitles & Captions', 'Unboxing Videos', 'Video Editing', 'Visual Effects', 'Whiteboard & Animated Explainers', 'eLearning Video Production', 'other'] },
  { category: 'Writing & Translation', subcategories: ['Articles & Blog Posts', 'Beta Reading', 'Book & eBook Writing', 'Book Editing', 'Brand Voice & Tone', 'Business Names & Slogans', 'Case Studies', 'Cover Letters', 'Creative Writing', 'Email Copy', 'Grant Writing', 'Legal Writing', 'LinkedIn Profiles', 'Online Language Lessons', 'Podcast Writing', 'Press Releases', 'Product Descriptions', 'Proofreading & Editing', 'Research & Summaries', 'Resume Writing', 'Sales Copy', 'Scriptwriting', 'Social Media Copy', 'Speechwriting', 'Technical Writing', 'Transcripts', 'Translation', 'UX Writing', 'Website Content', 'White Papers' , 'other'] }
];

filteredSubcategories: string[] = [];
  constructor(private route: ActivatedRoute,private service: ParseService) {

   }


  ngOnInit() {
    this.gigId = this.route.snapshot.paramMap.get('id') as string;
    this.fetchGigData();
  }

  async fetchGigData() {
    
    try {
      const result = await this.service.getGigById(this.gigId);
      
      if (result.status === 1) {

       console.log(result)
       
    
    
        this.title = result.data.title;
        this.level_1_Price = result.data.level_1_price;
        this.level_1_Description = result.data.level_1_Description;
        console.log(this.level_1_Description);
        this.level_2_Price = result.data.level_2_price;
        this.level_2_Description = result.data.level_2_Description;
        this.level_3_Price = result.data.level_3_price;
        this.level_3_Description = result.data.level_3_Description;
        this.year_Of_Experience = result.data.experience;
        this.selectedLevel = result.data.level;
        this.selectedType = result.data.type;
         this.skillLevel =result.data.skillLevel;
        this.cardName = result.data.user.firstname;
        this.selectedCategory1 = result.data.category ;
        this.onCategoryChange();
        setTimeout(() => {
          this.selectedSubcategory = result.data.subcategory;
        }, 0 );
        this.selectedSubcategory =result.data.subcategory ;
        console.log(this.selectedCategory1, this.selectedSubcategory)
       
      } else {
        // Handle the error case
      }
    } catch (error) {
      console.error('Error loading card details', error);
      // Handle the error
    }
      
      // this.currentName = result.name;
      // console.log(this.currentName);
       // Set the current name if fetched
    }

    onCategoryChange() {
      const category = this.categoriesWithSub.find(cat => cat.category === this.selectedCategory1);
      this.filteredSubcategories = category ? category.subcategories : [];
    }

    // updateSelectedPrice(priceLevel: string, event: Event) {
    //   const checkbox = event.target as HTMLInputElement; // Cast to HTMLInputElement to access 'checked'
    //   const isChecked = checkbox.checked;
    
    //   // Reset all selections
    //   this.selectedPrice1 = false;
    //   this.selectedPrice2 = false;
    //   this.selectedPrice3 = false;
    
    //   // Enable the selected price if isChecked is true
    //   if (isChecked) {
    //     this['selectedPrice' + priceLevel.charAt(priceLevel.length - 1)] = true; // Dynamically sets the correct selectedPriceX
    //     this.homePrice = this['Price' + priceLevel.charAt(priceLevel.length - 1)]; // Sets homePrice to the selected price
    //   } else {
    //     this.homePrice = ''; // Clears homePrice if the checkbox is unchecked
    //   }
    // }

    updateSelectedPrice(priceLevel: string, event: Event) {
      const checkbox = event.target as HTMLInputElement;
      if (checkbox.checked) {
        // Assuming level_1_Price, level_2_Price, and level_3_Price hold the price values
        this.homePrice = this[`level_${priceLevel.charAt(priceLevel.length - 1)}_Price`];
      } else {
        this.homePrice = ''; // Consider what should happen if a price is deselected
      }
    }
    

    async gigInfoAdd(title : string , year_Of_Experience: string  , type: string, skill: string , level: string   , level_1_Description: string  ,  level_1_Price: string  , level_2_Description: string  , level_2_Price: string  ,  level_3_Description: string  , level_3_Price: string , selectedCategory1: string, selectedSubcategory: string  ){
      this.fullTitle = `I will ${title}`;
      console.log(this.homePrice, "homeprice")
      const result = await this.service.update_gig_info_add( this.gigId,this.fullTitle , year_Of_Experience  , type  , skill  , level  , level_1_Description  ,  level_1_Price  , level_2_Description  , level_2_Price  ,  level_3_Description  , level_3_Price , this.homePrice , selectedCategory1, selectedSubcategory);

      if(result.status===1){
       alert('gig edit successfuly')
      }
      else{
        alert('error in  editing gig')
      }
      ;
    }
  
    submitForm() {
      const fullTitle = `I will ${this.title}`;
      // Now use fullTitle for your submission or processing logic
    }

  }


