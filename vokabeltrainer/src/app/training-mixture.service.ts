import { Injectable }     from '@angular/core';
import { Http }           from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { CouchdbService, CouchdbDoc } from 'couchdb-connector';

import { TrainingMixture } from './entities';


class CouchdbViewEntry {
  value: CouchdbDoc;
}

@Injectable()
export class TrainingMixtureService extends CouchdbService<TrainingMixture> {

  constructor(protected http2: Http) {
    super(http2, "vokabeltrainer");
  }

  // TODO: nach Couchdb-Connector
  getTrainingMixtures(language:string): Promise<TrainingMixture[]> {
    return this.http2
      .get(`/vokabeltrainer/_design/couchapp/_view/training-mixtures?key="${language}"`)
      .toPromise()
      .then(res => (res.json().rows as CouchdbViewEntry[])
        .map(r => r.value ) as TrainingMixture[])
      .catch(this.handleError2);
  }
  
  handleError2(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  createTrainingMixture(name:string, languageCode:string): Promise<TrainingMixture> {
    let mix = new TrainingMixture();
    mix.name = name;
    mix.language = languageCode;
    return super.create(mix);
  }
}
