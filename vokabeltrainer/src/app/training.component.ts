import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Language, Phrase, TrainingMixture, Question } from './entities';
import { LanguageService } from './language.service';
import { PhraseService } from './phrase.service';
import { TrainingMixtureService } from './training-mixture.service';

@Component({
  selector: 'vokabel-training',
  templateUrl: './training.component.html',
  styleUrls: [ './training.component.css' ]
})
export class TrainingComponent implements OnInit {

  constructor(
    private router: Router,
    private languageService: LanguageService,
    private phraseService: PhraseService,
    private trainingMixtureService: TrainingMixtureService,
  ) { }
  
  selectedMixture: TrainingMixture;
  mixtures: TrainingMixture[];

  ngOnInit(): void {
    this.languageService.selectedLanguageUpdate.subscribe(() => this.getMixtures());
    if(this.languageService.selectedLanguage) this.getMixtures();
  }


  getMixtures(): void {
    this.trainingMixtureService
      .getAllFor(this.languageService.selectedLanguage.code)
      .then(x => this.mixtures = x);
  }

  onSelectMixture(mixture: TrainingMixture): void {
    this.selectedMixture = mixture;
  }

  addTrainingMixture(name:string):void {
    name = name.trim();
    if (!name) { return; }
    this.trainingMixtureService
      .create(new TrainingMixture(name, this.languageService.selectedLanguage))
      .then(mixture => {
        this.mixtures.push(mixture);
        this.selectedMixture = mixture;
      });
  }
  addNewQuestion(text:string): void {
    this.phraseService.create(new Phrase(text, this.languageService.selectedLanguage))
      .then(phrase => {
        this.addQuestion(phrase);
      });
  }
  addQuestion(phrase:Phrase): void {
    this.selectedMixture.questions.push(new Question(phrase._id));
    this.trainingMixtureService.update(this.selectedMixture);
  }
  deleteQuestion(phraseId:string): void {
    this.selectedMixture.questions = this.selectedMixture.questions.filter(h => h.phraseId !== phraseId);
    this.trainingMixtureService.update(this.selectedMixture);
  }

  delete(mixture: TrainingMixture): void {
    this.trainingMixtureService
        .delete(mixture._id, mixture._rev)
        .then(() => {
          this.mixtures = this.mixtures.filter(h => h !== mixture);
          if (this.selectedMixture === mixture) {
            this.selectedMixture = null;
          }
        });
  }

}

