import { NgModule } from '@angular/core';
import { FocusTrapDirective } from './focus-trap.directive';

@NgModule({
  declarations: [FocusTrapDirective],
  exports: [FocusTrapDirective],
})
export class FocusTrapDirectiveModule {}
