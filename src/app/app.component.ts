import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from './userModule/services/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authenticationService:AuthenticateService,private router:Router){}
  ngOnInit() {
    // if(!this.authenticationService.checkValidAuthenticatedUser())
    //     this.router.navigate(['/login']);
  }
}
