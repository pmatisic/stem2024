import { user } from "./user";
export interface phishing_event {
    event_id: number;
    name: string;
    creation_datetime: Date;
    affected_brand: string;
    description: string;
    malicious_url: string;
    domain_registration_date:Date;
    status:string;
    created_by:user;
  }