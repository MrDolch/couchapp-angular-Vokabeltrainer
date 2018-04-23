import { CouchdbDocComponent } from 'couchdb-connector/dist/index';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { VokabeltrainerCouchdbService } from '../model/vokabeltrainer-couchdb.service';
import { TrainingSet, Phrase } from '../model/entities';

@Injectable()
export class EventService extends VokabeltrainerCouchdbService<Event> {
  private getTimestamp(): number {
    return new Date().getTime();
  }

  constructor(http: Http) {
    super(http, 'events');
  }

  private createEvent(operation: Operation, parameters: object): Promise<Event> {
    return this.create(new Event(this.getTimestamp(), operation, parameters));
  }
  public addLanguage(code: string): Promise<Event> {
    return this.createEvent(Operation.addLanguage, { code });
  }
  public deleteLanguage(code: string): Promise<Event> {
    return this.createEvent(Operation.deleteLanguage, { code });
  }
  public setLanguageEspeakVoice(code: string, espeakVoice: string): Promise<Event> {
    return this.createEvent(Operation.setLanguageEspeakVoice, { code, espeakVoice });
  }

  public addPhrase(language: string, text: string): Promise<Event> {
    return this.createEvent(Operation.addPhrase, { language, text });
  }
  public deletePhrase(language: string, text: string): Promise<Event> {
    return this.createEvent(Operation.deletePhrase, { language, text });
  }

  public addTranslation(language1: string, phrase1: string, language2: string, phrase2: string): Promise<Event> {
    return this.createEvent(Operation.addTranslation, { language1, phrase1, language2, phrase2 });
  }
  public deleteTranslation(language1: string, phrase1: string, language2: string, phrase2: string): Promise<Event> {
    return this.createEvent(Operation.deleteTranslation, { language1, phrase1, language2, phrase2 });
  }

  public addTrainingSet(language: string, name: string): Promise<Event> {
    return this.createEvent(Operation.addTrainingSet, { language, name });
  }
  public deleteTrainingSet(language: string, name: string): Promise<Event> {
    return this.createEvent(Operation.deleteTrainingSet, { language, name });
  }

  public addTrainingQuestion(trainingSet: TrainingSet, phrase: Phrase): Promise<Event> {
    return this.createEvent(Operation.addTrainingQuestion, {
      language: trainingSet.language, trainingSet: trainingSet.name, phrase: phrase.text
    });
  }
  public answerTrainingPhrase(
    language: string, trainingSet: string, phrase: string,
    answerLanguage: string, answerPhrase: string
  ): Promise<Event> {
    return this.createEvent(Operation.answerTrainingPhrase, { language, trainingSet, phrase, answerLanguage, answerPhrase });
  }

}

export enum Operation {
  addLanguage = 'addLanguage',
  deleteLanguage = 'deleteLanguage',
  setLanguageEspeakVoice = 'setLanguageEspeakVoice',

  addPhrase = 'addPhrase',
  deletePhrase = 'deletePhrase',

  addTranslation = 'addTranslation',
  deleteTranslation = 'deleteTranslation',

  addTrainingSet = 'addTrainingSet',
  deleteTrainingSet = 'deleteTrainingSet',

  addTrainingQuestion = 'addTrainingQuestion',
  answerTrainingPhrase = 'answerTrainingPhrase',

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
