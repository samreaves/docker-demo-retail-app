import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  signInForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(40),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(40),
    ])
  });

  constructor(
    public readonly userService: UserService,
  ) { }

  submit() {
    if (
      !this.signInForm.touched
      || !this.signInForm.dirty
      || this.signInForm.invalid
    ) {
      return;
    }

    this.userService.signIn(this.signInForm.value)
  }

  listenForEnter($event: KeyboardEvent) {
    if ($event.keyCode === 13 || $event.code === 'Enter') {
      this.submit();
    }
  }
}
