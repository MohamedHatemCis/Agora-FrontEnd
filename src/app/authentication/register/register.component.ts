import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/userModule/models/User';
import { AuthenticateService } from 'src/app/userModule/services/authenticate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

/**
 * The main role of this component to enable the user login
 */
export class RegisterComponent {
  errorMsg: string;
  user: User = new User();
  constructor(
    private authenticateService: AuthenticateService,
    private router: Router
  ) {}

  // Check the date and register him ,then save his token in local storage.
  async onSubmit(form: NgForm) {
    this.errorMsg = '';
    let check = await this.authenticateService.register(form.value);
    if (check) {
      this.router.navigate(['/products']);
    } else {
      this.errorMsg = 'Register Failed !!';
    }
  }
}
