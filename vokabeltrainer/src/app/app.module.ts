import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule }  from '@angular/router';
import { HttpModule }    from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { CouchdbModule } from 'couchdb-connector';

import { AppComponent }          from './app.component';
import { AppRoutingModule }      from './app-routing.module';
import { PhraseDetailComponent } from './phrase-detail.component';
import { PhrasesComponent }      from './phrases.component';
import { PhraseService }         from './phrase.service';
import { PhraseSearchComponent }   from './phrase-search.component';

import {enableProdMode} from '@angular/core';

enableProdMode();

@NgModule({
  imports: [
      BrowserModule,
      FormsModule,
      AppRoutingModule,
      HttpModule,
//      InMemoryWebApiModule.forRoot(InMemoryDataService),
      CouchdbModule, 
    ],
  declarations: [ 
      AppComponent,
      PhraseDetailComponent,
      PhrasesComponent,
      PhraseSearchComponent,
    ],
  providers:    [ PhraseService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
