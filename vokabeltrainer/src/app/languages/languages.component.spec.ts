import { LanguagesComponent } from './languages.component';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Language } from '../model/entities';
import { RouterTestingModule } from '@angular/router/testing';
import { LanguageService } from './language.service';

describe('LanguagesComponent', function () {
  let comp: LanguagesComponent;
  let fixture: ComponentFixture<LanguagesComponent>;
  let serviceSpy: jasmine.SpyObj<LanguageService>;
  let div: DebugElement;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('LanguagesService', ['getValue']);
    TestBed.configureTestingModule({
      providers: [LanguagesComponent, { provide: LanguageService, useValue: spy }],
      imports: [RouterTestingModule],
    });
    comp = TestBed.get(LanguagesComponent);
    serviceSpy = TestBed.get(LanguageService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguagesComponent);
    comp = fixture.componentInstance;
    div = fixture.debugElement.query(By.css('div'));
  });

  it('should create component', () => expect(comp).toBeDefined());

});
