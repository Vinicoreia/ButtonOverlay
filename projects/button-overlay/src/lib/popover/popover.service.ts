import {Injectable} from '@angular/core';
import {
  ComponentType,
  ConnectionPositionPair,
  Overlay,
  OverlayConfig,
  OverlayRef,
  PositionStrategy
} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';

export interface PopoverParams {
  readonly origin: HTMLElement;
  readonly content: string[];
  readonly position?: PopoverPosition;
  readonly config?: OverlayConfig;
}

export type PopoverPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export type Popover<T> = {
  overlayRef: OverlayRef;
  componentInstance: T;
};

@Injectable({
  providedIn: 'root'
})
export class PopoverService {

  constructor(private readonly overlay: Overlay) {}

  private static getTopLeftPosition(): ConnectionPositionPair {
    return {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
    };
  }

  private static getTopRightPosition(): ConnectionPositionPair {
    return {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
    };
  }

  private static getBottomLeftPosition(): ConnectionPositionPair {
    return {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom',
    };
  }

  private static getBottomRightPosition(): ConnectionPositionPair {
    return {
      originX: 'end',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'bottom',
    };
  }

  private static getPosition(position: PopoverPosition): ConnectionPositionPair {
    switch (position) {
      case 'top-left':
        return PopoverService.getTopLeftPosition();
      case 'top-right':
        return PopoverService.getTopRightPosition();
      case 'bottom-left':
        return PopoverService.getBottomLeftPosition();
      case 'bottom-right':
        return PopoverService.getBottomRightPosition();
      default:
        return PopoverService.getTopRightPosition();
    }
  }

  public open<T>(popoverParams: PopoverParams, component: ComponentType<T>): Popover<T> {
    const overlayConfig = this.getOverlayConfig(popoverParams);
    const overlayRef = this.createOverlayRef(overlayConfig);
    const overlayInstance = overlayRef.attach(new ComponentPortal(component));
    return {componentInstance: overlayInstance.instance, overlayRef};
  }

  private createOverlayRef(overlayConfig: OverlayConfig): OverlayRef {
    return this.overlay.create(overlayConfig);
  }

  private getOverlayConfig(popoverParams: PopoverParams): OverlayConfig {
    const defaultConfig = new OverlayConfig({
      hasBackdrop: true,
      positionStrategy: this.getOverlayPositionStrategy(popoverParams.origin, popoverParams.position),
      width: 'fit-content',
      height: 'fit-content',
    });

    return new OverlayConfig({
      ...defaultConfig,
      ...popoverParams.config, // Override default values with popover config
    });
  }

  private getOverlayPositionStrategy(origin: HTMLElement, position?: PopoverPosition): PositionStrategy {
    return this.overlay
      .position()
      .flexibleConnectedTo(origin)
      .withPositions([PopoverService.getPosition(position)])
      .withFlexibleDimensions(false)
      .withPush(false);
  }
}
