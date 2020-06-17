import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime, finalize, switchMap, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {

  searchBrewCtrl = new FormControl();
  filteredBrews: any;
  isLoading = false;
  brews: any;

  constructor(
    private http: HttpClient,
    private _http: HttpService
  ) { }

  ngOnInit() {
    this._http.getBeer().subscribe(json => {
        this.brews = json;
      }
    );
    this.searchBrewCtrl.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.filteredBrews = [];
          this.isLoading = true;
        }),
        switchMap(value => this.http.get('https://api.openbrewerydb.org/breweries/autocomplete?query=' + value)
          .pipe(
            finalize(() => {
              this.isLoading = false;
            }),
          )
        )
      )
      .subscribe(data => {
        console.log(data);
        if (data === []) {
          this._http.getBeer().subscribe(json => {
              this.filteredBrews = json;
            }
          );
        } else {
          this.filteredBrews = data;
        }
        if (this.filteredBrews.length === 0){
          this._http.getBeer().subscribe(json => {
              this.brews = json;
            }
          );
        }else{
          this.brews = this.filteredBrews;
        }
      });
  }
}
