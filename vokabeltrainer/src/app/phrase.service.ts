import { Injectable }     from '@angular/core';
import { Http }           from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { CouchdbService, CouchdbDoc } from 'couchdb-connector';

import { Phrase } from './entities';


class CouchdbViewEntry {
  value: CouchdbDoc;
}

@Injectable()
export class PhraseService extends CouchdbService<Phrase> {

  constructor(private http2: Http) {
    super(http2, "vokabeltrainer");
  }

  // TODO: nach Couchdb-Connector
  getPhrases(language:string): Promise<Phrase[]> {
    return this.http2
      .get(`/vokabeltrainer/_design/couchapp/_view/phrases?key="${language}"`)
      .toPromise()
      .then(res => (res.json().rows as CouchdbViewEntry[]).map(r => r.value ) as Phrase[])
      .catch(this.handleError2);
  }
  private handleError2(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  search(language:string, term:string): Observable<Phrase[]> {
    let termLowerCase = term.toLowerCase();
    return this.http2
      .get(`/vokabeltrainer/_design/couchapp/_view/phrases?key="${language}"`)
      .map(res => (res.json().rows as CouchdbViewEntry[])
           .map(r => r.value as Phrase) 
           .filter(t => t.text.toLowerCase().indexOf(termLowerCase) !== -1) );
  }

  createPhrase(text:string, language:string): Promise<Phrase> {
    let phrase = new Phrase();
    phrase.text = text;
    phrase.language = language;
    return super.create(phrase);
  }
}
