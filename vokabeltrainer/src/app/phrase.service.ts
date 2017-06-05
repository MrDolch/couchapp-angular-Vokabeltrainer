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

  getViewUrl(keys:string[]){
    console.log("PhraseService Keys: "+JSON.stringify(keys));
    let url = `/${this.dbName}/_design/couchapp/_view/${this.viewName}`;
    if(keys.length==1 && keys[0].trim())
      url += `?group=true&startkey=["${keys[0]}"]&endkey=["${keys[0]}",{}]`;
    else if(keys.length>1)
      url += `?key="${JSON.stringify(keys)}"`;
    console.log(url);
    return url;
  }

  search(language:string, term:string): Observable<Phrase[]> {
    let termLowerCase = term.toLowerCase();
    return this.http2.get(this.getViewUrl([language]))
      .map(res => (res.json().rows as CouchdbViewEntry[])
           .map(r => r.value as Phrase) 
           .filter(t => t.text.toLowerCase().indexOf(termLowerCase) !== -1) );
  }
}
