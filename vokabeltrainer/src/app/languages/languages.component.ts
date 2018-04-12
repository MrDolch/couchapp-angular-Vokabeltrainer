import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Language } from '../model/entities';
import { LanguageService } from './language.service';
import { EventService } from '../events/event.service';

@Component({
  selector: 'languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent {

  constructor(
    private languageService: LanguageService,
    private eventService: EventService,
  ) { }

  addLanguage(code: string): void {
    code = code.trim();
    if (!code) { return; }
    this.eventService.addLanguage(code)
      .then(() => this.languageService.loadLanguages())
      .then(() => this.languageService.setSelectedLanguage(code));
  }

  deleteLanguage(code: string): void {
    this.eventService.deleteLanguage(code)
      .then(() => this.languageService.loadLanguages())
      .then(() => this.languageService.setSelectedLanguage(null));
  }
}

