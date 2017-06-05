import { Headers, Http } from '@angular/http';

import { CouchdbService, CouchdbDoc } from 'couchdb-connector';

// TODO: nach Couchdb-Connector
export class CouchdbViewEntry {
  value: CouchdbDoc;
}

// TODO: nach Couchdb-Connector
export abstract class VokabeltrainerCouchdbService<T extends CouchdbDoc> extends CouchdbService<T> {

  constructor(
    protected http2: Http,
    protected viewName: string,
    protected dbName = "vokabeltrainer") {
    super(http2, dbName);
  }
  
  getViewUrl(keys:string[]){
    console.log("RestParameter: "+JSON.stringify(keys) + keys.length);
    let url = `/${this.dbName}/_design/couchapp/_view/${this.viewName}`;
    if(keys.length==1 && keys[0].trim()) url += `?key="${keys[0]}"`;
    else if(keys.length>1) url += `?key="${JSON.stringify(keys)}"`;
    console.log(url);
    return url;
  }
  
  getAllFor(...keys:string[]): Promise<T[]> {
    return this.http2.get(this.getViewUrl(keys)).toPromise()
      .then(res => (res.json().rows as CouchdbViewEntry[])
        .map(r => r.value ) as T[])
      .catch(this.handleErrorFor);
  }
  

  update(doc: T): Promise<T> {
    return this.http2
      .put(`/${this.dbName}/${doc._id}`
        , JSON.stringify(doc)
        , {headers: new Headers({'Content-Type': 'application/json'})}
      )
      .toPromise()
      .then(x => {   // BUGFIX: nach Couchdb-Connector
        let r = x.json();
        doc._id = r.id;
        doc._rev = r.rev;
        return doc;
      })
      .catch(this.handleErrorFor);
  }

  protected handleErrorFor(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
