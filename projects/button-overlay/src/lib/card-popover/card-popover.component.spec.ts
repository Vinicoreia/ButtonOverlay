import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CardPopoverComponent} from './card-popover.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';

describe('CardPopoverComponent', () => {
  let component: CardPopoverComponent;
  let fixture: ComponentFixture<CardPopoverComponent>;
  let values: string[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatPaginatorModule, MatCardModule, BrowserAnimationsModule],
      declarations: [CardPopoverComponent],
    })
      .compileComponents();
  }));

  describe('component values are empty', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(CardPopoverComponent);
      component = fixture.componentInstance;
    });

    it('should create with no values', () => {
      // Arrange
      component.values = [];
      fixture.detectChanges();
      // Assert
      expect(component).toBeTruthy();
    });
  });

  describe('component values are not empty', () => {
    beforeEach(() => {
      values = ['Test 1', 'Test 2', 'Test 3'];
      fixture = TestBed.createComponent(CardPopoverComponent);
      component = fixture.componentInstance;
      component.values = values; // Reset the mocked input
      fixture.detectChanges();
    });

    it('should create', () => {
      // Assert
      expect(component).toBeTruthy();
    });

    it('should display first value', () => {
      // Arrange
      const displayedContent = fixture.debugElement.nativeElement.querySelector('mat-card-content > p');
      // Assert
      expect(displayedContent.textContent).toEqual(values[0]);
    });

    it('should display second value when clicking next once', () => {
      // Arrange
      const nextPageButton = fixture.debugElement.nativeElement.querySelector('button[aria-label="Next page"]');
      const displayedContent = fixture.debugElement.nativeElement.querySelector('mat-card-content > p');
      // Act
      nextPageButton.click();
      fixture.detectChanges();
      // Assert
      expect(displayedContent.textContent).toEqual(values[1]);
    });
  });
});
