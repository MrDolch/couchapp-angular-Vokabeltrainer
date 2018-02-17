import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { Phrase, Language } from './entities';
import { PhraseService } from './phrase.service';

@Component({
  selector: 'translation-add',
  templateUrl: './translation-add.component.html',
  styleUrls: ['./translation-add.component.css'],
})
export class TranslationAddComponent implements OnInit {
  private phrases: Observable<Phrase[]>;
  private searchTerms = new Subject<string>();
  @Input() languageCode: string;
  @Output() onAdd = new EventEmitter();
  @Output() onAddNew = new EventEmitter();

  constructor(
    private phraseService: PhraseService,
    private router: Router) { }

  ngOnInit(): void {
    // this.phrases = this.searchTerms
    //   .debounceTime(300)
    //   .distinctUntilChanged()
    //   .switchMap((term: string) => term
    //     ? this.phraseService.searchByLanguage(this.languageCode, term)
    //     : Observable.of<Phrase[]>([]))
    //   .catch((error: any) => {
    //     console.log(error);
    //     return Observable.of<Phrase[]>([]);
    //   });
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  add(phrase: Phrase): void { this.onAdd.emit(phrase); }
  addNew(text: string): void { this.onAddNew.emit(text); }
}
