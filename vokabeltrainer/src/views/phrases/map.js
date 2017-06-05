// Map function
function(doc) {
  if (doc.class==="Phrase"){
    emit([doc.language, doc._id], doc);
  }
  if (doc.class==="Translation"){
    emit([doc.language, doc.phraseId], doc);
    emit([doc.secondLanguage, doc.secondPhraseId], doc);
  }
}
