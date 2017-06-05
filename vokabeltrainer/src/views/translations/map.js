// Map function
function(doc) {
  if (doc.class==="Translation"){
		emit(doc.phraseId, doc);
		emit(doc.secondPhraseId, doc);

    // Uebersetzungen in welchen Sprachen
		emit([doc.phraseId, doc.secondLanguage], doc);
		emit([doc.secondPhraseId, doc.language], doc);
	}
}
