import { PhrasesComponent } from './phrases.component';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Language, Phrase } from '../model/entities';
import { PhraseService } from './phrase.service';
import { AppModule } from '../app.module';
import { EventService, Event } from '../events/event.service';
import { LanguageService } from '../languages/language.service';

describe('PhrasesComponent', function () {
  let testee: PhrasesComponent;
  let fixture: ComponentFixture<PhrasesComponent>;
  let mockEventService: MockEventService;
  let mockPhraseService: MockPhraseService;
  let mockLanguageService: MockLanguageService;
  let mockTranslationService: MockTranslationService;
  let div: DebugElement;

  class MockPhraseService {
    phrases: Phrase[]
    lastSelected: string;
    loadPhrases(language: string) {
      this.phrases = [new Phrase('Hallo', new Language('de'))];
    }
    setSelectedPhrase(text: string) { this.lastSelected = text; }
  };

  class MockLanguageService {
    selectedLanguage = new Language('de');
    languages = [this.selectedLanguage];
  };

  class MockTranslationService {
  };

  class MockEventService {
    lastCreated: string = 'last created';
    lastDeleted: string = 'last deleted';
    addPhrase(code: string, text: string): Promise<Event> {
      this.lastCreated = text;
      return Promise.resolve(null);
    }
    deletePhrase(code: string, text: string): Promise<Event> {
      this.lastDeleted = text;
      return Promise.resolve(null);
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        PhrasesComponent,
        { provide: EventService, useClass: MockEventService },
        { provide: PhraseService, useClass: MockPhraseService },
        { provide: LanguageService, useClass: MockLanguageService },
      ],
    });
    testee = TestBed.get(PhrasesComponent);
    mockEventService = TestBed.get(EventService);
    mockPhraseService = TestBed.get(PhraseService);
    mockLanguageService = TestBed.get(LanguageService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhrasesComponent);
    testee = fixture.componentInstance;
    div = fixture.debugElement.query(By.css('div'));
  });

  it('should create component', () => expect(testee).toBeDefined());

  it('should have expected <div> text', () => {
    fixture.detectChanges();
    expect(div.nativeElement.innerHTML).toMatch(/phraseTextInput/);
  });

  it('should create phrase on button', () => {
    fixture.detectChanges();
    let input = fixture.debugElement.query(By.css('input#phraseTextInput'));
    let addButton = fixture.debugElement.query(By.css('button#addPhraseButton'));
    fixture.detectChanges();
    // act
    input.nativeElement.value = 'Guten Tag!';
    addButton.nativeElement.click();
    // assert
    fixture.whenStable().then(() => {
      expect(mockEventService.lastCreated).toMatch(/Guten Tag/);
      expect(mockPhraseService.lastSelected).toMatch(/Guten Tag/);
    });
  });

  it('should delete phrase on button', () => {
    fixture.detectChanges();
    mockPhraseService.loadPhrases('de');
    fixture.detectChanges();
    let phrase = fixture.debugElement.query(By.css('phrase'));
    fixture.detectChanges();
    // act
    testee.delete(phrase.componentInstance.phrase);
    // assert
    fixture.whenStable().then(() => {
      expect(mockEventService.lastDeleted).toMatch(/Hallo/);
    });
  });
});
