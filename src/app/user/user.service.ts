import { Injectable } from '@angular/core';
import { Router } from '@angular/router'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { User, UserCredentials } from './user.models';
import { mockUser } from './user.constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null); 

  constructor(
    private readonly _http: HttpClient,
    private readonly _router: Router
  ) {}

  /* Make sure token is still valid */
  checkToken(): Observable<boolean> {
    return of(true);
  }

  /* Sign In */
  signIn(credentials: UserCredentials) {
    /* Call sign in endpoint with user / pass payload */
    this.user$.next(mockUser);
    this._router.navigate([`/home`]);
  }

  /* Sign Out */
  signOut(): void {
    /* Clear session storage */
    /* Route to sign in */
    this.user$.next(null);
    this._router.navigateByUrl(`/signin`);
  }

  /* Redirect to onboarding app */
  redirectToSignUp() {
    window.location.href = environment.onboardingURL;
  }

  /* Sign Up */
  signUp() {
    /* Call sign up endpoint with user payload */
    /* Set user token and name in session storage */
    /* Return user */
    this.user$.next(mockUser);
    this._router.navigate([`/home`]);
  }

  /* Get User */
  getUser(): BehaviorSubject<User | null> {
    return this.user$
  }
}
