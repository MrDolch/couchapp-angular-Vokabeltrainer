import { Injectable }     from '@angular/core';
import { Http }           from '@angular/http';

import { VokabeltrainerCouchdbService } from './vokabeltrainer-couchdb.service';
import { Language } from './entities';

@Injectable()
export class LanguageService
  extends VokabeltrainerCouchdbService<Language> {

  constructor(http: Http) {
    super(http, "languages");
  }

}
