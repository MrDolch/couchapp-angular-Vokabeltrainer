import { Http, Response } from '@angular/http';

import { CouchdbService, CouchdbDocComponent, CouchdbViewEntryComponent } from 'couchdb-connector/dist/index';

export abstract class VokabeltrainerCouchdbService<T extends CouchdbDocComponent> extends CouchdbService<T> {

  constructor(
    protected http: Http,
    protected viewName: string) {
    super(http, 'vokabeltrainer', viewName);
  }
}

export abstract class VokabeltrainerCouchdbEventsourceService<T extends CouchdbDocComponent> extends CouchdbService<T> {

  constructor(
    protected http: Http,
    protected viewName: string) {
    super(http, 'vokabeltrainer', viewName);
  }

  getAll(): Promise<T[]> {
    return this.http
      .get(`/${this.dbName}/_design/eventsource/_view/objects?group=true`
        + `&startkey=[%22${this.viewName}%22,%22%22]`
        + `&endkey=[%22${this.viewName}%22,{}]`)
      .toPromise()
      .then((res: Response) => (res.json().rows as CouchdbViewEntryComponent[]).map(r => r.value) as T[])
      .catch(this.handleError);
  }

  getAllByLanguage(secondkey: string): Promise<T[]> {
    return this.http
      .get(`/${this.dbName}/_design/eventsource/_view/objects?group=true`
        + `&startkey=[%22${this.viewName}%22,%22${secondkey}%22,%22%22]`
        + `&endkey=[%22${this.viewName}%22,%22${secondkey}%22,{}]`)
      .toPromise()
      .then((res: Response) => (res.json().rows as CouchdbViewEntryComponent[]).map(r => r.value) as T[])
      .catch(this.handleError);
  }
}
