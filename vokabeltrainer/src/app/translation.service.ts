import { Injectable }     from '@angular/core';
import { Http }           from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { CouchdbService, CouchdbDoc } from 'couchdb-connector';

import { Translation, Phrase } from './entities';


class CouchdbViewEntry {
  value: CouchdbDoc;
}

@Injectable()
export class TranslationService extends CouchdbService<Translation> {

  constructor(private http2: Http) {
    super(http2, "vokabeltrainer");
  }

  // TODO: nach Couchdb-Connector
  getTranslations(phraseId:string): Promise<Translation[]> {
    return this.http2
      .get(`/vokabeltrainer/_design/couchapp/_view/translations?key="${phraseId}"`)
      .toPromise()
      .then(res => (res.json().rows as CouchdbViewEntry[]).map(r => r.value ) as Translation[])
      .catch(this.handleError2);
  }
  private handleError2(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  createTranslation(phrase1:Phrase, phrase2:Phrase): Promise<Translation> {
    let translation = new Translation();
    translation.phraseId = phrase1._id;
    translation.language = phrase1.language;
    translation.secondPhraseId = phrase2._id;
    translation.secondLanguage = phrase2.language;
    return super.create(translation);
  }
}
