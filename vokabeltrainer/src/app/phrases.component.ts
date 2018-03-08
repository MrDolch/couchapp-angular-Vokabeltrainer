import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Phrase, Translation, Language } from './entities';
import { PhraseService } from './phrase.service';
import { LanguageService } from './languages/language.service';
import { TranslationService } from './translation.service';

@Component({
  selector: 'vokabel-phrases',
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
    private router: Router,
    private phraseService: PhraseService,
    private languageService: LanguageService,
    private translationService: TranslationService
  ) { }



  ngOnInit(): void {
    this.languageService.selectedLanguageUpdate.subscribe(() => this.getPhrases());
    if (this.languageService.selectedLanguage) {
      this.getPhrases();
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

  getPhrases(): void {
    if (this.languageService.selectedLanguage) {
      this.phraseService
        .getAllFor(this.languageService.selectedLanguage.code)
        .then(x => this.phrases = x);
    } else {
      this.phrases = [];
    }
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
    this.phraseService.create(new Phrase(text, this.languageService.selectedLanguage))
      .then(phrase => {
        this.phrases.push(phrase);
        this.selectedPhrase = null;
      });
  }

  addNewTranslation(text: string): void {
    this.phraseService.create(new Phrase(text, this.selectedSecondLanguage))
      .then(phrase => {
        this.addTranslation(phrase);
      });
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
    this.translationService
      .getAllFor(phrase._id)
      .then(translations => {
        for (const k of Object.keys(translations)) {
          this.translationService.delete(translations[k]._id, translations[k]._rev);
        }
      });
    this.phraseService
      .delete(phrase._id, phrase._rev)
      .then(() => {
        this.phrases = this.phrases.filter(h => h !== phrase);
        this.translatedPhrases = this.translatedPhrases.filter(h => h !== phrase);
        if (this.selectedPhrase === phrase) {
          this.selectedPhrase = null;
          this.translatedPhrases = [];
        }
      });
  }
}

