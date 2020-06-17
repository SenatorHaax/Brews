import { Component, OnInit} from '@angular/core';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {
  unfilteredbrews: any;
  brews: any;
  searchText: string;


  constructor(private _http: HttpService) {
    this._http.getBeer().subscribe(data => {
        this.unfilteredbrews = data;
        console.log(this.unfilteredbrews);
        //filter here
        this.searchText = '';
        this.brews = this.removeItems(this.unfilteredbrews, this.searchText);
      }
    );
  }

  removeItems(items: any, name: string){
    for (let i = 0; i < items.length; i++) {
      if (!items[i].name.toLowerCase().includes(name.toLowerCase())) {
        items.splice(i--, 1);
      }
    }
    return items;
  }
  clearSelection(): void {
    window.location.reload();
  }

  ngOnInit(): void {
  }

}
