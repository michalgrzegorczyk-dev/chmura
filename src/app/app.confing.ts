import {provideHttpClient} from "@angular/common/http";
import {importProvidersFrom} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {provideRouter} from "@angular/router";
import {routes} from "./app.routes";

export const appConfig = {
  providers: [
    provideHttpClient(),
    importProvidersFrom(BrowserModule),
    provideRouter(routes)
  ]
}
