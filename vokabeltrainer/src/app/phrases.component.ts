import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Phrase } from './entities';
import { PhraseService } from './phrase.service';
import { LanguageService } from './language.service';
import { TranslationService } from './translation.service';

@Component({
  selector: 'vokabel-phrases',
  templateUrl: './phrases.component.html',
  styleUrls: [ './phrases.component.css' ]
})
export class PhrasesComponent implements OnInit {

  constructor(
    private router: Router,
    private phraseService: PhraseService,
    private languageService: LanguageService,
    private translationService: TranslationService
  ) { }

  selectedPhrase: Phrase;
  phrases: Phrase[];
  translatedPhrases: Phrase[];
  
  selectedLanguage: string = "de";
  selectedSecondLanguage: string = "en";
  languages: string[];

  ngOnInit(): void {
    this.languages = ["de", "en", "fr"];
    this.getLanguages();
    this.getPhrases();
  }

  onSelectPhrase(phrase: Phrase): void {
    this.selectedPhrase = phrase;
    this.getTranslations();
  }

  onSelectLanguage(language: string): void {
    this.selectedLanguage = language;
    this.getPhrases();    
  }

  onSelectSecondLanguage(language: string): void {
    this.selectedSecondLanguage = language;
    this.getTranslations();
  }

  getLanguages(): void {
    this.languageService
      .getLanguages()
      .then(ls => this.languages = ls.map(l => l.code));
  }
  getPhrases(): void {
    this.phraseService
      .getPhrases(this.selectedLanguage)
      .then(phrases => this.phrases = phrases);
  }

  getTranslations(): void {
    this.translatedPhrases = [];
    this.translationService.getTranslations(this.selectedPhrase._id)
      .then(translations => {
        for(let k in translations){
          let translation = translations[k];
	      if(this.selectedPhrase._id != translation.phraseId
	      && this.selectedSecondLanguage == translation.language){
	        this.phraseService.get(translation.phraseId)
	            .then(phrase => this.translatedPhrases.push(phrase));
	      }
	      if(this.selectedPhrase._id != translation.secondPhraseId
	      && this.selectedSecondLanguage == translation.secondLanguage){
	        this.phraseService.get(translation.secondPhraseId)
	            .then(phrase => this.translatedPhrases.push(phrase));
	      }
	    }
      });
  }

  addPhrase(text: string): void {
    text = text.trim();
    if (!text) { return; }
    this.phraseService.createPhrase(text, this.selectedLanguage)
      .then(phrase => {
        this.phrases.push(phrase);
        this.selectedPhrase = null;
      });
  }

  delete(phrase: Phrase): void {
    this.translationService
      .getTranslations(phrase._id)
      .then(translations => {
        for(let k in translations){
          this.translationService.delete(translations[k]._id, translations[k]._rev);
	    }
      });
    this.phraseService
        .delete(phrase._id, phrase._rev)
        .then(() => {
          this.phrases = this.phrases.filter(h => h !== phrase);
          if (this.selectedPhrase === phrase) {
            this.selectedPhrase = null;
            this.translatedPhrases = [];
          }
        });
  }
}

