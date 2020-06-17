import { Component, OnInit} from '@angular/core';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {
  brews: any;
  searchText: string;


  constructor(private _http: HttpService) {
  }

  removeItems(name: string){
    if (name){
      this._http.getSpecefikBeerSearch(name).subscribe( data => {
        this.brews = data;
      });
    }
  }

  clearSelection(): void {
    window.location.reload();
  }

  ngOnInit(): void {
      this._http.getBeer().subscribe(data => {
          this.brews = data;
        }
      );
  }
}
