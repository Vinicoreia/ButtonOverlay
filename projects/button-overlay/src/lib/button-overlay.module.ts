import { NgModule } from '@angular/core';
import { ButtonOverlayComponent } from './button-overlay.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { PopoverService } from './popover/popover.service';
import { CardPopoverComponent } from './card-popover/card-popover.component';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [ButtonOverlayComponent, CardPopoverComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    OverlayModule
  ],
  providers: [PopoverService],
  exports: [ButtonOverlayComponent]
})
export class ButtonOverlayModule { }
