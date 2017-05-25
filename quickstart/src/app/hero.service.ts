import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Hero } from './hero';
import { CouchListEntry, CouchDoc } from './couchdb';

@Injectable()
export class HeroService {

  private heroesUrl = '/heroes'; 
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl+"/_all_docs?include_docs=true")
               .toPromise()
               .then(response => (response.json().rows as CouchListEntry[])
                    .map(r => r.doc ) as Hero[])
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getHero(id: string): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Hero)
      .catch(this.handleError);
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero._id}`;
    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  create(name: string): Promise<Hero> {
    return this.http
      .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => {
         let hero = new Hero();
	     let r = res.json();
	     hero._id  = r.id;
	     hero._rev = r.rev;
	     hero.name = name;
	     return hero;
	  })
      .catch(this.handleError);
  }

  delete(id: string, rev:string): Promise<void> {
    const url = `${this.heroesUrl}/${id}?rev=${rev}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
}
