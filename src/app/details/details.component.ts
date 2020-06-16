import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  brewdetails: any;

  constructor(private activatedRoute: ActivatedRoute, private _http: HttpService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this._http.getSpecefikBeer(params.id).subscribe( data => {
        this.brewdetails = data;
      });
    });
  }
}
