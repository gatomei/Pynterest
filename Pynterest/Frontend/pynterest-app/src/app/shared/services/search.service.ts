import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpClient: HttpClient) { }

  getSuggestion()
  {
    return this.httpClient.get<string[]>(environment.searchAPI+"");
  }

  getSearchPhotos(query: string)
  {
    return this.httpClient.get<number[]>(environment.searchAPI+"");
  }
}
