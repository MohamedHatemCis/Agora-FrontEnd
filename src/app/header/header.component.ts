import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationStorageService } from '../localStorage/authenticationStorage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
/**
 * The main purpose of this component is to :-
            - check if the user is logged or not .
            - check if the user is an admin or not .
 */
export class HeaderComponent implements OnInit {
  isLogged: number = 0;
  isAdmin: Boolean = false;
  subscription: Subscription;

  constructor(private authenticateService: AuthenticationStorageService) {}

  /**
   * The mean purpose of the ngOninit is to :- 
             - Check if the user is logged or not .
             - Check if the user is an admin or not .
             - Update the header .
   */
  ngOnInit(): void {
    
    // Subscripe to listen for any updates to refresh the header .
    this.subscription = this.authenticateService.isLoggedSubject.subscribe(
      (res) => {
        this.isLogged = res;
        this.isAdmin = this.authenticateService.checkIfIsAdmin();
      }
    );
    this.authenticateService.getLoggedState();
  }

  // Clear all local storage data
  logout() {
    this.authenticateService.clearStorage();
  }

}
