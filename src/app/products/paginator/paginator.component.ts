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
  public pageSize = 10;
  public pageSizeOptions: number[] = [5, 10, 25, 100];
  public pageEvent?: PageEvent;

  @Output()
  paginatorState: EventEmitter<PageEvent> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }
  public paginatorChange(pageEvent: PageEvent): void {
    this.paginatorState.emit(pageEvent);
  }

}
