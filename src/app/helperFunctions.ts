import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class HelperFunctions {

  constructor(private router: Router) {}

  // reload the page
  reloadPage(url: string) {
    const navigationExtras: NavigationExtras = { skipLocationChange: true };
    this.router.navigateByUrl('/', navigationExtras).then(() => {
      this.router.navigateByUrl(url);
    });
  }

  // Get the value of the selected option in the select tag
  onOptionSelected(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedIndex = selectElement.selectedIndex;
    return selectElement.options[selectedIndex].value;
  }
}
