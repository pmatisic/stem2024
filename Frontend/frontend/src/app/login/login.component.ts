import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
//import { UserManagerService } from '../services/user-manager.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule, RouterModule,MatFormFieldModule,MatInputModule,MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  errorMessageBox? : HTMLElement;
  loading = false;

  constructor(private router: Router/*, private userManagerService: UserManagerService*/){

  }

  async ngOnInit(): Promise<void> {
    this.errorMessageBox = document.getElementById("message") as HTMLElement;
  }

  async submitLogin(form: NgForm){
    if(form.valid){
      let email = form.controls['email'].value;
      let password = form.controls['password'].value;
      let header = new Headers();

      header.set("Content-Type", "application/json");
      header.set("accept", "text/plain");
      let body = {email: email, password: password}
      let parameters = {method: 'POST', headers: header, body: JSON.stringify(body)}
    }
  }

  showErrorMessage(form: NgForm){
    let errMsg = "";
    let email = form.controls['email'].errors;
    let password = form.controls['password'].errors;

    if(email?.['required']) errMsg += "Email is required! <br>";
    if(password?.['required']) errMsg += "Password is required! <br>";

    return errMsg;
  }
}