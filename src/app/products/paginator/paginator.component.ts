import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})

export class PaginatorComponent implements OnInit {
  @Input()
  public length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent?: PageEvent;

  @Output()
  paginatorState: EventEmitter<PageEvent> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
    // this.length = productsLength
  }
  paginatorChange(pageEvent: PageEvent): void {
    console.log(pageEvent.pageSize*pageEvent.pageIndex)
    this.paginatorState.emit(pageEvent);
  }

}
