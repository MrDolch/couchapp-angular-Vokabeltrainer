import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { Phrase, Language } from '../entities';
import { PhraseService } from './phrase.service';
import { EspeakSampleService } from '../espeak-sample.service';

@Component({
  selector: 'vokabel-phrase',
  template: `
    <div *ngIf="phrase" [class.selected]="selected">
      <button class="btn btn-md btn-danger" style="float:right"
        (click)="delete(); $event.stopPropagation()">x</button>
      <span class="badge"><img [src]="'flags/' + phrase.language + '.svg'"
        width="15"></span>
      <span class="badge glyphicon glyphicon-play"
        (click)="playVideo()">
        <video width="1" height="1" [id]="'sample-'+(phrase._id)"
          [src]="'http://192.168.1.10:7080/speech?voice='+phrase.language+'&text='+phrase.text"
        ></video>
      </span>
      {{phrase.text}}
      <span *ngIf="secondLanguage
              && phrase.transient
              && phrase.transient.languageCodes.indexOf(secondLanguage.code)>-1"
        class="glyphicon glyphicon-ok"></span>
    </div>
  `,
  styles: [`
    div {
      cursor: pointer;
      cursor: hand;
      padding: 5px;
      border: 1px dotted gray;
      border-radius: 5px;
    }
    div:hover {
      color: #607D8B;
      background-color: #DDD;
      left: .1em;
    }
    .selected:hover {
      background-color: #BBD8DC !important;
      color: green;
    }
    .selected {
      background-color: #CFD8DC !important;
      color: green;
    }
  ` ]
})
export class PhraseComponent implements OnInit {

  @Input() selected: boolean;
  @Input() phrase: Phrase;
  @Input() phraseId: string;
  @Input() secondLanguage: Language;
  @Output() onDelete = new EventEmitter();

  constructor(
    private espeakSampleService: EspeakSampleService,
    private phraseService: PhraseService) { }

  ngOnInit(): void {
    if (this.phraseId && !this.phrase) {
      this.phraseService.get(this.phraseId).then(x => this.phrase = x);
    }
  }

  delete(): void { this.onDelete.emit(); }

  playVideo(): void {
    let video: any = document.getElementById('sample-' + this.phrase._id);
    video.play();
  }
}

