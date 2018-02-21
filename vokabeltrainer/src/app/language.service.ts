import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { VokabeltrainerCouchdbService } from './vokabeltrainer-couchdb.service';
import { Language } from './entities';

@Injectable()
export class LanguageService extends VokabeltrainerCouchdbService<Language> {

  public selectedLanguage: Language;
  public languages: Language[];

  public selectedLanguageUpdate: Observable<Language>;
  public selectedLanguageObserver: Observer<Language>;

  public languagesUpdate: Observable<Language[]>;
  public languagesObserver: Observer<Language[]>;

  constructor(http: Http) {
    super(http, 'languages');
    this.selectedLanguageUpdate = Observable.create((x: Observer<Language>) => this.selectedLanguageObserver = x);
    this.languagesUpdate = Observable.create((x: Observer<Language[]>) => this.languagesObserver = x);
  }

  loadLanguages(): void {
    this.getAllFor().then(ls => {
      this.languages = ls;
      if (this.languagesObserver) {
        this.languagesObserver.next(this.languages);
      }
    });
  }

  setSelectedLanguage(language: Language) {
    this.selectedLanguage = language;
    if (this.selectedLanguageObserver) {
      this.selectedLanguageObserver.next(language);
    }
  }

  deleteLanguage(language: Language): void {
    this.delete(language._id, language._rev)
      .then(() => {
        this.loadLanguages();
        this.setSelectedLanguage(null);
      });
  }

}
