import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-new-event',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule,MatFormFieldModule,ReactiveFormsModule,MatSelectModule,MatInputModule,MatButtonModule],
  templateUrl: './new-event.component.html',
  styleUrl: './new-event.component.scss'
})
export class NewEventComponent implements OnInit  {
  eventForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.eventForm = this.formBuilder.group({
      name: ['', Validators.required],
      creationDateTime: ['', Validators.required],
      affectedBrand: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(1500)]],
      maliciousUrl: ['', Validators.required],
      registrationDate: ['', Validators.required],
      dnsRecords: ['', Validators.required],
      matchingKeywords: [''],
      status: ['', Validators.required],
      analystComments: ['']
    });
  }

  saveEvent(): void {
    if (this.eventForm.valid) {
      // Logic to save the event
      console.log('Event saved:', this.eventForm.value);
    } else {
      // Handle form validation errors
    }
  }
}
