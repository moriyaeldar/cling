import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoggedIn: boolean = true;
  user: User = {
    id: "ajnasdjkfnsfs24fsfsfsfsjfsf",
    firstName: "Roi",
    lastName: "Shapira",
    age: 26,
    email: "roishapira@walla.co.il",
    phoneNumber: "0568456479",
    location: "ירושלים",
    interests: ["כדורגל", "כדורסל", "יוגה"],
    aboutMe: "בךשדחלשדג שלךדשדג שגשחשג"
  }
  apiUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  updateUserDetails(user: User): Observable<any> {
    return this.http.post(
     this.apiUrl, 
     JSON.stringify(user))
    .pipe(
      catchError(this.formatErrors))
  } 

  private formatErrors(error: any) {
    return throwError(error.error);
  }
}
