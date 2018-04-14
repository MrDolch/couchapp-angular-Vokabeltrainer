import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { CouchdbViewEntryComponent } from 'couchdb-connector/dist/index';
import { VokabeltrainerCouchdbService, VokabeltrainerCouchdbEventsourceService } from '../model/vokabeltrainer-couchdb.service';
import { Phrase } from '../model/entities';

@Injectable()
export class PhraseService extends VokabeltrainerCouchdbEventsourceService<Phrase> {
  public selectedPhrase: Phrase;
  public phrases: Phrase[];

  constructor(protected http: Http) {
    super(http, 'Phrase');
  }

  loadPhrases(language: string): Promise<Phrase[]> {
    return this.getAllByLanguage(language).then(ps => this.phrases = ps);
  }

  setSelectedPhrase(text: string) {
    this.selectedPhrase = null;
    for (const phrase of this.phrases) {
      if (phrase.text === text) {
        this.selectedPhrase = phrase;
      }
    }
  }

  searchByLanguage(language: string, term: string): Promise<Phrase[]> {
    let termLowerCase = term.toLowerCase();
    return this.getAllByLanguage(language)
      .then(ps => ps.filter(t => t && t.text && t.text.toLowerCase().indexOf(termLowerCase) !== -1));
  }
}
