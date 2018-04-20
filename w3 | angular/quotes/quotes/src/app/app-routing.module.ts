import { HomeComponent } from './home/home.component';
import { EditComponent } from './edit/edit.component';
import { NewComponent } from './new/new.component';
import { QuotesComponent } from './quotes/quotes.component';
import { WriteComponent } from './write/write.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'home',component: HomeComponent },
  { path: 'new',component: NewComponent },
  // { path: 'edit',component: EditComponent },
  // use a colon and parameter name to include a parameter in the url
  { path: 'edit/:id', component: EditComponent },
  { path: 'quotes/:id', component: QuotesComponent },
  { path: 'write/:id', component: WriteComponent },
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: '**', pathMatch: 'full', redirectTo: '/home' },
  // { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
