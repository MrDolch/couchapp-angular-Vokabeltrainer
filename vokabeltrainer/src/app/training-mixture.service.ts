import { Injectable }     from '@angular/core';
import { Http }           from '@angular/http';

import { VokabeltrainerCouchdbService } from './vokabeltrainer-couchdb.service';
import { TrainingMixture } from './entities';

@Injectable()
export class TrainingMixtureService
  extends VokabeltrainerCouchdbService<TrainingMixture> {

  constructor(http: Http) {
    super(http, "training-mixtures");
  }

}
