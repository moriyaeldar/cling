import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  async signUp(username,password,email) {
      console.log(username,password,email);
    try {
        const { user } = await Auth.signUp({
            username,
            password,
            attributes: {
                email,          // optional
               // optional - E.164 number convention
                // other custom attributes 
            }
        });
        console.log(user);
    } catch (error) {
        console.log('error signing up:', error);
    }
}


async signIn(userName, password) {
    try {
        const user = await Auth.signIn(userName, password);
        console.log(user);
        
    } catch (error) {
        console.log('error signing in', error);
    }
}

async signOut() {
    try {
        await Auth.signOut();
        console.log('bye bye!');
        
    } catch (error) {
        console.log('error signing out: ', error);
    }
}
}

