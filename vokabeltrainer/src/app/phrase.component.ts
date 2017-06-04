import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { Phrase } from './entities';
import { PhraseService } from './phrase.service';

@Component({
  selector: 'vokabel-phrase',
  template: `
    <div *ngIf="phrase">
      <img [src]="'flags/' + phrase.language + '.svg'"
           align="left" width="15" hspace="10" vspace="2">
      {{phrase.text}}
      <button class="delete"
        (click)="delete(); $event.stopPropagation()">x</button>
    </div>
  `,
  styles: [ `
	div {
	  cursor: pointer;
	  position: relative;
	  left: 0;
	  background-color: #EEE;
	  margin: .5em;
	  padding: .3em 0;
	  height: 1.6em;
	  border-radius: 4px;
	}
	div:hover {
	  color: #607D8B;
	  background-color: #DDD;
	  left: .1em;
	}
	.selected:hover {
	  background-color: #BBD8DC !important;
	  color: white;
	}
	.text {
	  position: relative;
	  top: -3px;
	}
	.badge {
	  display: inline-block;
	  font-size: small;
	  color: white;
	  padding: 0.8em 0.7em 0 0.7em;
	  background-color: #607D8B;
	  line-height: 1em;
	  position: relative;
	  left: -1px;
	  top: -4px;
	  height: 1.8em;
	  margin-right: .8em;
	  border-radius: 4px 0 0 4px;
	}
	button {
	  font-family: Arial;
	  background-color: #eee;
	  border: none;
	  padding: 5px 10px;
	  border-radius: 4px;
	  cursor: pointer;
	  cursor: hand;
	}
	button:hover {
	  background-color: #cfd8dc;
	}
	button.delete {
	  float:right;
	  margin-top: 2px;
	  margin-right: .8em;
	  background-color: gray !important;
	  color:white;
	}
  ` ]
})
export class PhraseComponent implements OnInit{

  constructor(
    private phraseService: PhraseService ) { }
  
  @Input() phrase: Phrase;
  @Input() phraseId: string;
  @Output() onDelete = new EventEmitter();
  
  ngOnInit(): void {
    if(this.phraseId){
      this.phraseService.get(this.phraseId).then(x=> this.phrase = x);
    }
  }
  
  delete(): void { this.onDelete.emit(); }
}

