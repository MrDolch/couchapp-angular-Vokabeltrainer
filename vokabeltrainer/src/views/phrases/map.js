// Map function
function(doc) {
  if (doc.class==="Phrase" && doc.language){
    emit([doc.language, doc._id], doc);
  }
  if (doc.class==="Translation"){
    emit([doc.language, doc.phraseId], doc);
    emit([doc.secondLanguage, doc.secondPhraseId], doc);
  }
  if (doc.class==="EspeakSample"){
    emit([doc.language, doc.phraseId], doc);
    emit([doc.secondLanguage, doc.secondPhraseId], doc);
  }
}
