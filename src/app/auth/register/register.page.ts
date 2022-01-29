import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "../auth.service";
import { AuthRequest } from "../../models/auth-request";
import { RegisterRequest } from "../../models/register-request";
import { RegisterRequestApi} from "../../models/register-request-api";
import { alertController } from '@ionic/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  errorMessage: string;


  ngOnInit() {
  }


   /**
   * This authentication request object will be updated when the user
   * edits the register form. It will then be sent to the API.
   */
    registerRequest: RegisterRequest;

    /**
     * If true, it means that the authentication API has return a failed response
     * (probably because the name or password is incorrect).
     */
    registerError: boolean;

    constructor(private auth: AuthService,
      private router: Router,
      public alertController: AlertController) {
      this.registerRequest = {
        username: undefined,
        password: undefined,
      };
    }

    /**
     * Called when the login form is submitted.
     */
    createUser(form: NgForm) {
      // Do not do anything if the form is invalid.
      if (form.invalid) {
        return;
      }

      // Hide any previous registering error.
      this.registerError = false;

        let newUser: RegisterRequestApi = {
          "name": this.registerRequest.username,
          "password": this.registerRequest.password,
         }

         this.auth.register$(newUser).subscribe( newUser => {
          let authRequest: AuthRequest = {
            username: newUser.name,
            password: this.registerRequest.password,
          }
          this.auth.logIn$(authRequest).subscribe({
            next: () => this.router.navigateByUrl("/"),
            error: (err) => {
                //the is just created. The only error could be a network one
                this.showNetworkPopUpAlert();
            }
          });
         }, err => {
          if(err.type === "UNAUTHORIZED") {
            this.errorMessage = "invalid username or password."
            this.registerError = true;
          } else if(err.type === "UNIQUE") {
            this.errorMessage = err.message;
            this.registerError = true;
          } else {
            this.showNetworkPopUpAlert();
          }
          console.warn(err);
         });

    }

    showNetworkPopUpAlert(): void {
      this.alertController.create({
        header: 'Network issue',
        message: 'The request cannot be made to the server. Please check your connection and try again.',
        buttons: ['OK'],
      }).then(res => {
        res.present();
      });
    }

}

