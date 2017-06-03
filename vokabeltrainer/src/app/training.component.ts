import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Language, TrainingMixture } from './entities';
import { LanguageService } from './language.service';
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
    private trainingMixtureService: TrainingMixtureService,
  ) { }

  selectedLanguage: Language;
  languages: Language[];
  
  selectedMixture: TrainingMixture;
  mixtures: TrainingMixture[];

  ngOnInit(): void {
    this.getLanguages();
  }

  getLanguages(): void {
    this.languageService
      .getLanguages()
      .then(languages => this.languages = languages);
  }

  getMixtures(): void {
    this.trainingMixtureService
      .getTrainingMixtures(this.selectedLanguage.code)
      .then(x => this.mixtures = x);
  }

  onSelectLanguage(language: Language): void {
    this.selectedLanguage = language;
    this.getMixtures();
  }
  onSelectMixture(mixture: TrainingMixture): void {
    this.selectedMixture = mixture;
  }

  addTrainingMixture(name:string):void {
    name = name.trim();
    if (!name) { return; }
    this.trainingMixtureService
      .createTrainingMixture(name, this.selectedLanguage.code)
      .then(mixture => {
        this.mixtures.push(mixture);
        this.selectedMixture = null;
      });
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

