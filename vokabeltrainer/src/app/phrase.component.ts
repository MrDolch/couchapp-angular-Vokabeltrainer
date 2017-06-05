import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { Phrase, Language } from './entities';
import { PhraseService } from './phrase.service';

@Component({
  selector: 'vokabel-phrase',
  template: `
    <div *ngIf="phrase" class="col-xs-{{colspan}}" [class.selected]="selected">
      <button class="btn btn-xs btn-danger" style="float:right"
        (click)="delete(); $event.stopPropagation()">x</button>
      <span class="badge"><img [src]="'flags/' + phrase.language + '.svg'"
        width="15"></span>
      {{phrase.text}}
      <span *ngIf="secondLanguage && phrase.translatedLanguageCodes.indexOf(secondLanguage.code)>-1"
        class="glyphicon glyphicon-ok"></span>
    </div>
  `,
  styles: [ `
    div {
      cursor: pointer;r
      cursor: hand;
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
export class PhraseComponent implements OnInit{

  constructor(
    private phraseService: PhraseService ) { }
  
  @Input() colspan: number = 6;
  @Input() selected: boolean;
  @Input() phrase: Phrase;
  @Input() phraseId: string;
  @Input() secondLanguage: Language;
  @Output() onDelete = new EventEmitter();
  
  ngOnInit(): void {
    this.phraseService.get(this.phraseId).then(x=> this.phrase = x);
  }
  
  delete(): void { this.onDelete.emit(); }
}

