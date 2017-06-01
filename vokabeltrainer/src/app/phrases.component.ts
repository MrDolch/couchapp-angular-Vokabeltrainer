import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Phrase } from './entities';
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

  onSelect(phrase: Phrase): void {
    this.selectedPhrase = phrase;
  }

  getPhrases(): void {
    this.phraseService.getPhrases().then(phrases => this.phrases = phrases);
  }

  ngOnInit(): void {
    this.getPhrases();
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedPhrase._id]);
  }

  add(text: string): void {
    text = text.trim();
    if (!text) { return; }
    this.phraseService.createPhrase(text)
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

