import { Component, Input } from '@angular/core';
import { Language } from '../model/entities';

@Component({
  selector: 'language',
  template: `
<div [class.selected]="selected">
  <span class="badge"><img [src]="'node_modules/flag-icon-css/flags/1x1/' + language.code + '.svg'" width="15"></span>
  {{language.code}}
  <span *ngIf="language.deleted">x</span>
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
export class LanguageComponent {

  @Input() language: Language;
  @Input() selected: boolean;

}

