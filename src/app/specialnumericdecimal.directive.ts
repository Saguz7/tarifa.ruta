import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
 selector: '[specialNumberAndDecimalOnly]'
})
export class SpecialNumberAndDecimalDirective {
  private regex: RegExp = new RegExp(/^\d*\.?\d{0,2}$/g);
   private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', '-', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];
   constructor(private el: ElementRef) {
   }
   @HostListener('keydown', ['$event'])
   onKeyDown(event: KeyboardEvent) {
     if (this.specialKeys.indexOf(event.key) !== -1) {
       return;
     }
     let current: string = this.el.nativeElement.value;
     let next: string = current.concat(event.key);
     if (next && !String(next).match(this.regex)) {
       event.preventDefault();
     }
   }
 }
