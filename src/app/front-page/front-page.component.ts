import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent implements OnInit {
  brews: object;

  constructor(private _http: HttpService) {
    this._http.getLimitBeer(3).subscribe(data => {
        this.brews = data;
        console.log(this.brews);
      }
    );
  }

  ngOnInit(): void {
  }

}
