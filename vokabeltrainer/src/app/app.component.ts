import { Component } from '@angular/core';

@Component({
  selector: 'vokabeltrainer',
  template: `
    <h1 style="float:left;"> {{ title }} </h1>
    <nav style="text-align:right;">
      <a style="xxfloat:right;" routerLink="/phrases" routerLinkActive="active">Phrases</a>
      <a style="xxfloat:right;" routerLink="/languages" routerLinkActive="active">Languages</a>
    </nav>
    <hr style="clear:both;">
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Vokabeltrainer';
}
