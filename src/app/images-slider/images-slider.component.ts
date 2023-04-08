import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-images-slider',
  templateUrl: './images-slider.component.html',
  styleUrls: ['./images-slider.component.css']
})

/**
 * The main role of this component is to slide the images
 * Each image width took all the screen width 
 * All images located next to each other horizontly 
 */
export class ImagesSliderComponent {
  @ViewChild('widgetsContent') widgetsContent: ElementRef;
  screenWidth: number;

  //Get the actual screen width and save it .
  constructor(private el: ElementRef) {
    this.screenWidth = window.innerWidth;
  }

  //Listen for resizing the screen width
  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.screenWidth = window.innerWidth;
  }

  // Get the previous image .
  scrollLeft(){
    this.widgetsContent.nativeElement.scrollLeft -= this.screenWidth;
  }

  // Get the next image .
  scrollRight(){
    this.widgetsContent.nativeElement.scrollLeft += this.screenWidth;
  }
}
