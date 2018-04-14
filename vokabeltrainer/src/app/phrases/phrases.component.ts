import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Phrase, Translation, Language } from '../model/entities';
import { PhraseService } from './phrase.service';
import { LanguageService } from '../languages/language.service';
import { TranslationService } from '../translations/translation.service';
import { EventService } from '../events/event.service';

@Component({
  selector: 'phrases',
  templateUrl: './phrases.component.html',
  styles: [`
    img {
      border:2px solid white;
      cursor:pointer; cursor:hand;
    }
    img.selected, img:hover {
      border:2px solid gray;
    }
  `]
})
export class PhrasesComponent implements OnInit {
  phrases: Phrase[];
  translatedPhrases: Phrase[];
  selectedPhrase: Phrase;
  selectedSecondLanguage: Language;

  constructor(
    private eventService: EventService,
    private phraseService: PhraseService,
    private languageService: LanguageService,
    private translationService: TranslationService
  ) { }

  ngOnInit(): void {
    if (this.languageService.selectedLanguageUpdate) {
      this.languageService.selectedLanguageUpdate.subscribe(() => {
        if (this.languageService.selectedLanguage) {
          this.phraseService.loadPhrases(this.languageService.selectedLanguage.code);
        }
      })
    }
    if (this.languageService.selectedLanguage) {
      this.phraseService.loadPhrases(this.languageService.selectedLanguage.code);
    }
  }

  onSelectPhrase(phrase: Phrase): void {
    this.selectedPhrase = phrase;
    this.getTranslations();
  }

  onSelectSecondLanguage(language: Language): void {
    this.selectedSecondLanguage = language;
    this.getTranslations();
  }

  getTranslations(): void {
    this.translatedPhrases = [];
    if (!this.selectedSecondLanguage || !this.selectedPhrase) {
      return;
    }
    this.translationService.getAllFor(this.selectedPhrase._id)
      .then(translations => {
        for (const k of Object.keys(translations)) {
          let translation = translations[k];
          if (this.selectedPhrase._id !== translation.phraseId
            && this.selectedSecondLanguage.code === translation.language) {
            this.phraseService.get(translation.phraseId)
              .then(phrase => this.translatedPhrases.push(phrase));
          }
          if (this.selectedPhrase._id !== translation.secondPhraseId
            && this.selectedSecondLanguage.code === translation.secondLanguage) {
            this.phraseService.get(translation.secondPhraseId)
              .then(phrase => this.translatedPhrases.push(phrase));
          }
        }
      });
  }

  addPhrase(text: string): void {
    text = text.trim();
    if (!text) { return; }
    this.eventService.addPhrase(this.languageService.selectedLanguage.code, text)
      .then(() => this.phraseService.loadPhrases(this.languageService.selectedLanguage.code))
      .then(() => this.phraseService.setSelectedPhrase(text));
  }

  addNewTranslation(text: string): void {
    this.phraseService.create(new Phrase(text, this.selectedSecondLanguage))
      .then(phrase => this.addTranslation(phrase));
  }
  addTranslation(phrase: Phrase): void {
    this.translationService.create(new Translation(this.selectedPhrase, phrase));
    this.translatedPhrases.push(phrase);
    if (this.selectedPhrase.transient) {
      this.selectedPhrase.transient.languageCodes.push(this.selectedSecondLanguage.code);
      let i = this.phrases.indexOf(this.selectedPhrase);
      while (++i < this.phrases.length) {
        if (-1 === this.phrases[i].transient.languageCodes.indexOf(this.selectedSecondLanguage.code)) {
          this.selectedPhrase = this.phrases[i];
          this.translatedPhrases = [];
          break;
        }
      }
    }
  }

  delete(phrase: Phrase): void {
    this.eventService.deletePhrase(phrase.language, phrase.text);
  }
}

