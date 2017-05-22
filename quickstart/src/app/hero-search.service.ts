import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import { Hero }           from './hero';
import { CouchListEntry, CouchDoc } from './couchdb';

@Injectable()
export class HeroSearchService {

  constructor(private http: Http) {}

  search(term: string): Observable<Hero[]> {
    return this.http
               .get("/heroes/_all_docs?include_docs=true")
               .map(response => (response.json().rows as CouchListEntry[])
                    .map(r => r.doc as Hero) 
                    .filter(hero => hero.name.indexOf(term) !== -1) );
  }
}
