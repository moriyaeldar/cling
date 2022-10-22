import { Component, OnInit } from '@angular/core';
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
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor( builder: FormBuilder,private authService:AuthService) {
    this.signupForm = builder.group({
     
      userName: [''],
      password: [''],
      email: [''],
      
    });
   }

  ngOnInit(): void {
  }
onSubmit(){
  const credentials=this.signupForm.value
 this.authService.signUp(credentials.userName,credentials.password,credentials.email)
}
}
