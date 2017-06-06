import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule }  from '@angular/router';
import { HttpModule }    from '@angular/http';

// Imports for loading & configuring the in-memory web api
//import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService }  from './in-memory-data.service';

import { CouchdbModule } from 'couchdb-connector';

import { AppComponent }          from './app.component';
import { AppRoutingModule }      from './app-routing.module';
import { EspeakSampleService }   from './espeak-sample.service';
import { LanguageComponent }     from './language.component';
import { LanguagesComponent }    from './languages.component';
import { LanguageService }       from './language.service';
import { PhraseComponent }       from './phrase.component';
import { PhrasesComponent }      from './phrases.component';
import { PhraseService }         from './phrase.service';
import { TrainingComponent }     from './training.component';
import { TrainingMixtureComponent } from './training-mixture.component';
import { TrainingMixtureService } from './training-mixture.service';
import { TranslationAddComponent } from './translation-add.component';
import { TranslationService }    from './translation.service';

import {enableProdMode} from '@angular/core';

// enableProdMode();

@NgModule({
  imports: [
      BrowserModule,
      FormsModule,
      AppRoutingModule,
      HttpModule,
//      InMemoryWebApiModule.forRoot(InMemoryDataService),
      CouchdbModule ],
  declarations: [ 
      AppComponent,
      LanguageComponent,
      LanguagesComponent,
      PhraseComponent,
      PhrasesComponent,
      TrainingComponent,
      TrainingMixtureComponent,
      TranslationAddComponent ],
  providers: [ 
      EspeakSampleService,
      PhraseService,
      LanguageService,
      TrainingMixtureService,
      TranslationService ],
  bootstrap: [ 
      AppComponent ],
})
export class AppModule { }
