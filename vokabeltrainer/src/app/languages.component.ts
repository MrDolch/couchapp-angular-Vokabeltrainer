import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Language } from './entities';
import { LanguageService } from './language.service';

@Component({
  selector: 'vokabel-languages',
  templateUrl: './languages.component.html',
  styleUrls: [ './languages.component.css' ]
})
export class LanguagesComponent implements OnInit {

  constructor(
    private router: Router,
    private languageService: LanguageService,
  ) { }

  selectedLanguage: Language;
  languages: Language[];

  onSelectLanguage(language: Language): void {
    this.selectedLanguage = language;
  }

  getLanguages(): void {
    this.languageService.getAllFor()
      .then(l => this.languages = l);
  }

  ngOnInit(): void {
    this.getLanguages();
  }

  addLanguage(code: string): void {
    code = code.trim();
    if (!code) { return; }
    this.languageService.create(new Language(code))
      .then(language => {
        this.languages.push(language);
        this.selectedLanguage = null;
      });
  }

  delete(language:Language): void {
    this.languageService
        .delete(language._id, language._rev)
        .then(() => {
          this.languages = this.languages.filter(h => h !== language);
          if (this.selectedLanguage === language) {
            this.selectedLanguage = null;
          }
        });
  }
}

