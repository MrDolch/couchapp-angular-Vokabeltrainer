// Map function
function(doc) {
    if (doc.class==="Translation"){
		emit(doc.phraseId, doc);
		emit(doc.secondPhraseId, doc);
	}
}
