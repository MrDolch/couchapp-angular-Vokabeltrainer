import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LanguagesComponent } from './languages.component';
import { PhrasesComponent } from './phrases.component';
import { TrainingComponent } from './training.component';

const routes: Routes = [
  { path: '', redirectTo: '/phrases', pathMatch: 'full' },
  { path: 'languages', component: LanguagesComponent },
  { path: 'phrases', component: PhrasesComponent },
  { path: 'training', component: TrainingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class WorkbenchModule { }
