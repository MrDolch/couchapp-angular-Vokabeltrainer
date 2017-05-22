export class CouchDoc {
  _id: string;
  _rev: string;
}

export class CouchListEntry {
  id: string;
  key: string;
  doc: CouchDoc;
}
