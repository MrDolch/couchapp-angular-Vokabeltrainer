import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { VokabeltrainerCouchdbService } from './model/vokabeltrainer-couchdb.service';
import { EspeakSample } from './model/entities';

@Injectable()
export class EspeakSampleService extends VokabeltrainerCouchdbService<EspeakSample> {

  constructor(http: Http) {
    super(http, 'espeak-samples');
  }

}
