import {HttpClient, HttpContext, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, map} from 'rxjs';
import { UserStorageService } from '../storage/user-stoarge.service';
import { StatusResponse } from 'src/app/model/status-response.model';

const BASIC_URL = 'http://localhost:8080/';
export const AUTH_HEADER = 'authorization';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    router: any;
    // private apiUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {
    }

    registerClient(signupRequestDTO: any): Observable<any> {
        return this.http.post(BASIC_URL + "client/sign-up", signupRequestDTO);
    }

    registerCompany(signupRequestDTO: any): Observable<any> {
        return this.http.post(BASIC_URL + "company/sign-up", signupRequestDTO);
    }

    login(username: string, password: string) {
        return this.http.post(BASIC_URL + "authenticate", {username, password}, {observe: 'response'})
            .pipe(
                map((res: HttpResponse<any>) => {
                    console.log(res.body)
                    UserStorageService.saveUser(res.body);
                    const tokenLength = res.headers.get(AUTH_HEADER)?.length;
                    const bearerToken = res.headers.get(AUTH_HEADER)?.substring(7, tokenLength);
                    console.log(bearerToken);
                    UserStorageService.saveToken(bearerToken);
                    return res;
                })
            );
    }

    isUserlogin(data: any) {
        return this.http.post(`${BASIC_URL}authenticate`, data);

    }
    adminLogin(loginRequest: any): Observable<any> {
        console.log("Login request", loginRequest)
        return this.http.post(`${BASIC_URL}authenticate`, loginRequest);
    }


    verifyAccount(token: string): Observable<any> {
        const url = `${BASIC_URL}activate-account?token=${token}`;
        console.log("The url is:" + url);
        return this.http.get(url);
    }

    resendActivationCode(token: string): Observable<any> {
        const url = `${BASIC_URL}resend-activation-code?token=${token}`;
        console.log("The url is:" + url);
        return this.http.get(url);
      }
      

    googleLogin(data: any): Observable<any> {
        console.log(data, "passing data...");
        return this.http.post(`${BASIC_URL}api/auth/google-login`, data);
    }

    checkGoogleLogin(): Observable<StatusResponse> {
        return this.http.get<StatusResponse>(`${BASIC_URL}api/auth/check-google-login`);
    }

    signOut() {
        return this.http.get(`${BASIC_URL}logout`);
    }
    
    logout() {
        this.http.get(`${BASIC_URL}logout`).subscribe(() => {
          UserStorageService.clearUser();
          UserStorageService.clearToken();
          this.router.navigate(['home']); // Ensure `navigate` is properly used
        });
    }

}
