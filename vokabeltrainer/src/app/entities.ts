import { CouchdbDoc } from 'couchdb-connector';

export type Numerus = null | "singular" | "plural";
export type Genus = null | "m" | "w" | "n";
export type Person = 1 | 2 | 3;
// export type Modus = "Indikativ" | "Konjunktiv" | "Imperativ";

export class Language {
	static de = "de";
	static en = "en";
	static fr = "fr";
	static es = "es";
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
  language: Language;
  type: PhraseType;
  numerus: Numerus;
  genus: Genus;
  person: Person;
}

export class Translation extends CouchdbDoc {
  phrases: Phrase[];
}
