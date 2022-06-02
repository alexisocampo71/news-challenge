import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { NewsDetailComponent } from './components/news-detail/news-detail.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'detail/:title', component: NewsDetailComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
