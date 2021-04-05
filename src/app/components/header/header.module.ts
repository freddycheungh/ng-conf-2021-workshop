import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header.component';
import { FocusTrapDirectiveModule } from '@utils/focus-trap.module';

@NgModule({
  imports: [RouterModule, CommonModule, FocusTrapDirectiveModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class HeaderModule {}
