import { Component } from '@angular/core';
import { faHouse, faUser, faEnvelope, faClipboard } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  house = faHouse;
  profile = faUser;
  message = faEnvelope;
  manage_orders = faClipboard;
}
