import { Directive, HostListener, ElementRef  } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  

  constructor( private el: ElementRef){}

  @HostListener('click')
  imageChange(){

    var src:any = this.el.nativeElement.src;
    var mainimg:any = document.getElementById("mainimg");
    mainimg.src = src;
    var imgSlide = document.getElementsByClassName("activeimg");
    for (let i = 0; i < imgSlide.length; i++){
      imgSlide[i].classList.remove('activeimg');
    }
    this.el.nativeElement.classList.add('activeimg');
  }
  

}
