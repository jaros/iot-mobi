import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {catchError, tap} from "rxjs/operators";
import {of} from "rxjs/observable/of";

/*
  Generated class for the ClientSubscribeServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ClientSubscribeServiceProvider {

  private customerSaveUrl = 'https://script.google.com/macros/s/AKfycbxXLZYReQ0s4ZzVSOkHbKci3ITEcnhMnuv4BwfzfiJH2MpkoN4/exec'; // URL to web api

  constructor(public http: HttpClient) {
    console.log('Hello ClientSubscribeServiceProvider Provider');
  }

  saveCustomer(email: string): Observable<any> {
    return this.http
      .get<any>(this.customerSaveUrl, {
        params: {"email_field": email}
      })
      .pipe(
        tap(data => console.log(`saved customer id: ${data.row}`)),
        catchError( (error: any) => {
          console.log(error);
          return of({});
        })
      );
  }

}
