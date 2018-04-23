import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TrainingSet } from '../model/entities';

@Component({
  selector: 'training-set',
  templateUrl: './training-set.component.html',
  styleUrls: ['./training-set.component.css']
})
export class TrainingSetComponent {

  @Input() selected: boolean;
  @Input() trainingSet: TrainingSet;
  @Output() onDelete = new EventEmitter();

  constructor() { }

  delete(): void {
    this.onDelete.emit();
  }
}

