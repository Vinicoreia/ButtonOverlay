import {TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {PopoverService} from './popover.service';
import {ConnectionPositionPair, Overlay} from "@angular/cdk/overlay";

@Component({
  selector: 'mock-component',
  template: ``,
  styles: []
})
export class MockEmptyComponent {
  constructor() {}
}

export class MockedOverlay {
  private readonly mockedInstance = { instance: 'all good' };

  private readonly mockedRef = { attach: () => this.mockedInstance };

  constructor() {}

  public create() {
    return this.mockedRef;
  }

  public position() {
    return this;
  }

  public flexibleConnectedTo(origin: HTMLElement) {
    return this;
  }

  public withPositions(pairs: ConnectionPositionPair[]) {
    return this;
  }

  public withFlexibleDimensions(b: boolean) {
    return this;
  }

  public withPush(b: boolean) {
    return this;
  }
}

describe('PopoverService', () => {
  let service: PopoverService;
  let mockedOverlay: MockedOverlay;
  beforeEach(() => {
    mockedOverlay = new MockedOverlay();
    TestBed.configureTestingModule({
      providers: [
        {provide: Overlay, useValue: mockedOverlay}
      ]
    });
    service = TestBed.inject(PopoverService);
  });

  it('should be created', () => {
    // Assert
    expect(service).toBeTruthy();
  });

  it('should open an overlay', () => {
    // Arrange
    const root = document.createElement('div');
    // Act
    const resultPopover = service.open({origin: root, content: []}, MockEmptyComponent)
    // Assert
    expect(resultPopover.componentInstance).toEqual('all good');
  });

  it('should open an overlay with position top-left', () => {
    // Arrange
    const root = document.createElement('div');
    // Act
    const resultPopover = service.open({origin: root, content: [], position: 'top-left'}, MockEmptyComponent)
    // Assert
    expect(resultPopover.componentInstance).toEqual('all good');
  });

  it('should open an overlay with position top-right', () => {
    // Arrange
    const root = document.createElement('div');
    // Act
    const resultPopover = service.open({origin: root, content: [], position: 'top-right'}, MockEmptyComponent)
    // Assert
    expect(resultPopover.componentInstance).toEqual('all good');
  });

  it('should open an overlay with position top-left', () => {
    // Arrange
    const root = document.createElement('div');
    // Act
    const resultPopover = service.open({origin: root, content: [], position: 'bottom-left'}, MockEmptyComponent)
    // Assert
    expect(resultPopover.componentInstance).toEqual('all good');
  });

  it('should open an overlay with position top-left', () => {
    // Arrange
    const root = document.createElement('div');
    // Act
    const resultPopover = service.open({origin: root, content: [], position: 'bottom-right'}, MockEmptyComponent)
    // Assert
    expect(resultPopover.componentInstance).toEqual('all good');
  });
});
