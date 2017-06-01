import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhrasesComponent }      from './phrases.component';

const routes: Routes = [
  { path: '', redirectTo: '/phrases', pathMatch: 'full' },
  { path: 'phrases',     component: PhrasesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes ,{ useHash: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
