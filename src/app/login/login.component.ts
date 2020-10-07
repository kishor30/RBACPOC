import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';
import { AuthenticationService } from './auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = new FormControl('');
  password = new FormControl('');
  isValidLogin:Boolean = true;
  successMessage:String;
  errorMessage:String = "Invalid Credentials";
  constructor(private _httpService: HttpService, private router: Router,private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }
  loginClicked() {
    console.log(this.username.value, this.password.value);
    this._httpService.login(this.username.value, this.password.value).subscribe((data) =>{
      console.log(data);
      this.authenticationService.setCredentials(this.username.value,this.password.value)
      this.isValidLogin = true
      this.successMessage = "Successfully Logged in"
      this.router.navigateByUrl('/list');

    },() => {
      this.isValidLogin = false;
    
    });      
     
   
  }

}
