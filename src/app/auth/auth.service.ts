import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly isLoggedIn = signal<boolean>(false);

  login(isLoggedIn: boolean): void {
    this.isLoggedIn.set(isLoggedIn);
  }
}
