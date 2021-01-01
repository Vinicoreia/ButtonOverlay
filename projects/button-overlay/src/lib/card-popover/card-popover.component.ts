import {Component, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'card-popover',
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>
          <title>Hints</title>
        </mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>{{currentValue}}</p>
      </mat-card-content>
      <mat-card-actions>
        <mat-paginator [length]="values.length"
                       [pageSize]="1"
                       (page)="onPageChange($event)">
        </mat-paginator>
      </mat-card-actions>
    </mat-card>
  `,
  styles: []
})
export class CardPopoverComponent implements OnInit {
  public values: string[];
  public currentValue = "";

  constructor() { }

  ngOnInit(): void {
    if (this.values.length > 0) {
      this.currentValue = this.values[0];
    }
  }

  public onPageChange($event: PageEvent) {
    const currentIndex = $event.pageIndex;
    this.currentValue = this.values[currentIndex];
  }
}
