import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { PhraseService } from './phrase.service';
import { Phrase } from './entities';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'vokabel-phrase-detail',
  templateUrl: './phrase-detail.component.html',
  styleUrls: [ './phrase-detail.component.css' ],
})

export class PhraseDetailComponent implements OnInit {
  private phrase: Phrase;

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.phraseService.getPhrase(params['id']))
      .subscribe(phrase => this.phrase = phrase);
  }

  constructor(
    private phraseService: PhraseService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.phraseService.update(this.phrase)
      .then(() => this.goBack());
  }
}
