// modules
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomepageComponent} from './components/homepage/homepage.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {UploadListComponent} from './components/upload-list/upload-list.component';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
  {path: '', component: HomepageComponent, canActivate: []},
  {path: 'uploads', component: UploadListComponent, canActivate: [AuthGuard]},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
