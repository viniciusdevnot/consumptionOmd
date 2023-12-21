import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  apiKey!: string;
  url!: string;

  constructor(private http: HttpClient) {
    this.apiKey = '613ad2e1'
    this.url = 'http://www.omdbapi.com/?apikey=';
  }

  buscarFilme(name: string): Observable<any>{
    return this.http.get<any>(`${this.url}${this.apiKey}&s=${name}`)
  }
}
