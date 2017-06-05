import { Component, OnInit } from '@angular/core';
import { Language } from './entities';
import { LanguageService } from './language.service';

@Component({
  selector: 'vokabeltrainer',
  template: `
    <div class="container">
      <div class="row">
        <div class="col-xs-3">
          <h1> {{ title }} </h1>
        </div>
        <vokabel-language
          *ngFor="let language of languageService.languages"
          [selected]="language === languageService.selectedLanguage"
          (click)="languageService.setSelectedLanguage(language)"
          [language]="language"></vokabel-language>
        <div class="col-xs-12">
          <nav style="text-align:right;">
            <a routerLink="/training" routerLinkActive="active">Training Set-ups</a>
            <a routerLink="/phrases" routerLinkActive="active">Phrases</a>
            <a routerLink="/languages" routerLinkActive="active">Languages</a>
          </nav>
        </div>
        <div class="col-xs-12">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{

  title = 'Vokabeltrainer';
 
  constructor(
    private languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.languageService.loadLanguages();
  }
}
