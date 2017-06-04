import { CouchdbDoc } from 'couchdb-connector';

export type Numerus = null | "singular" | "plural";
export type Genus = null | "m" | "w" | "n";
export type Person = 1 | 2 | 3;
// export type Modus = "Indikativ" | "Konjunktiv" | "Imperativ";

export class Language extends CouchdbDoc {	
	code: string;
  
  constructor(code:string){
    super();
    this.code = code;
  }
}

export class PhraseType {
  static P  = "P"; //  | "Pfin" | "Prest" |
  static E1 = "E1"; 
  static E2 = "E2";
  static E3 = "E3";
  static E4 = "E4";
  static A  = "A" ;
  static Z  = "Z" ;
  static K  = "K" ;
  static O  = "O" ;
  static O1 = "O1";
  static O2 = "O2";
  static PA = "PA";
}

export class Phrase extends CouchdbDoc {
  text: string;
  language: string;
  type: PhraseType;
  numerus: Numerus;
  genus: Genus;
  person: Person;
  
  constructor(text:string, languageCode:string){
    super();
    this.text = text;
    this.language = languageCode;
  }
}

export class Translation extends CouchdbDoc {
  phraseId: string;
  language: string;
  secondPhraseId: string;
  secondLanguage: string;
  
  constructor(phrase: Phrase, secondPhrase:Phrase){
    super();
    this.phraseId = phrase._id;
    this.language = phrase.language;
    this.secondPhraseId = secondPhrase._id;
    this.secondLanguage = secondPhrase.language;
  }
}

// Training der Vokabeln
export class Answer {
  phraseId: string;
  createdTimestamp: number;
  isMatch: boolean;
}
export class Question {
  phraseId: string;
  answers: Answer[];

  constructor(phraseId:string){
    this.phraseId = phraseId;
    this.answers = [];
  }
}
export class TrainingMixture extends CouchdbDoc {
  name: string;
  languageCode: string;
  questions: Question[];

  constructor(name:string, languageCode:string){
    super();
    this.name = name;
    this.languageCode = languageCode;
    this.questions = [];
  }
}

// Bilderraetsel / Wuselbilder
export class Circle {
  x:number;
  y:number;
  r:number;
}
export class WuselbildElement {
  phraseId: string;
  position: Circle;
}
export class Wuselbild extends CouchdbDoc {
  image: string;
  imageUrl: string;
  elements: WuselbildElement[];
}
