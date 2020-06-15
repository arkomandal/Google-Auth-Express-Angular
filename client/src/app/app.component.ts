import { Component } from '@angular/core';
import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public user: SocialUser;
  public loggedIn: boolean;

  constructor(
    private authService: AuthService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((userData) => {
        this.user = userData;
        console.log("provided by frontend: ", userData);
        //this will return user data from google. What you need is a user token which you will send it to the server
        this.authenticationService.authenticate(userData.idToken).subscribe((data) => {
          console.log("provided by backend: ", data);
          localStorage.setItem('token', data['data']['token'])
        });
      });
  }

  signOut(): void {
    //remove jwt token here just like normal logout
    localStorage.removeItem('token');
    this.authService.signOut();
  }

}
