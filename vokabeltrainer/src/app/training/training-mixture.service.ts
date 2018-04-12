import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { VokabeltrainerCouchdbService } from '../model/vokabeltrainer-couchdb.service';
import { TrainingMixture } from '../model/entities';

@Injectable()
export class TrainingMixtureService extends VokabeltrainerCouchdbService<TrainingMixture> {

  constructor(http: Http) {
    super(http, 'training-mixtures');
  }

}
