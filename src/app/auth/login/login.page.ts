import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";

import { AuthService } from "../auth.service";
import { AuthRequest } from "../../models/auth-request";
import { RequestError } from "src/app/models/request-error";

/**
 * Login page.
 */
@Component({
  templateUrl: "login.page.html",
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  /**
   * This authentication request object will be updated when the user
   * edits the login form. It will then be sent to the API.
   */
  authRequest: AuthRequest;

  /**
   * If true, it means that the authentication API has return a failed response
   * (probably because the name or password is incorrect).
   */
  loginError: boolean;

  constructor(private auth: AuthService,
    private router: Router,
    public alertController: AlertController) {
    this.authRequest = {
      username: undefined,
      password: undefined,
    };
  }

  /**
   * Called when the login form is submitted.
   */
  onSubmit(form: NgForm) {
    // Do not do anything if the form is invalid.
    if (form.invalid) {
      return;
    }

    // Hide any previous login error.
    this.loginError = false;

    // Perform the authentication request to the API.
    this.auth.logIn$(this.authRequest).subscribe({
      next: () => this.router.navigateByUrl("/"),
      error: (err:RequestError) => {
        if(err.type === "UNAUTHORIZED") {
          this.loginError = true;
        } else {
          this.showNetworkPopUpAlert();
        }
      },
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
