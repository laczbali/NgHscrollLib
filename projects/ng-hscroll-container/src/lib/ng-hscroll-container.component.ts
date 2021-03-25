import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, SimpleChange, ViewChild } from '@angular/core';

@Component({
  selector: 'ng-hscroll-container',
  templateUrl: './ng-hscroll-container.component.html',
  styleUrls: ['./ng-hscroll-container.component.scss']
})
export class NgHscrollContainerComponent implements OnInit {

  constructor(private cd: ChangeDetectorRef) { }

  // TODO extra comments
  // TODO animation for scroll button hide/show
  // TODO test with other type of content
  // TODO customizable: scroller margin, other things?
  // TODO tester app: howto
  // TODO tester app: toggle for extra field

  // ***********************************************************************************************************
  // Check for overflow
  // ***********************************************************************************************************

  @ViewChild('scrollContainer') scrollContainer: ElementRef<HTMLElement>;
  public get scrollContainerElem(): HTMLElement {
    return this.scrollContainer.nativeElement;
  }

  @ViewChild('scroller') scroller: ElementRef<HTMLElement>;
  public get scrollerElem(): HTMLElement {
    return this.scroller.nativeElement;
  }

  public get contentOverflow(): boolean {
    if (this.scrollContainer === undefined || this.scroller == undefined) { return false; }

    return this.scrollContainerElem.trueWidth() < this.scrollerElem.trueWidth();
  }

  // ***********************************************************************************************************
  // Check for changes
  // ***********************************************************************************************************

  ngOnInit(): void {
    this.cd.detectChanges();
  }

  @HostListener('window:resize', ['$event']) onResize(event) {
    this.resetScroll();
  }

  onContentChange(changes: MutationRecord[]) {
    this.resetScroll();
  }

  // ***********************************************************************************************************
  // Scroll
  // ***********************************************************************************************************

  scroll(scrollDir: 'left' | 'right') {
    if (this.isScrollButtonDisabled(scrollDir)) { return; }

    if (scrollDir === 'left') {
      const delta = this.getScrollDiff(scrollDir);
      this.appliedDiffs.push(delta);
      this.currentTranslateValue -= delta;
      this.scrollerElem.style.transform = 'translateX(' + this.currentTranslateValue + 'px)';
    } else {
      const delta = this.appliedDiffs.pop();
      this.currentTranslateValue += delta;
      this.scrollerElem.style.transform = 'translateX(' + this.currentTranslateValue + 'px)';
    }
  }

  resetScroll() {
    this.currentTranslateValue = 0;
    this.appliedDiffs = [];
    if (this.scroller !== undefined) {
      this.scrollerElem.style.transform = 'translateX(' + this.currentTranslateValue + 'px)';
    }

    this.cd.detectChanges();
  }

  // ***********************************************************************************************************
  // Check scroll values
  // ***********************************************************************************************************

  currentTranslateValue = 0;
  appliedDiffs: number[] = [];

  getScrollDiff(scrollDir: 'left' | 'right'): number {
    if (scrollDir === 'left') {
      // Scroll to left, move rightmost element to left

      // Get index of rightmost displayed element
      let rightMostItemIndex = null;
      let displayArea = Math.abs(this.currentTranslateValue) + this.scrollContainerElem.trueWidth();
      let displayedItemWidthSum = 0;

      Array.from(this.scrollerElem.children).forEach((elem, i) => {
        displayedItemWidthSum += (elem as HTMLElement).trueWidth();
        if (rightMostItemIndex === null && (displayedItemWidthSum > displayArea)) {
          rightMostItemIndex = (i - 1);
        }
      });

      // Get width we need to "hide"
      const neededHiddenWidth = Array.from(this.scrollerElem.children)
        .slice(0, rightMostItemIndex)
        .reduce((counter, elem) => counter += (elem as HTMLElement).trueWidth(), 0);

      // Get delta of currently- and needed-hidden widths, limit to avaiable space
      let delta = neededHiddenWidth - Math.abs(this.currentTranslateValue);
      if ((displayArea + delta) > this.scrollerElem.trueWidth()) {
        delta = this.scrollerElem.trueWidth() - displayArea;
      }

      return delta;

    } else {
      // Scroll to right, return last applied diff
      return this.appliedDiffs[this.appliedDiffs.length - 1];
    }
  }

  isScrollButtonDisabled(scrollDir: 'left' | 'right'): boolean {
    if (scrollDir === 'left') {
      return this.getScrollDiff(scrollDir) < 0;
    } else {
      return this.currentTranslateValue === 0;
    }
  }

}

declare global {
  interface HTMLElement {
    trueWidth(): number;
    getStyle(property: string): string;
  }
}

HTMLElement.prototype.trueWidth = function (): number {
  const marginLeftStyle = (this as HTMLElement).getStyle('margin-left');
  const marginRightStyle = (this as HTMLElement).getStyle('margin-right');
  const marginLeft = parseFloat(marginLeftStyle.match(/\d+/)[0]);
  const marginRight = parseFloat(marginRightStyle.match(/\d+/)[0]);

  const width = (this as HTMLElement).offsetWidth;
  return width + marginLeft + marginRight;
}

HTMLElement.prototype.getStyle = function (property: string) {
  if (typeof getComputedStyle !== 'undefined') {
    return getComputedStyle(this, null).getPropertyValue(property);
  } else {
    return this.currentStyle[property];
  }
}