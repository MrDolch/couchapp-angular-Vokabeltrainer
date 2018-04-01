import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { VokabeltrainerCouchdbService } from '../vokabeltrainer-couchdb.service';
import { Translation } from '../entities';

@Injectable()
export class TranslationService extends VokabeltrainerCouchdbService<Translation> {

  constructor(http: Http) {
    super(http, 'translations');
  }

}
