import {Component, ChangeDetectionStrategy} from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <router-outlet/>`,
  imports: [RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
}
