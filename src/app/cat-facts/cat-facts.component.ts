import {Component, OnInit, inject} from '@angular/core';
import {CatFactsService} from './cat-facts.service';
import {ListComponent} from "../shared/components/list/list.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-cat-facts',
  template: `
    <h1>Cat Facts</h1>
    <div class="cat-facts-container">
      <app-list [loading]="catFactsVM.loading()" (onLoadMore)="loadCatFacts()" [items]="catFactsVM.facts()"/>
    </div>
  `,
  styles: [`
    .cat-facts-container {
      height: 300px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
    }
  `],
  standalone: true,
  imports: [ListComponent, ListComponent, NgIf]
})
export default class CatFactsComponent implements OnInit {
  private readonly catFactsService = inject(CatFactsService);
  protected readonly catFactsVM = {
    facts: this.catFactsService.catFacts,
    loading: this.catFactsService.loading
  };
  private readonly initialFactsAmount = 100;

  ngOnInit(): void {
    this.loadCatFacts();
  }

  loadCatFacts(): void {
    this.catFactsService.loadRandomCatFacts(this.initialFactsAmount);
  }
}
