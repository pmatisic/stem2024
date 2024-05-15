import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { dns_records, event_comments, phishing_event } from '../interfaces/event';
import { RouterModule } from '@angular/router';
import { user } from '../interfaces/user';
import { ActivatedRoute } from '@angular/router';
import { EventsServiceService } from '../events-service/events-service.service';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule,MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss'
})
export class EventDetailsComponent implements OnInit{
  event?:phishing_event;
  comments:Array<event_comments> = new Array<event_comments>;
  dns_records:Array<dns_records> = new Array<dns_records>;
  users:Array<user> = new Array<user>;
constructor(private route: ActivatedRoute, private EventsService: EventsServiceService){

}

ngOnInit(): void {
  const eventId = this.route.snapshot.paramMap.get('id');
  this.event = this.EventsService.getEventById(parseInt(eventId!!, 10));
  this.comments = this.EventsService.getCommentsForEvent(parseInt(eventId!!, 10));
  this.dns_records = this.EventsService.getDNSRecordsForEvent(parseInt(eventId!!, 10));
  this.users = this.EventsService.getUserForComment(parseInt(eventId!!, 10))
}
}
