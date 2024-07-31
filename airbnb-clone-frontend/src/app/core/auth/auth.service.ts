import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient, HttpParams, HttpStatusCode } from '@angular/common/http';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { State } from '../model/state.model';
import { User } from '../model/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  location = inject(Location);

  notConnected = 'NOT_CONNECTED';

  private fetchUser$: WritableSignal<State<User>> = signal(
    State.Builder<User>().forSuccess({ email: this.notConnected })
  );
  fetchUser = computed(() => this.fetchUser$());

  fetch(forceResync: boolean): void {
    this.fetchHttpUser(forceResync).subscribe({
      next: (user) => this.fetchUser$.set(State.Builder<User>().forSuccess(user)),
      error: (err) => {
        if (err.status === HttpStatusCode.Unauthorized && this.isAuthenticated()) {
          this.fetchUser$.set(State.Builder<User>().forSuccess({ email: this.notConnected }));
        } else {
          this.fetchUser$.set(State.Builder<User>().forError(err));
        }
      }
    });
  }

  signup(user:{username: string, email: string, password: string}): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/auth/signup`, { username:user.username,email: user.email, password:user. password });
  }

  login(data: LoginData): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/auth/login`, data).pipe(
      tap((response: any) => {
        console.log('Login successful', response);
        // Handle response, like saving tokens or user details
        this.fetchUser$.set(State.Builder<User>().forSuccess(response.user));
      })
    );
  }

  logout(): void {
    this.http.post(`${environment.API_URL}/auth/logout`, {}).subscribe({
      next: (response: any) => {
        this.fetchUser$.set(State.Builder<User>().forSuccess({ email: this.notConnected }));
        location.href = response.logoutUrl;
      }
    });
  }

  isAuthenticated(): boolean {
    if (this.fetchUser$().value) {
      return this.fetchUser$().value!.email !== this.notConnected;
    } else {
      return false;
    }
  }

  fetchHttpUser(forceResync: boolean): Observable<User> {
    const params = new HttpParams().set('forceResync', forceResync);
    return this.http.get<User>(`${environment.API_URL}/auth/get-authenticated-user`, { params });
  }

  hasAnyAuthority(authorities: string[] | string): boolean {
    if (this.fetchUser$().value!.email === this.notConnected) {
      return false;
    }
    if (!Array.isArray(authorities)) {
      authorities = [authorities];
    }
    return this.fetchUser$().value!.authorities!.some((authority: string) =>
      authorities.includes(authority)
    );
  }
}

interface LoginData {
  email: string;
  password: string;
}
