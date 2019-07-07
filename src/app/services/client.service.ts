import {Injectable} from '@angular/core';
import { Observable, throwError } from 'rxjs';
import 'rxjs-compat/add/observable/of';
import 'rxjs-compat/add/operator/delay';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {baseURL} from '../shared/baseurl';
import { clients } from '../shared/constants';
import { Client } from '../shared/client';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) {
  }

  getClients(): Observable<Client[]> {
    return this.http.get(baseURL + clients) as Observable<Client[]>;
  }

  getClient(id: number): Observable<Client> {
    return this.http.get(baseURL + clients + id) as Observable<Client>;
  }

  addClient(client: Client): Observable<Client> {
    console.log(client);
    return this.http.post<Client>(baseURL + clients, client, httpOptions).pipe(
        catchError(this.handleError)
    );
    console.log(client);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
  })
};
