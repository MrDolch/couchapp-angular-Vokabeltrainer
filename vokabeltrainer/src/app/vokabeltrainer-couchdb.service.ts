import { Http } from '@angular/http';

import { CouchdbService, CouchdbDocComponent } from 'couchdb-connector/dist/index';

export abstract class VokabeltrainerCouchdbService<T extends CouchdbDocComponent> extends CouchdbService<T> {

  constructor(
    protected http: Http,
    protected viewName: string) {
    super(http, 'vokabeltrainer', viewName);
  }
}
