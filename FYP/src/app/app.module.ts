import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { ContacusComponent } from './components/contacus/contacus.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfessionDetailsComponent } from './components/profession-details/profession-details.component';
import { GigPageComponent } from './components/gig-page/gig-page.component';
import { GigInfoUploadComponent } from './components/gig-info-upload/gig-info-upload.component';
import { GigPricingComponent } from './components/gig-pricing/gig-pricing.component';
import { ForgetPinComponent } from './components/forget-pin/forget-pin.component';
import { SettingTeacherComponent } from './components/setting-teacher/setting-teacher.component';
import { ProfileTeacherComponent } from './components/profile-teacher/profile-teacher.component';
import { HomeAfterLoginComponent } from './components/home-after-login/home-after-login.component';
import { ClickOutsideDirective } from './components/header/clickOutside.directive';
import { HeaderBeforeLoginComponent } from './components/header-before-login/header-before-login.component';
import { EarningComponent } from './components/earning/earning.component';
import { AccountSettingComponent } from './components/account-setting/account-setting.component';
import { PrefrencesComponent } from './components/prefrences/prefrences.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ServicesPageComponent } from './components/services-page/services-page.component';
import { OrderComponent } from './components/order/order.component';
import { GigManageComponent } from './components/gig-manage/gig-manage.component';
import { MeassageManageComponent } from './components/meassage-manage/meassage-manage.component';
import { PrivacypolicyComponent } from './components/privacypolicy/privacypolicy.component';
import { FormsModule } from '@angular/forms';
import { MessageTableComponent } from './message-table/message-table.component';
import { ChatPageComponent } from './chat-page/chat-page.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    ContacusComponent,
    ProfileComponent,
    ClickOutsideDirective,
    
    ProfessionDetailsComponent,
         GigPageComponent,
         GigInfoUploadComponent,
         GigPricingComponent,
         ForgetPinComponent,
         SettingTeacherComponent,
         ProfileTeacherComponent,
         HomeAfterLoginComponent,
         HeaderBeforeLoginComponent,
         EarningComponent,
         AccountSettingComponent,
         PrefrencesComponent,
         AboutusComponent,
         ServicesPageComponent,
         OrderComponent,
         GigManageComponent,
         MeassageManageComponent,
         PrivacypolicyComponent,
         MessageTableComponent,
         ChatPageComponent,
       
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
