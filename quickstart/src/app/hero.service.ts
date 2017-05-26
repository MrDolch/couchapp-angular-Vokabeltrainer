import { Injectable }    from '@angular/core';
import { Http } from '@angular/http';

import { Hero } from './hero';
import { CouchService } from './couchdb';

@Injectable()
export class HeroService extends CouchService<Hero> {

  constructor(http: Http) {
    super(http, "heroes");
  }

  getHeroes(): Promise<Hero[]> {                  return super.getAll();        }
  getHero(id: string): Promise<Hero> {            return super.get(id);         }
  update(hero: Hero): Promise<Hero> {             return super.update(hero);    }
  delete(id: string, rev:string): Promise<void> { return super.delete(id, rev); }
  createHero(name: string): Promise<Hero> {
    let hero = new Hero();
    hero.name = name;
    return super.create(hero);
  }

}
