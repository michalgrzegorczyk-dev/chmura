import {Injectable, inject, signal, OnDestroy} from '@angular/core';
import {map, finalize, takeUntil} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {CatFacts} from "./cat-facts.model";
import {forkJoin, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CatFactsService implements OnDestroy {
  public readonly catFacts = signal<string[]>([]);
  public readonly loading = signal<boolean>(false);

  private readonly destroy$ = new Subject<void>();

  private readonly apiUrl = 'https://meowfacts.herokuapp.com/';
  private readonly http = inject(HttpClient);

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadRandomCatFact(): Observable<string> {
    return this.http.get<CatFacts>(this.apiUrl).pipe(map(response => response.data[0])); // ??
  }

  loadRandomCatFacts(amount: number): void {
    this.loading.set(true);
    const requests = Array.from({length: amount}, () => this.loadRandomCatFact());

    // ??
    forkJoin(requests).pipe(finalize(() => this.loading.set(false)), takeUntil(this.destroy$))
      .subscribe((results) => {
        const uniqueFacts = new Set([...this.catFacts(), ...results.filter(fact => fact !== null)]);
        this.catFacts.set(Array.from(uniqueFacts));
        this.loading.set(false);
      });
  }
}
