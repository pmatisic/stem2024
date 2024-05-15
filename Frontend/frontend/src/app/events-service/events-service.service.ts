import { Injectable } from '@angular/core';
import { dns_records, event_comments, event_keywords, phishing_event } from '../interfaces/event';
import { user } from '../interfaces/user';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})

export class EventsServiceService {

  events:Array<phishing_event> = new Array<phishing_event>;
  comments:Array<event_comments> = new Array<event_comments>;
  dns_records:Array<dns_records> = new Array<dns_records>;
  event_keywords:Array<event_keywords> = new Array<event_keywords>;
  users:Array<user> = new Array<user>;

  constructor(private datePipe: DatePipe) {
    this.loadEvents();
    this.loadUsers();
    this.loadComments(datePipe);
    this.loadDNSRecords();
  }

  private loadEvents():void{
    var event: phishing_event = {
      event_id: 1,
      name: 'Phishing Event example',
      creation_datetime: new Date(),
      affected_brand: 'Sick Mobilisis',
      description: 'Description of the new event',
      malicious_url: 'https://example.com',
      domain_registration_date: new Date(),
      status: 'Active',
      created_by: this.users[0]
    }; 
    var event2: phishing_event = {
      event_id: 2,
      name: 'New Phishing Events',
      creation_datetime: new Date(),
      affected_brand: 'Infinum',
      description: 'Description of the new event',
      malicious_url: 'https://example.com',
      domain_registration_date: new Date(),
      status: 'In-Progress',
      created_by: this.users[1]
    };
    var event3: phishing_event = {
      event_id: 1,
      name: 'New Phishing Event',
      creation_datetime: new Date(),
      affected_brand: 'Example Brand',
      description: 'Description of the new event',
      malicious_url: 'https://example.com',
      domain_registration_date: new Date(),
      status: 'Active',
      created_by: this.users[2]
    }; 
    this.events[0] = event;
    this.events[1] = event2;
    this.events[2] = event3;
  }

  private loadUsers():void{
    var user1: user = {
      user_id: 1,
      name: 'admin',
      surname: 'aa',
      email: 'bb'
    }
    var user2: user = {
      user_id: 2,
      name: 'Tomislav Hlevnjak',
      surname: 'aa',
      email: 'cc'
    }
    var user3: user = {
      user_id: 3,
      name: 'Stanko Smrček',
      surname: 'aa',
      email: 'dd'
    }
    this.users[0] = user1
    this.users[1] = user2
    this.users[2] = user3
  }

  private loadComments(datePipe:DatePipe):void{
    const specificDate = new Date('2022-05-30T12:30:00');
    const formattedDate = this.datePipe.transform(specificDate, 'yyyy-MM-dd HH:mm:ss');
    const specificDate2 = new Date('2022-06-21T17:23:33');
    const formattedDate2 = this.datePipe.transform(specificDate2, 'yyyy-MM-dd HH:mm:ss');
    const specificDate3 = new Date('2022-05-29T12:30:00');
    const formattedDate3 = this.datePipe.transform(specificDate3, 'yyyy-MM-dd HH:mm:ss');
    var comment1: event_comments = {
      comment_id: 1,
      event_id: 1,
      comment: "Ovo je vrlo opasno",
      created_at: formattedDate!!,
      created_by: this.users[0]
    }
    var comment2: event_comments = {
      comment_id: 2,
      event_id: 1,
      comment: "Radimo na tome",
      created_at: formattedDate2!!,
      created_by: this.users[1]
    }
    var comment3: event_comments = {
      comment_id: 3,
      event_id: 2,
      comment: "Ovo je još opasnije",
      created_at: formattedDate3!!,
      created_by: this.users[0]
    }
    this.comments[0] = comment1;
    this.comments[1] = comment2;
    this.comments[2] = comment3;
  }
  
  private loadDNSRecords(){
    var dns_record1: dns_records = {
      dns_id: 1,
      event_id: 1,
      record_type: "A",
      record_value: "192.168.1.0"
    }
    var dns_record2: dns_records = {
      dns_id: 2,
      event_id: 2,
      record_type: "NS",
      record_value: "192.168.1.1"
    }
    var dns_record3: dns_records = {
      dns_id: 3,
      event_id: 3,
      record_type: "MX",
      record_value: "192.168.1.2"
    }
    this.dns_records[0] = dns_record1;
    this.dns_records[1] = dns_record2;
    this.dns_records[2] = dns_record3;
  }

  public getEventById(id:number):phishing_event{
    const filteredItem = this.events.filter(event => event.event_id === id);
    return filteredItem[0];
  }

  public getCommentsForEvent(id_event:number):Array<event_comments>{
    const filteredItems = this.comments.filter(comment => comment.event_id === id_event);
    return filteredItems;
  }

  public getDNSRecordsForEvent(id_event:number):Array<dns_records>{
    const filteredItems = this.dns_records.filter(dns_record => dns_record.event_id === id_event);
    return filteredItems;
  }

  public getUserForComment(id_event:number):Array<user>{
    const filteredItems = this.comments.filter(comment => comment.event_id === id_event);
    return this.users;
  }
}
