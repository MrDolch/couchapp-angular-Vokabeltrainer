import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { Phrase, Language } from '../model/entities';
import { PhraseService } from './phrase.service';
import { EspeakSampleService } from '../espeak-sample.service';

@Component({
  selector: 'phrase',
  templateUrl: `./phrase.component.html`,
  styleUrls: [`./phrase.component.css`]
})
export class PhraseComponent implements OnInit {

  @Input() selected: boolean;
  @Input() phrase: Phrase;
  @Input() phraseId: string;
  @Input() secondLanguage: Language;
  @Output() onDelete = new EventEmitter<Phrase>();

  constructor(
    private espeakSampleService: EspeakSampleService,
    private phraseService: PhraseService) { }

  ngOnInit(): void {
    if (this.phraseId && !this.phrase) {
      this.phraseService.get(this.phraseId).then(x => this.phrase = x);
    }
  }

  delete(): void { this.onDelete.emit(this.phrase); }

  playVideo(): void {
    let video: any = document.getElementById('sample-' + this.phrase._id);
    video.play();
  }
  hasTranslation(toLanguage: Language): boolean {
    if (toLanguage) {
      let phraseLanguageFilter = 'Phrase;' + toLanguage.code + ';';
      for (const key in this.phrase.translations) {
        if (key.startsWith(phraseLanguageFilter)) {
          return true;
        }
      }
    }
    return false;
  }
}

