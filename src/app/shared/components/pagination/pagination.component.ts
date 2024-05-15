import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnInit {
  @Input() currentPage: number = 1;
  @Input() maxPage: number = 2;

  @Output() onPageClick: EventEmitter<number> = new EventEmitter<number>();

  displayToLeftArrow: boolean = false;
  displayToRightArrow: boolean = false;

  displayMinPageButton: boolean = false;
  displayMaxPageButton: boolean = false;

  displayMinusOneButton: boolean = false;
  displayPlusOneButton: boolean = false;

  ngOnInit(): void {
    this.displayToLeftArrow = this.currentPage != 1;
    this.displayToRightArrow = this.currentPage != this.maxPage;

    let currentPageMinusOne = --this.currentPage;
    let currentPagePlusOne = ++this.currentPage;
    let maxPageMinusOne = --this.maxPage;
    ++this.maxPage;

    this.displayMinPageButton = currentPageMinusOne >= 1;
    this.displayMaxPageButton = currentPagePlusOne < this.maxPage;

    this.displayMinusOneButton = currentPageMinusOne >= 2;
    this.displayPlusOneButton = currentPagePlusOne <= --maxPageMinusOne;
  }

  click(page: number) {
    this.onPageClick.emit(page);
  }
}
