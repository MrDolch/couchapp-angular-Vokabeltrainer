import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { CouchdbModule } from 'couchdb-connector/dist/index';

import { EspeakSampleService } from './espeak-sample.service';
import { EventService } from './events/event.service';
import { LanguageComponent } from './languages/language.component';
import { LanguagesComponent } from './languages/languages.component';
import { LanguageService } from './languages/language.service';
import { PhraseComponent } from './phrases/phrase.component';
import { PhrasesComponent } from './phrases/phrases.component';
import { PhraseService } from './phrases/phrase.service';
import { TrainingComponent } from './training/training.component';
import { TrainingSetComponent } from './training/training-set.component';
import { TrainingSetService } from './training/training-set.service';
import { TranslationAddComponent } from './translations/translation-add.component';
import { VokabelnComponent } from './vokabeln/vokabeln.component';
import { WorkbenchModule } from './vokabeln/workbench.module';
import { NotDeletedPipe } from './model/not-deleted.pipe';
import { TranslatePipe } from './phrases/translate.pipe';

// import { enableProdMode } from '@angular/core'; enableProdMode();

@NgModule({
    imports: [
        BrowserModule,
        CouchdbModule,
        FormsModule,
        HttpModule,
        WorkbenchModule,
    ],
    declarations: [
        LanguageComponent,
        LanguagesComponent,
        NotDeletedPipe,
        PhraseComponent,
        PhrasesComponent,
        TrainingComponent,
        TrainingSetComponent,
        TranslatePipe,
        TranslationAddComponent,
        VokabelnComponent,
    ],
    providers: [
        EspeakSampleService,
        EventService,
        PhraseService,
        LanguageService,
        TrainingSetService,
    ],
    bootstrap: [
        VokabelnComponent,
    ],
})
export class AppModule { }
