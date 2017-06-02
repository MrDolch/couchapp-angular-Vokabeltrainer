import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhrasesComponent }     from './phrases.component';
import { LanguagesComponent }   from './languages.component';

const routes: Routes = [
  { path: '', redirectTo: '/phrases', pathMatch: 'full' },
  { path: 'phrases',     component: PhrasesComponent },
  { path: 'languages',   component: LanguagesComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes ,{ useHash: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
