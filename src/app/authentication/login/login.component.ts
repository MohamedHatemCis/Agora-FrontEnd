import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/userModule/services/authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
errorMsg:string;
constructor(private authenticateService:AuthenticateService,private router:Router){}

async onSubmit(form:NgForm){
  this.errorMsg="";
  let checkLogin=await this.authenticateService.login(form.value.username, form.value.password);
  if(checkLogin){
    this.router.navigate(['/products']);
  }
  else
  {
    this.errorMsg="Login Failed !!";
  }
}
}
