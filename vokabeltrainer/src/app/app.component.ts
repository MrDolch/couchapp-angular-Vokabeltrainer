import { Component } from '@angular/core';

@Component({
  selector: 'vokabeltrainer',
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a routerLink="/phrases" routerLinkActive="active">Phrases</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Vokabeltrainer';
}
