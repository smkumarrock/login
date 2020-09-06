import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from "./../environments/environment";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor( private http: HttpClient) { }

  signupservice(signObj):Observable<any>{
    return this.http.post<any>(`${environment.api_url}`+'/signup', signObj).pipe(
      catchError(this.handleError)
    )}

  imgupservice(signObj):Observable<any>{
    return this.http.post<any>(`${environment.api_url}`+'/file', signObj).pipe(
      catchError(this.handleError)
    )}

  loginservice(loginObj):Observable<any>{
    return this.http.post<any>(`${environment.api_url}`+'/login', loginObj).pipe(
      catchError(this.handleError)
    )}

  getUserDetails():Observable<any>{
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('access_token'));
    return this.http.get<any>(`${environment.api_url}`+'/device/read',{headers: headers_object}).pipe(
      catchError(this.handleError)
    )}

  getUserProfile(profile):Observable<any>{
    return this.http.post<any>(`${environment.api_url}`+'/device/profile',{'profile': profile}).pipe(
      catchError(this.handleError)
    )}

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
