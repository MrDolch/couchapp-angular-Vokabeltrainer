import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { CouchdbModule } from 'couchdb-connector/dist/index';

import { VokabelnComponent } from './vokabeln.component';
import { WorkbenchModule } from './workbench.module';
import { EspeakSampleService } from './espeak-sample.service';
import { LanguageComponent } from './languages/language.component';
import { LanguagesComponent } from './languages/languages.component';
import { LanguageService } from './languages/language.service';
import { PhraseComponent } from './phrases/phrase.component';
import { PhrasesComponent } from './phrases/phrases.component';
import { PhraseService } from './phrases/phrase.service';
import { TrainingComponent } from './training.component';
import { TrainingMixtureComponent } from './training-mixture.component';
import { TrainingMixtureService } from './training-mixture.service';
import { TranslationAddComponent } from './translation-add.component';
import { TranslationService } from './translation.service';

// import { enableProdMode } from '@angular/core'; enableProdMode();

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        WorkbenchModule,
        HttpModule,
        CouchdbModule],
    declarations: [
        LanguageComponent,
        LanguagesComponent,
        PhraseComponent,
        PhrasesComponent,
        TrainingComponent,
        TrainingMixtureComponent,
        TranslationAddComponent,
        VokabelnComponent,
    ],
    providers: [
        EspeakSampleService,
        PhraseService,
        LanguageService,
        TrainingMixtureService,
        TranslationService],
    bootstrap: [
        VokabelnComponent],
})
export class AppModule { }
