import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { ReadCategoryModel } from '../models/readCategoryModel';
import { WriteCategoryModel } from '../models/writeCategoryModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) {

  }

  getCategories() {
    const getCategoriesEndpoint = `${environment.baseAPIAuth}/categories`;
    return this.httpClient.get<ReadCategoryModel[]>(getCategoriesEndpoint);
  }

  addCategory(category: WriteCategoryModel) {
    const addCategoryEndpoint = `${environment.baseAPIAuth}/categories`;
    return this.httpClient.post(addCategoryEndpoint, category);
  }

  getPhotosForCategory(categoryId: Number)
  {
    const getCategoriesEndpoint = `${environment.baseAPIAuth}/categories/${categoryId}/photos`;
    return this.httpClient.get<Number[]>(getCategoriesEndpoint);
  }

}
