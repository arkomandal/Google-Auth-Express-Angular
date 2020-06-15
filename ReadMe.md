if your project is in angular 8 please run it
ng update @angular/core @angular/cli

references:
https://codinglatte.com/posts/angular/sign-in-with-google-angular/
https://stackoverflow.com/questions/53158725/how-to-use-google-oauth-with-node-js-backend-and-angular-frontend


use same clientid for frontend and backend.
use credential localhost:4200/

enable
Google Analytics API					
Google+ API					
Identity Toolkit API	


Authentication Workflow
In this section we will describe the process of the Facebook authentication. While in our case we will use a client application written in Angular 2 and a backend REST API that is written in Express.js. Similar process can be applied for any single page application (SPA) and the REST API backend.
When users want to register for our application, they will click the “Signup with Facebook”. When the button is clicked, our client application will request an access token from Facebook. Then, the user will be presented with a dialog to allow the application to access some of their Facebook data. If the user gives their permission, our client application will get the Facebook access token in response. At this moment we can access user data from the client application, but an account is not yet created at our backend. In order to create new user account, our client application sends a request to our backend with the Facebook access token. The backend needs to verify the Facebook access token, so it is sends a verification request directly to Facebook. If the Facebook token is valid, the Facebook server will send user data back to our application. Upon receiving this data, the backend server has verified that the user credentials are valid and will create a user profile in our application with data received from Facebook. After that, the backend needs to create a JSON Web Token (JWT) which will be used to identify the user. This token is then sent in a response to the client application. The client application will receive JWT and save it for further use. Every request that goes to the backend server should contain a JWT which uniquely identifies the user. The described flow is shown in figure 1.
The process for user login is similar, so we will not describe it in details. During the login process, users do not need to allow the application to access its Facebook data and the backend will not use the Facebook data to create a new user, but will instead update the user profile data on our backend.