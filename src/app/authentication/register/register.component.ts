import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/User';
import { AuthenticateService } from 'src/app/services/authenticate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user:User=new User();
  constructor(private authenticateService:AuthenticateService){}
  onSubmit(form:NgForm){
    this.authenticateService.register(form.value)
  }

}
