import { LanguagesComponent } from './languages.component';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Language } from '../model/entities';
import { RouterTestingModule } from '@angular/router/testing';
import { LanguageService } from './language.service';
import { AppModule } from '../app.module';
import { EventService, Event } from '../events/event.service';

describe('LanguagesComponent', function () {
  let testee: LanguagesComponent;
  let fixture: ComponentFixture<LanguagesComponent>;
  let mockLanguageService: MockLanguageService;
  let mockEventService: MockEventService;
  let div: DebugElement;

  class MockLanguageService {
    languages: Language[] = [new Language('de'), new Language('es')];
    selectedLanguage: Language;
    lastSelected: string = 'last selected';
    loadLanguages(): Promise<Language[]> {
      return Promise.resolve(this.languages = [new Language('de'), new Language('fr'), new Language('es')]);
    }
    setSelectedLanguage(code: string): void {
      this.lastSelected = code;
    }
  };
  class MockEventService {
    lastCreated: string = 'last created';
    lastDeleted: string = 'last deleted';
    addLanguage(code: string): Promise<Event> {
      this.lastCreated = code;
      return Promise.resolve(null);
    }
    deleteLanguage(code: string): Promise<Event> {
      this.lastDeleted = code;
      return Promise.resolve(null);
    }
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        LanguagesComponent,
        { provide: LanguageService, useClass: MockLanguageService },
        { provide: EventService, useClass: MockEventService },
      ],
    });
    testee = TestBed.get(LanguagesComponent);
    mockLanguageService = TestBed.get(LanguageService);
    mockEventService = TestBed.get(EventService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguagesComponent);
    testee = fixture.componentInstance;
    div = fixture.debugElement.query(By.css('div'));
  });

  it('should create component', () => expect(testee).toBeDefined());

  it('should have expected <div> text', () => {
    fixture.detectChanges();
    expect(div.nativeElement.innerText).toMatch(/./);
  });

  it('should create language on button', () => {
    let input = fixture.debugElement.query(By.css('input'));
    let addButton = fixture.debugElement.query(By.css('button#addLanguageButton'));
    fixture.detectChanges();
    // act
    input.nativeElement.value = 'fr';
    addButton.nativeElement.click();
    // assert
    fixture.whenStable().then(() => {
      expect(mockEventService.lastCreated).toMatch(/fr/);
      expect(mockLanguageService.lastSelected).toMatch(/fr/);
    });
  });

  it('should delete language on button', () => {
    let input = fixture.debugElement.query(By.css('input'));
    mockLanguageService.selectedLanguage = new Language('hu');
    fixture.detectChanges();
    let delButton = fixture.debugElement.query(By.css('button#deleteSelectedLanguageButton'));
    fixture.detectChanges();
    // act
    input.nativeElement.value = 'fr';
    delButton.nativeElement.click();
    // assert
    fixture.whenStable().then(() => {
      expect(mockEventService.lastDeleted).toMatch(/hu/);
    });
  });
});
