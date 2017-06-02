import { Injectable }     from '@angular/core';
import { Http }           from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { CouchdbService, CouchdbDoc } from 'couchdb-connector';

import { Language } from './entities';


class CouchdbViewEntry {
  value: CouchdbDoc;
}

@Injectable()
export class LanguageService extends CouchdbService<Language> {

  constructor(private http2: Http) {
    super(http2, "vokabeltrainer");
  }

  // TODO: nach Couchdb-Connector
  getLanguages(): Promise<Language[]> {
    return this.http2
      .get(`/vokabeltrainer/_design/couchapp/_view/languages`)
      .toPromise()
      .then(res => (res.json().rows as CouchdbViewEntry[]).map(r => r.value ) as Language[])
      .catch(this.handleError2);
  }
  private handleError2(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  createLanguage(languageCode:string): Promise<Language> {
    let language = new Language();
    language.code = languageCode;
    return super.create(language);
  }
}
