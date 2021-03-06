import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getBeer() {
    return this.http.get('https://api.openbrewerydb.org/breweries');
  }
  getLimitBeer(amount) {
    return this.http.get('https://api.openbrewerydb.org/breweries?per_page=' + amount);
  }
  getSpecefikBeer(id) {
    if (id) {
      return this.http.get('https://api.openbrewerydb.org/breweries/' + id);
    }
  }

}
