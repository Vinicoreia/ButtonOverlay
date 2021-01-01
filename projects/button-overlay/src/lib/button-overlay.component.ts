import {Component, Input} from '@angular/core';
import {Popover, PopoverParams, PopoverPosition, PopoverService} from './popover/popover.service';
import {CardPopoverComponent} from './card-popover/card-popover.component';
import {ThemePalette} from '@angular/material/core';
import {OverlayConfig} from '@angular/cdk/overlay';

@Component({
  selector: 'button-overlay',
  template: `
    <div #origin>
      <button mat-button [color]="color" (click)="openOverlay(origin)">{{title}}</button>
    </div>
  `,
  styles: []
})
export class ButtonOverlayComponent {
  @Input() public position?: PopoverPosition = 'top-right';
  @Input() public config?: OverlayConfig = {};
  @Input() public title: string;
  @Input() public width: string | number;
  @Input() public height: string | number;
  @Input() public content: string[];
  @Input() public color?: ThemePalette;

  constructor(private readonly popoverService: PopoverService) { }

  public openOverlay(origin: HTMLElement): void {
    const popover: Popover<CardPopoverComponent> = this.createPopover(origin);
    // This is specific to the library and can be improved and generalized
    popover.componentInstance.values = this.content;
    popover.overlayRef.backdropClick().subscribe(() => popover.overlayRef.dispose());
  }

  private getDefaultPopoverParams(origin: HTMLElement): PopoverParams {
    return {
      content: this.content,
      position: this.position,
      config: this.config,
      origin,
    };
  }

  private createPopover(origin: HTMLElement): Popover<CardPopoverComponent> {
    return this.popoverService.open<CardPopoverComponent>(
      this.getDefaultPopoverParams(origin),
      CardPopoverComponent
    );
  }
}
