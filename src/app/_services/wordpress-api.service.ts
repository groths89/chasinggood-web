import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface EmbeddedData {
  // Define properties based on the structure of your embedded data
  "wp:featuredmedia": [
    {
      source_url: string
    }
  ];
}
export interface Winner {
  id: number;
  title: {
    rendered: string
  };
  content: {
    rendered: string
  };
  _embedded: EmbeddedData;
  acf: {
    chasinggood_winner_headline: string,
    chasinggood_winner_name: string,
    chasinggood_winner_place: string,
    chasinggood_winner_year: number,
    chasinggood_winner_location: string
  }
}
@Injectable({
  providedIn: 'root'
})
export class WordpressApiService {
  private backendUrl = 'https://wp.chasinggood.org';
  private endpoint = '';

  constructor(private http: HttpClient) { }

  getSingleWinner(id: number){
    this.endpoint = `${this.backendUrl}/wp-json/wp/v2/winners/${id}`;
    return this.http.get(this.endpoint);
  }

  getWinners(): Observable<any> {
    this.endpoint = `${this.backendUrl}/wp-json/wp/v2/winners`;
    return this.http.get(this.endpoint);
  }

  getWinnersByYear(year: number): Observable<Winner[]> {
    this.endpoint = `${this.backendUrl}/wp-json/wp/v2/winners`;
    return this.http.get<Winner[]>(`${this.endpoint}?_embed&?chasinggood_winner_year=${year}`);
  }

  getPosts(){
    this.endpoint = `${this.backendUrl}/wp-json/wp/v2/posts`;
    return this.http.get(this.endpoint);
  }

  getSinglePost(id: number){
    this.endpoint = `${this.backendUrl}/wp-json/wp/v2/posts/${id}`;
    return this.http.get(this.endpoint);
  }

  getSinglePage(id: number) {
    this.endpoint = `${this.backendUrl}/wp-json/wp/v2/pages/${id}`;
    return this.http.get(this.endpoint);
  }
}
