import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { FrontPageComponent} from './front-page/front-page.component';
import { SearchComponent } from './search/search.component';


const routes: Routes = [
  { path: '', component: FrontPageComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'search', component: SearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
