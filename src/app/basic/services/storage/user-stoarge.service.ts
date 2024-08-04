/*
import { Injectable } from '@angular/core';

const TOKEN = 's_token';
const USER = 's_user';

@Injectable({
  providedIn: 'root'
})
export class UserStoargeService {

  constructor() { }

  public saveToken(token : string): void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  public static getToken(): string {
    return localStorage.getItem(TOKEN);
  }

  public saveUser(user): void{
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  static getUser(): any {
    return JSON.parse(localStorage.getItem(USER));
  }

  static getUserId(): string{
    const user = this.getUser();
    if(user === null){return '';}
    return user.userId;
  }

  static getUserRole(): string{
    const user = this.getUser();
    if(user === null){return '';}
    return user.role;
  }

  static isClientLoggedIn(): boolean{
    if(this.getToken() === null){
      return false;
    }
    const role: string = this.getUserRole();
    return role ==  'CLIENT';
  }

  public static isCompanyLoggedIn(): boolean{
    if(this.getToken() === null){
      return false;
    }
    const role: string = this.getUserRole();
    return role ==  'ADMIN';
  }

    static isPartnerLoggedIn(): boolean{
        if(this.getToken() === null){
            return false;
        }
        const role: string = this.getUserRole();
        return role ==  'PARTNER';
    }

  public static signOut(): void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}
*/

import { Injectable } from '@angular/core';

const TOKEN = 's_token';
const USER = 's_user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {
  static router: any;

  constructor() { }

  public static saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  public static getToken(): string {
    const token = localStorage.getItem(TOKEN);
    console.log('Retrieved token from local storage:', token); // Log for debugging
    return token ? token : '';
  }

  public static saveUser(user: any): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  public static getUser(): any {
    const user = localStorage.getItem(USER);
    return user ? JSON.parse(user) : null;
  }

  public static getUserId(): string {
    const user = this.getUser();
    return user ? user.id : '';
  }

  public static getUserRole(): string {
    const user = this.getUser();
    return user ? user.role : '';
  }

  public static isUserLoggedIn(): boolean {
    const token = this.getToken();
    const role = this.getUserRole();
    return token !== '' && role === 'CLIENT';
  }

  public static isAdminLoggedIn(): boolean {
    const token = this.getToken();
    const role = this.getUserRole();
    return token !== '' && role === 'ADMIN';
  }

  public static isPartnerLoggedIn(): boolean {
    const token = this.getToken();
    const role = this.getUserRole();
    return token !== '' && role === 'PARTNER';
  }

  public static signOut(): void {
    console.log('Signing out...');
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER);
    console.log('Token and user data removed.');
    sessionStorage.removeItem('s_token');
    sessionStorage.removeItem('s_user');
    sessionStorage.clear();
  }

   // Clear user details
   static clearUser(): void {
    localStorage.removeItem(USER);
  }

  // Clear token
  static clearToken(): void {
    localStorage.removeItem(TOKEN);
  }
  
}
