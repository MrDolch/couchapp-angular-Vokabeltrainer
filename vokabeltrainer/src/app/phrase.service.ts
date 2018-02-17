import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { CouchdbViewEntryComponent } from 'couchdb-connector/dist/index';
import { VokabeltrainerCouchdbService } from './vokabeltrainer-couchdb.service';
import { Phrase } from './entities';

@Injectable()
export class PhraseService extends VokabeltrainerCouchdbService<Phrase> {

  constructor(protected http2: Http) {
    super(http2, 'phrases');
  }

  searchByLanguage(language: string, term: string): Observable<Phrase[]> {
    let termLowerCase = term.toLowerCase();
    return this.http2.get(this.getViewUrl([language]))
      .map(res => (res.json().rows as CouchdbViewEntryComponent[])
        .map(r => r.value as Phrase)
        .filter(t => t && t.text && t.text.toLowerCase().indexOf(termLowerCase) !== -1));
  }
}
