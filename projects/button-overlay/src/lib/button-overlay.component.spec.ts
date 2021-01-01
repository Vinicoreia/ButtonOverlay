import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {of} from 'rxjs';
import {ButtonOverlayComponent} from './button-overlay.component';
import {CardPopoverComponent} from "./card-popover/card-popover.component";
import {ComponentType, Overlay} from "@angular/cdk/overlay";
import {Popover, PopoverParams, PopoverService} from "./popover/popover.service";
import {MatButtonModule} from "@angular/material/button";

export class PopoverServiceMock {
  constructor() {}

  public open<T>(popoverParams: PopoverParams, component: ComponentType<T>): Popover<T> {
    return {
      componentInstance: {},
      overlayRef: {
        dispose: () => {
        },
        backdropClick: () => of(new MouseEvent(''))
      }
    } as Popover<T>;
  }
}

describe('ButtonOverlayComponent', () => {
  let component: ButtonOverlayComponent;
  let fixture: ComponentFixture<ButtonOverlayComponent>;
  let popoverService: PopoverServiceMock;

  beforeEach(async(() => {
    popoverService = new PopoverServiceMock();
    TestBed.configureTestingModule({
      imports: [MatButtonModule],
      providers: [
        {provide: Overlay, useValue: {}},
        {provide: PopoverService, useValue: popoverService}
      ],
      declarations: [ButtonOverlayComponent, CardPopoverComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonOverlayComponent);
    component = fixture.componentInstance;
    component.content = ['test1', 'test2'];
    fixture.detectChanges();
  });

  it('should create', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should display button name', () => {
    // Arrange
    component.title = 'Test';
    component.color = "primary";
    fixture.detectChanges();
    // Assert
    const button = fixture.debugElement.nativeElement.querySelector('button');
    expect(button.textContent).toEqual('Test');
  });

  it('should open overlay when clicked', () => {
    // Arrange
    const spy = spyOn(popoverService, 'open').and.callThrough();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    // Act
    button.click();
    fixture.detectChanges();
    // Assert
    expect(spy).toHaveBeenCalledWith(
      {
        content: ['test1', 'test2'],
        position: 'top-right',
        origin: button.parentElement,
        config: {},
      },
      CardPopoverComponent
    );
  });

});
