import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { VokabeltrainerCouchdbEventsourceService } from '../model/vokabeltrainer-couchdb.service';
import { Language } from '../model/entities';

@Injectable()
export class LanguageService extends VokabeltrainerCouchdbEventsourceService<Language> {

  public selectedLanguage: Language;
  public languages: Language[];

  public selectedLanguageUpdate: Observable<Language>;
  public selectedLanguageObserver: Observer<Language>;

  public languagesUpdate: Observable<Language[]>;
  public languagesObserver: Observer<Language[]>;

  constructor(http: Http) {
    super(http, 'Language');
    this.selectedLanguageUpdate = Observable.create((x: Observer<Language>) => this.selectedLanguageObserver = x);
    this.languagesUpdate = Observable.create((x: Observer<Language[]>) => this.languagesObserver = x);
  }

  loadLanguages(): Promise<Language[]> {
    return this.getAll().then(ls => this.languages = ls);
  }

  setSelectedLanguage(code: string) {
    this.selectedLanguage = null;
    for (const language of this.languages) {
      if (language.code === code) {
        this.selectedLanguage = language;
      }
    }
  }
}
