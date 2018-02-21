import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Language } from './entities';
import { LanguageService } from './language.service';

@Component({
  selector: 'vokabel-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent {

  constructor(
    private router: Router,
    private languageService: LanguageService,
  ) { }

  addLanguage(code: string): void {
    code = code.trim();
    if (!code) { return; }
    this.languageService.create(new Language(code))
      .then(l => {
        this.languageService.loadLanguages();
        this.languageService.setSelectedLanguage(l);
      });
  }
}

