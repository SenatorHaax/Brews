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
  errorMsg: string;
  brews: any;

  constructor(
    private http: HttpClient,
    // tslint:disable-next-line:variable-name
    private _http: HttpService
  ) {
  }

  ngOnInit() {
    this._http.getBeer().subscribe(data => {
        this.brews = data;
      }
    );
    this.searchBrewCtrl.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.errorMsg = '';
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
        if (data == undefined) {
          this.errorMsg = 'welp';
          this.filteredBrews = [];
        } else {
          this.errorMsg = '';
          this.filteredBrews = data;
        }

        this.brews = this.filteredBrews;
      });
  }


  // brews: any;
  // searchText: string;
  //
  //
  // constructor(private _http: HttpService) {
  // }
  //
  // removeItems(name: string){
  //   if (name){
  //     this._http.getSpecefikBeerSearch(name).subscribe( data => {
  //       this.brews = data;
  //     });
  //   }
  // }
  //
  // clearSelection(): void {
  //   window.location.reload();
  // }
  //
  // ngOnInit(): void {
  //     this._http.getBeer().subscribe(data => {
  //         this.brews = data;
  //       }
  //     );
  // }
}
