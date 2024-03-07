import {Component, ChangeDetectionStrategy, Output, EventEmitter, input, signal} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ScrollingModule, CdkFixedSizeVirtualScroll, CdkVirtualForOf} from '@angular/cdk/scrolling';
import {InfiniteScrollModule} from "ngx-infinite-scroll";

@Component({
  selector: 'app-list',
  template: `
    @if (items().length > 0) {
      <ul>
        <cdk-virtual-scroll-viewport (scrolledIndexChange)="scroll($event)" [itemSize]="itemSize()">
          <li *cdkVirtualFor="let item of items(); let index = index">{{ index + 1 }}.{{ item }}</li>
        </cdk-virtual-scroll-viewport>
      </ul>
    } @else if(items().length === 0 && loading()) {
      <p>Loading initial data.</p>
    } @else {
      <p>No data.</p>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgForOf, NgIf, CdkFixedSizeVirtualScroll, CdkVirtualForOf, ScrollingModule, InfiniteScrollModule],
  styles: [`
    :host {
      display: block;
      height: 100%;
    }
  `]
})
export class ListComponent {
  items = input<string[]>([]);
  itemSize = input<number>(40.5);
  loading = input<boolean>(false);

  @Output()
  readonly onLoadMore = new EventEmitter<void>();

  private readonly scrollIndex = signal(0);
  private readonly scrollIndexOffset = 20;

  scroll(index: number): void {
    if (index > this.scrollIndex() && !this.loading()) {
      this.scrollIndex.set(index + this.scrollIndexOffset);
      this.onLoadMore.emit();
    }
  }
}
