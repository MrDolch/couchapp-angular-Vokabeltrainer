import { Injectable }     from '@angular/core';
import { Http }           from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { VokabeltrainerCouchdbService, CouchdbViewEntry } from './vokabeltrainer-couchdb.service';
import { Phrase } from './entities';

@Injectable()
export class PhraseService
  extends VokabeltrainerCouchdbService<Phrase> {

  constructor(protected http2: Http) {
    super(http2, "phrases");
  }

  search(language:string, term:string): Observable<Phrase[]> {
    let termLowerCase = term.toLowerCase();
    return this.http2.get(this.getViewUrl(language))
      .map(res => (res.json().rows as CouchdbViewEntry[])
           .map(r => r.value as Phrase) 
           .filter(t => t.text.toLowerCase().indexOf(termLowerCase) !== -1) );
  }
}
