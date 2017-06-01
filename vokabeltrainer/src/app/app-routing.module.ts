import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhrasesComponent }      from './phrases.component';
import { PhraseDetailComponent }  from './phrase-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/phrases', pathMatch: 'full' },
  { path: 'detail/:id',  component: PhraseDetailComponent },
  { path: 'phrases',     component: PhrasesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes ,{ useHash: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
