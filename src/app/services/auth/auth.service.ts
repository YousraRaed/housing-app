import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { UserModel } from '../../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(user: UserModel): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/vnd.api+json',
      authentication: 'Aa123456',
    });

    const body = {
      data: {
        type: 'auth',
        attributes: {
          username: user.username,
          password: user.password,
        },
      },
    };

    return this.http.post<any>(this.apiUrl, body, { headers }).pipe(
      map((response) => response),
      catchError(() => of({ error: true }))
    );
  }
}
