import { Injectable } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";

@Injectable({providedIn:'root'})
export class HelperFunctions{
constructor(private router:Router){}
    reloadPage(url:string) {
        const navigationExtras: NavigationExtras = { skipLocationChange: true };
        this.router.navigateByUrl('/', navigationExtras).then(() => {
          this.router.navigateByUrl(url);
        });
      }    
}