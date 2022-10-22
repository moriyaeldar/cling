import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLogin:boolean;
  user;
  signInForm: FormGroup;
  googleImg: string =  '../../assets/icons/google.png';

  constructor( builder: FormBuilder,private router: Router,private authService:AuthService) { 
    this.signInForm = builder.group({
      userName: [''],
      password: [''],
    });
  }

onLogin(){
const credentials=this.signInForm.value
this.user=this.authService.signIn(credentials.userName,credentials.password)
if(this.user){
  this.isLogin=true;
}
}
  navToSignup(){
    this.router.navigateByUrl("/signup")
  }
  navToSignout(){
    this.router.navigateByUrl("/signout")
  }
}
