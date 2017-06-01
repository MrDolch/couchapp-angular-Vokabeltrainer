import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Phrase, Language } from './entities';
import { PhraseService } from './phrase.service';

@Component({
  selector: 'vokabel-phrases',
  templateUrl: './phrases.component.html',
  styleUrls: [ './phrases.component.css' ]
})
export class PhrasesComponent implements OnInit {

  constructor(
    private router: Router,
    private phraseService: PhraseService
  ) { }

  selectedPhrase: Phrase;
  phrases: Phrase[];
  
  selectedLanguage: Language = Language.de;
  languages: Language[];

  onSelectPhrase(phrase: Phrase): void {
    this.selectedPhrase = phrase;
  }

  onSelectLanguage(language: Language): void {
    this.selectedLanguage = language;
    this.getPhrases();    
  }

  getPhrases(): void {
    this.phraseService
      .getPhrases(this.selectedLanguage)
      .then(phrases => this.phrases = phrases);
  }

  ngOnInit(): void {
    this.languages = [Language.de, Language.en, Language.fr];
    this.getPhrases();
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedPhrase._id]);
  }

  add(text: string): void {
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

