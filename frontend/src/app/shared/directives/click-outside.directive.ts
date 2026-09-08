import {Directive, ElementRef, EventEmitter, HostListener, Output} from "@angular/core";

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {
  @Output() public appClickOutside: EventEmitter<void> = new EventEmitter<void>();

  constructor(private readonly elementRef: ElementRef) {
  }

  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.appClickOutside.emit();
    }
  }
}
