import { CouchdbDocComponent } from 'couchdb-connector/dist/index';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { VokabeltrainerCouchdbService } from '../model/vokabeltrainer-couchdb.service';

@Injectable()
export class EventService extends VokabeltrainerCouchdbService<Event> {
  private getTimestamp(): number {
    return new Date().getTime();
  }

  constructor(http: Http) {
    super(http, 'events');
  }
  public addLanguage(code: string): Promise<Event> {
    return this.create(new Event(this.getTimestamp(), Operation.addLanguage, { code: code }));
  }
  public deleteLanguage(code: string): Promise<Event> {
    return this.create(new Event(this.getTimestamp(), Operation.deleteLanguage, { code: code }));
  }
  public setLanguageEspeakVoice(code: string, espeakVoice: string): Promise<Event> {
    return this.create(new Event(this.getTimestamp(), Operation.setLanguageEspeakVoice, { code: code, espeakVoice: espeakVoice }));
  }
}

export enum Operation {
  // thesauerus: operation
  // type art kind class category name sort
  // action source intend act activity plot
  addLanguage = 'addLanguage',
  deleteLanguage = 'deleteLanguage',
  setLanguageEspeakVoice = 'setLanguageEspeakVoice'
};

export class Event extends CouchdbDocComponent {
  constructor(
    private timestamp: number,
    private operation: Operation,
    private parameters: object) {
    super();
  }
  public getOperation(): Operation {
    return this.operation;
  }
}
