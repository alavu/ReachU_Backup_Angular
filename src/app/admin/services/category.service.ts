import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  // get all category
   public categories() {
    return this.http.get(BASIC_URL + 'api/admin/categories')
  }

  // add new category
  public addCategory(category) {
    return this.http.post(BASIC_URL + 'api/admin/category', category)
  }

    // Update category
    public updateCategory(id: number, category: any): Observable<any> {
      return this.http.put(`${BASIC_URL}/update/category/${id}`, category);
    }

  // Delete category
   public deleteCategory(id: number): Observable<void> {
  return this.http.delete<void>(`${BASIC_URL}/delete/category/${id}`);
}
}
