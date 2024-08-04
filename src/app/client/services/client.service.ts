import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from 'src/app/basic/services/storage/user-stoarge.service';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
    private googleUserInfoUrl = 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json';

    constructor(private http: HttpClient) {
    }

    getAllAds(): Observable<any> {
        return this.http.get(BASIC_URL + `api/client/ads`, {
            headers: this.createAuthorizationHeader()
        })
    }

    searchAdByName(name: any): Observable<any> {
        return this.http.get(BASIC_URL + `api/client/search/${name}`, {
            headers: this.createAuthorizationHeader()
        })
    }

    getAdDetailsByAdId(adId: any): Observable<any> {
        return this.http.get(BASIC_URL + `api/client/ad/${adId}`, {
            headers: this.createAuthorizationHeader()
        })
    }

    bookService(bookDTO: any): Observable<any> {

        return this.http.post(BASIC_URL + `api/client/book-service`, bookDTO, {
            headers: this.createAuthorizationHeader()
        })
    }

    getMyBookings(): Observable<any> {
        const userId = UserStorageService.getUserId();
        return this.http.get(BASIC_URL + `api/client/my-bookings/${userId}`, {
            headers: this.createAuthorizationHeader()
        })
    }

    giveReview(reviewDTO: any): Observable<any> {
        return this.http.post(BASIC_URL + `api/client/review`, reviewDTO, {
            headers: this.createAuthorizationHeader()
        })
    }

    createAuthorizationHeader(): HttpHeaders {
        let authHeaders: HttpHeaders = new HttpHeaders();
        return authHeaders.set(
            'Authorization',
            'Bearer ' + UserStorageService.getToken()
        )
    }

    authenticateWithGoogle(token: string): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get(this.googleUserInfoUrl, {headers});
    }


}
