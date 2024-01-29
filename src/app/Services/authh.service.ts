import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private userName = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  createUser(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/register', data);
  }

  signIn(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/login', data).pipe(
      tap((res) => console.log('Response from server:', res)),
      map((res) => {
        if (res.status === true) {
          this.loggedIn.next(true);
          this.userName.next(res.firstname); // Assuming your API response has a 'firstname' property
        }
        return res;
      })
    );
  }


  getLoggedInStatus(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getUserName(): Observable<string> {
    return this.userName.asObservable();
  }
}

