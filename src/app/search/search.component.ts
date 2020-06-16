import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  brews: object;

  constructor(private _http: HttpService) {
    this._http.getBeer().subscribe(data => {
        this.brews = data;
        console.log(this.brews);
      }
    );
  }

  ngOnInit(): void {
  }

}
