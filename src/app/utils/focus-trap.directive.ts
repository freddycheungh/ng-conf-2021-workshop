import {
  AfterViewInit,
  Directive,
  ElementRef,
  Inject,
  Input,
  Renderer2,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[appFocusTrap]',
})
export class FocusTrapDirective implements AfterViewInit, OnChanges, OnDestroy {
  @Input() appFocusTrap: boolean = true;

  private readonly selectors = `
    a[href],
    button,
    textarea,
    input[type="text"],
    input[type="radio"],
    input[type="checkbox"],
    select
  `;
  private listener: () => void;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private elementRef: ElementRef<Document>,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.bindFocusTrapToElement(this.elementRef.nativeElement);
    });
  }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    const { currentValue, previousValue } = simpleChanges.appFocusTrap;

    if (currentValue !== previousValue) {
      if (currentValue) {
        this.bindFocusTrapToElement(this.elementRef.nativeElement);
      } else if (!currentValue && this.listener) {
        this.listener();
      }
    }
  }

  ngOnDestroy(): void {
    this.listener();
  }

  private bindFocusTrapToElement(element: Document): void {
    if (!this.appFocusTrap) {
      return;
    }

    const focusableElements = element.querySelectorAll(this.selectors);
    const firstFocusableElement: any = focusableElements[0];
    const lastFocusableElement: any =
      focusableElements[focusableElements.length - 1];
    const eventCallback = (event: KeyboardEvent) => {
      const isTabPressed = event.code === 'Tab';
      if (!isTabPressed) {
        return;
      }
      if (event.shiftKey) {
        if (firstFocusableElement === this.document.activeElement) {
          lastFocusableElement.focus();
          event.preventDefault();
        }
      } else {
        if (lastFocusableElement === this.document.activeElement) {
          firstFocusableElement.focus();
          event.preventDefault();
        }
      }
    };

    this.listener = this.renderer.listen(element, 'keydown', eventCallback);
  }
}
