import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Phrase, Translation, Language } from '../model/entities';
import { PhraseService } from './phrase.service';
import { LanguageService } from '../languages/language.service';
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
  }

  onSelectSecondLanguage(language: Language): void {
    this.selectedSecondLanguage = language;
  }

  addPhrase(text: string): void {
    text = text.trim();
    if (!text) { return; }
    this.eventService.addPhrase(this.languageService.selectedLanguage.code, text)
      .then(() => this.phraseService.loadPhrases(this.languageService.selectedLanguage.code))
      .then(() => this.phraseService.setSelectedPhrase(text));
  }

  addNewTranslation(text: string): void {
    this.eventService.addTranslation(this.selectedPhrase.language, this.selectedPhrase.text, this.selectedSecondLanguage.code, text);
  }
  addTranslation(phrase: Phrase): void {
    this.eventService.addTranslation(this.selectedPhrase.language, this.selectedPhrase.text, phrase.language, phrase.text)
      // .then(() => this.selectedPhrase.translations[this.selectedPhrase.language] = this.selectedPhrase.text)
      ;
  }
  deleteTranslation(phrase: Phrase): void {
    this.eventService.deleteTranslation(this.selectedPhrase.language, this.selectedPhrase.text, phrase.language, phrase.text)
  }

  delete(phrase: Phrase): void {
    this.eventService.deletePhrase(phrase.language, phrase.text);
  }
}

