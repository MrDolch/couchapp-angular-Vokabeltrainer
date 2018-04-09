import { LanguageComponent } from './language.component';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Language } from '../model/entities';

describe('LanguageComponent', function () {
  let comp: LanguageComponent;
  let fixture: ComponentFixture<LanguageComponent>;
  let div: DebugElement;
  let img: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LanguageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageComponent);
    comp = fixture.componentInstance;
    comp.language = new Language('de');
    comp.selected = false;
    div = fixture.debugElement.query(By.css('div'));
    img = fixture.debugElement.query(By.css('img'));
  });

  it('should create component', () => expect(comp).toBeDefined());

  it('should have expected <div> text', () => {
    fixture.detectChanges();
    expect(div.nativeElement.innerText).toMatch(/de/);
  });
  it('should have expected <img> src', () => {
    fixture.detectChanges();
    expect(img.nativeElement.src).toMatch(/flags\/de\.svg.*/);
  });
});
