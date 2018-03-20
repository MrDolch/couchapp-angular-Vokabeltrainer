import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TrainingMixture } from '../entities';

@Component({
  selector: 'training-mixture',
  template: `
    <div *ngIf="mixture" class="col-xs-{{colspan}}" [class.selected]="selected">
      <span class="badge"><img [src]="'flags/' + mixture.languageCode + '.svg'"
        width="15"></span>
      <button class="btn btn-xs btn-danger" style="float:right"
        (click)="delete(); $event.stopPropagation()">x</button>
      {{mixture.name}}
    </div>
  `,
  styles: [`
    div {
      cursor: pointer;
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
  ` ]
})
export class TrainingMixtureComponent {
  @Input() colspan: number = 6;
  @Input() mixture: TrainingMixture;
  @Output() onDelete = new EventEmitter();

  constructor() { }


  delete(): void {
    this.onDelete.emit();
  }
}

