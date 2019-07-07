import {Injectable} from '@angular/core';
import { Observable, throwError } from 'rxjs';
import 'rxjs-compat/add/observable/of';
import 'rxjs-compat/add/operator/delay';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {baseURL} from '../shared/baseurl';

import { catchError } from 'rxjs/operators';
import { Campaign } from '../shared/campaign';
import { campaigns } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private http: HttpClient) {
  }

  getCampaigns(): Observable<Campaign[]> {
    return this.http.get(baseURL + campaigns) as Observable<Campaign[]>;
  }

  getCampaign(id: number): Observable<Campaign> {
    return this.http.get(baseURL + campaigns + id) as Observable<Campaign>;
  }

  addCampaign(campaign: Campaign): Observable<Campaign> {
    console.log(campaign);
    return this.http.post<Campaign>(baseURL + campaigns, campaign, httpOptions).pipe(
        catchError(this.handleError)
    );
    console.log(campaign);
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
