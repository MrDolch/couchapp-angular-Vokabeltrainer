import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { VokabeltrainerCouchdbService, VokabeltrainerCouchdbEventsourceService } from '../model/vokabeltrainer-couchdb.service';
import { TrainingSet } from '../model/entities';

@Injectable()
export class TrainingSetService extends VokabeltrainerCouchdbEventsourceService<TrainingSet> {

  constructor(http: Http) {
    super(http, 'TrainingSet');
  }

}
