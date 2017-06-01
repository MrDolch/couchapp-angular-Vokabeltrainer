import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Phrase, Language } from './entities';
import { PhraseService } from './phrase.service';
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
    private translationService: TranslationService
  ) { }

  selectedPhrase: Phrase;
  phrases: Phrase[];
  translatedPhrases: Phrase[];
  
  selectedLanguage: Language = Language.de;
  selectedSecondLanguage: Language = Language.en;
  languages: Language[];

  onSelectPhrase(phrase: Phrase): void {
    this.selectedPhrase = phrase;
    this.getTranslations();
  }

  onSelectLanguage(language: Language): void {
    this.selectedLanguage = language;
    this.getPhrases();    
  }

  onSelectSecondLanguage(language: Language): void {
    this.selectedSecondLanguage = language;
    this.getTranslations();
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
        for(var k in translations){
          var translation = translations[k];
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

  ngOnInit(): void {
    this.languages = [Language.de, Language.en, Language.fr];
    this.getPhrases();
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
    this.phraseService
        .delete(phrase._id, phrase._rev)
        .then(() => {
          this.phrases = this.phrases.filter(h => h !== phrase);
          if (this.selectedPhrase === phrase) { this.selectedPhrase = null; }
        });
  }
}

