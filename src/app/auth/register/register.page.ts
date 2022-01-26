import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "../auth.service";
import { RegisterRequest } from "../../models/register-request";
import { RegisterRequestApi} from "../../models/register-request-api";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


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

    constructor(private auth: AuthService, private router: Router) {
      this.registerRequest = {
        username: undefined,
        password: undefined,
        confirmation: undefined,
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

         console.log(newUser);


         this.auth.register$(newUser).subscribe( newUser => {
            console.log(newUser);
            this.router.navigateByUrl("/login");
         });

    }

}

