import {HttpClient, HttpContext, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UserStoargeService } from '../storage/user-stoarge.service';

const BASIC_URL = 'http://localhost:8080/';
export const AUTH_HEADER = 'authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
    private userStorageService: UserStoargeService) { }

  registerClient(signupRequestDTO:any): Observable<any>{
    return this.http.post(BASIC_URL +   "client/sign-up", signupRequestDTO);
  }

  registerCompany(signupRequestDTO:any): Observable<any>{
    return this.http.post(BASIC_URL + "company/sign-up", signupRequestDTO);
  }

  login(username:string, password:string){
    return this.http.post(BASIC_URL +   "authenticate", { username, password}, { observe: 'response' })
      .pipe(
        map((res: HttpResponse<any>) =>{
          console.log(res.body)
          this.userStorageService.saveUser(res.body);
          const tokenLength = res.headers.get(AUTH_HEADER)?.length;
          const bearerToken = res.headers.get(AUTH_HEADER)?.substring(7, tokenLength);
          console.log(bearerToken);
          this.userStorageService.saveToken(bearerToken);
          return res;
        })
      );
  }

  verifyAccount(token: string): Observable<any> {
    const url = `${BASIC_URL}activate-account?token=${token}`;
    console.log("The url is:"+url);
    return this.http.get(url);
  }

  // /** Path part for operation `confirm()` */
  // static readonly ConfirmPath = '/activate-account';
  //
  // /**
  //  * This method provides access to the full `HttpResponse`, allowing access to response headers.
  //  * To access only the response body, use `confirm()` instead.
  //  */
  // confirm$Response(params: Confirm$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  //   return confirm(this.http, this.rootUrl, params, context);
  // }
  //
  // /**
  //  * This method provides access only to the response body.
  //  * To access the full response (for headers, for example), `confirm$Response()` instead.
  //  *
  //  * This method doesn't expect any request body.
  //  */
  // confirm(params: Confirm$Params, context?: HttpContext): Observable<void> {
  //   return this.confirm$Response(params, context).pipe(
  //     map((r: StrictHttpResponse<void>): void => r.body)
  //   );
  // }

}
