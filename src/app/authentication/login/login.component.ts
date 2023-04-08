import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/userModule/services/authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

/**
 * The main role of this component to enable the user login
 */
export class LoginComponent implements OnInit {
  errorMsg: string;
  constructor(
    private authenticateService: AuthenticateService,
    private router: Router
  ) {}

  // If authenticated and the token is valid , navigate to products page
  ngOnInit(): void {
        if(this.authenticateService.checkValidAuthenticatedUser())
              this.router.navigate(['/products']);
  }
  // Check the login and save his token in local storage
  async onSubmit(form: NgForm) {
    this.errorMsg = '';
    let checkLogin = await this.authenticateService.login(
      form.value.username,
      form.value.password
    );
    if (checkLogin) {
      this.router.navigate(['/products']);
    } else {
      this.errorMsg = 'Login Failed !!';
    }
  }
}
