import { Injectable }     from '@angular/core';
import { Http }           from '@angular/http';
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

  getPhrases(): Promise<Phrase[]> {
    return this.http2
      .get(`/vokabeltrainer/_design/couchapp/_view/phrases`)
      .toPromise()
      .then(res => (res.json().rows as CouchdbViewEntry[]).map(r => r.value ) as Phrase[])
      .catch(this.handleError2);
  }
  private handleError2(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  getPhrase(id: string): Promise<Phrase> {        return super.get(id);         }
  update(phrase: Phrase): Promise<Phrase> {       return super.update(phrase);  }
  delete(id: string, rev:string): Promise<void> { return super.delete(id, rev); }
  createPhrase(text: string): Promise<Phrase> {
    let phrase = new Phrase();
    phrase.text = text;
    return super.create(phrase);
  }
}
