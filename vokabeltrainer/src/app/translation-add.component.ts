import { Input, Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { Phrase, Language } from './entities';
import { PhraseService } from './phrase.service';
import { TranslationService } from './translation.service';

@Component({
  selector: 'translation-add',
  templateUrl: './translation-add.component.html',
  styleUrls: [ './translation-add.component.css' ],
})
export class TranslationAddComponent implements OnInit {
  private phrases: Observable<Phrase[]>;
  private searchTerms = new Subject<string>();
  @Input() secondLanguage:string;
  @Input() phrase:Phrase;
  @Input() translatedPhrases:Phrase[];

  constructor(
    private phraseService: PhraseService,
    private translationService: TranslationService,
    private router: Router) {}

  // Push a search term into the observable stream.
  search(term:string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.phrases = this.searchTerms
      .debounceTime(300) 
      .distinctUntilChanged()
      .switchMap(term => term
        ? this.phraseService.search(this.secondLanguage, term)
        : Observable.of<Phrase[]>([]))
      .catch(error => {
        console.log(error);
        return Observable.of<Phrase[]>([]);
      });
  }
  addNewTranslation(text:string): void {
    this.phraseService.createPhrase(text, this.secondLanguage)
      .then(phrase => {
        this.addTranslation(phrase);
      });
  }
  addTranslation(phrase:Phrase): void {
	this.translationService.createTranslation(this.phrase, phrase);
    this.translatedPhrases.push(phrase);
  }
}
