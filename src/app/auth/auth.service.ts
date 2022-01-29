import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ReplaySubject, Observable, from, throwError } from "rxjs";
import { catchError, delayWhen, map } from "rxjs/operators";
import { environment } from "src/environments/environment";

import { AuthResponse } from "../models/auth-response";
import { User } from "../models/user";
import { AuthRequest } from "../models/auth-request";
import { Storage } from "@ionic/storage-angular";
import { RegisterRequestApi } from "../models/register-request-api";
import { RequestError } from "../models/request-error";

/**
 * Authentication service for login/logout.
 */
@Injectable({ providedIn: "root" })
export class AuthService {
  #auth$: ReplaySubject<AuthResponse | undefined>;

  constructor(private http: HttpClient, private storage: Storage) {
    this.#auth$ = new ReplaySubject(1);
    // Emit an empty value on startup for now
    this.storage.get('auth').then((auth) => {
      // Emit the loaded value into the observable stream.
      this.#auth$.next(auth);
    });
  }

  private saveAuth$(auth: AuthResponse): Observable<void> {
    return from(this.storage.set('auth', auth));
  }

  isAuthenticated$(): Observable<boolean> {
    return this.#auth$.pipe(map((auth) => Boolean(auth)));
  }

  getUser$(): Observable<User> {
    return this.#auth$.pipe(map((auth) => auth?.user));
  }

  getToken$(): Observable<string> {
    return this.#auth$.pipe(map((auth) => auth?.token));
  }

  register$(registerRequest: RegisterRequestApi): Observable<User> {
    const registerUrl = `${environment.apiUrl}/users`;
    return this.http.post<User>(registerUrl, registerRequest).pipe(
      catchError(this.handleError)
    );

  }

  logIn$(authRequest: AuthRequest): Observable<User> {

    const authUrl = `${environment.apiUrl}/auth`;
    return this.http.post<AuthResponse>(authUrl, authRequest).pipe(
      // Delay the observable stream while persisting the authentication response.
      delayWhen((auth) => this.saveAuth$(auth)),
      map(auth => {
        this.#auth$.next(auth);
        console.log(`User ${auth.user.name} logged in`);
        return auth.user;
      }),
      catchError(this.handleError)
    );
  }

  logOut(): void {
    this.#auth$.next(null);
    // Remove the stored authentication from storage when logging out.
    this.storage.remove('auth');
  }

  private handleError(err: HttpErrorResponse) {
    let error:RequestError; 
    if (err.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      error = {
        type: "NETWORK",
        message: "Servers unreachable. Please verify your connection and try again !"
      }
    } else if(err.error.errors.name.kind == "unique"){
      error = {
        type: "UNIQUE",
        message: "The username \"" + err.error.errors.name.value + "\" is already in use."
      }
    }else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      error = {
        type: "UNAUTHORIZED",
        message: err.error
      }
    }
    // Return an observable with a user-facing error message.
    return throwError(error);
  }
}
