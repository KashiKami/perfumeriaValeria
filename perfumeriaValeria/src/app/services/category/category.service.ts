import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl = 'http://localhost/api/category/';

  constructor(private http: HttpClient) { }

  public getCategories() {
    return this.http.get(`${this.baseUrl}getAll.php`);
  }

  public getCategoriesTwo() {
    return this.http.get(`${this.baseUrl}getAllCategory.php`);
  }

  public getSubCategories(id: any) {
    return this.http.get(`${this.baseUrl}getAllSubCategory.php?id=`+id);
  }

  public getSubCategoriesMenuLeft() {
    return this.http.get(`${this.baseUrl}getAllCategories.php`);
  }

  public addCategory(category: any) {
    return this.http.post(`${this.baseUrl}create.php`, JSON.stringify(category));
  }


  public deleteCategory(id: any) {
    return this.http.post(`${this.baseUrl}delete.php`, JSON.stringify(id)).subscribe();
  }
}
