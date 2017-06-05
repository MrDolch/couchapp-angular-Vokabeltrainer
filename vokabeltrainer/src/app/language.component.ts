import { Component, Input } from '@angular/core';
import { Language } from './entities';

@Component({
  selector: 'vokabel-language',
  template: `
	<div class="col-xs-2" [class.selected]="selected">
		<span class="badge"><img [src]="'flags/' + language.code + '.svg'"
      width="15"></span>
		{{language.code}}
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
export class LanguageComponent {

  @Input() language:Language;
  @Input() selected:boolean;

}

