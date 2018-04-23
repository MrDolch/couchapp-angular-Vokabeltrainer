import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Phrase, TrainingSet, Question } from '../model/entities';
import { LanguageService } from '../languages/language.service';
import { PhraseService } from '../phrases/phrase.service';
import { TrainingSetService } from './training-set.service';
import { EventService } from '../events/event.service';

@Component({
  selector: 'training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  selectedTrainingSet: TrainingSet;
  trainingSets: TrainingSet[];

  constructor(
    private languageService: LanguageService,
    private phraseService: PhraseService,
    private trainingSetService: TrainingSetService,
    private eventService: EventService,
  ) { }


  ngOnInit(): void {
    this.languageService.selectedLanguageUpdate.subscribe(() => this.getTrainingSets());
    if (this.languageService.selectedLanguage) {
      this.getTrainingSets();
    }
  }


  getTrainingSets(): void {
    this.trainingSetService
      .getAllByLanguage(this.languageService.selectedLanguage.code)
      .then(x => this.trainingSets = x);
  }

  onSelectTrainingSet(trainingSet: TrainingSet): void {
    this.selectedTrainingSet = trainingSet;
  }

  addTrainingSet(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.eventService.addTrainingSet(this.languageService.selectedLanguage.code, name);
  }
  deleteTrainingSet(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.eventService.deleteTrainingSet(this.languageService.selectedLanguage.code, name);
  }

  addQuestion(phrase: Phrase): void {
    this.eventService.addTrainingQuestion(this.selectedTrainingSet, phrase);
  }
  addNewQuestion(): void {

  }
  getQuestions(): Phrase[] {
    const result: Phrase[] = [];
    const object = this.selectedTrainingSet.phrases;
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        result.push(object[key]);
      }
    }
    return result;
  }
}

