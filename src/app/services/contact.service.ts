import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { baseURL } from '../shared/baseurl';
import { clients, contactmessages } from '../shared/constants';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ContactMessage } from '../shared/contactMessage';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) {

  }

  getContactMessages(): Observable<ContactMessage[]> {
    return this.http.get(baseURL + contactmessages) as Observable<ContactMessage[]>;
  }

  addContactMessage(contactMessage: ContactMessage): Observable<ContactMessage> {
    console.log(contactMessage);
    return this.http.post<ContactMessage>(baseURL + contactmessages, contactMessage, httpOptions).pipe(
      catchError(this.handleError)
    );
    console.log(contactMessage);
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
