import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { phishing_event } from '../interfaces/event';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-event-view',
  standalone: true,
  imports: [CommonModule,MatInputModule,MatCardModule,MatButtonModule,RouterModule,MatIconModule],
  templateUrl: './event-view.component.html',
  styleUrl: './event-view.component.scss'
})
export class EventViewComponent {
    page:number;
    events:Array<phishing_event> = new Array<phishing_event>;
    constructor() {
      this.page = 0;
      var event: phishing_event = {
        event_id: 1,
        name: 'New Phishing Event',
        creation_datetime: new Date(), // Assuming current date and time
        affected_brand: 'Example Brand',
        description: 'Description of the new event AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        malicious_url: 'https://example.com',
        domain_registration_date: new Date(), // Assuming current date
        status: 'Active',
        created_by: {
          user_id: 1,
          name: 'admin',
          surname: 'aa',
          email: 'bb'
        }
      }; 
      var event2: phishing_event = {
        event_id: 2,
        name: 'New Phishing Events',
        creation_datetime: new Date(), // Assuming current date and time
        affected_brand: 'Example Brand',
        description: 'Description of the new event',
        malicious_url: 'https://example.com',
        domain_registration_date: new Date(), // Assuming current date
        status: 'Active',
        created_by: {
          user_id: 1,
          name: 'admin',
          surname: 'aa',
          email: 'bb'
        }
      }; 
      this.events[0] = event;
      this.events[1] = event2;
    }

    changePage(broj: number){
      return broj+1;
    }
    
    openEventDetails(){
      return null;
    }
}
