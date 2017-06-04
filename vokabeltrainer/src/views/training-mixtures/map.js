// Map function
function(doc) {
  if (doc.class==="TrainingMixture"){
    emit(doc.languageCode, doc);
  }
}
