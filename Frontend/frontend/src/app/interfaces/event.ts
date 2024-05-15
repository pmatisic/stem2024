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

export interface dns_records {
  dns_id: number;
  event_id: number;
  record_type: string;
  record_value: string;
}

export interface event_keywords {
  keyword_id: number;
  event_id: number;
  keyword: string;
}

export interface event_comments {
  comment_id: number;
  event_id: number;
  comment: string;
  created_at: Date;
  edited_at: Date;
  created_by:user;
}