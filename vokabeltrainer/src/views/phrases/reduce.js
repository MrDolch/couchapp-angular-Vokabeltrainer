function(keys, values) {
  var x = {};
  x.codes = []

  for(var i=0; i < values.length; i++) {
    var doc = values[i];
    if(doc.class=="Phrase"){
      x.doc = doc;
    }else if(doc.class=="Translation" && keys[i][0][1]==doc.phraseId){
      x.codes.push(doc.secondLanguage);
    }else if(doc.class=="Translation" && keys[i][0][1]==doc.secondPhraseId){
      x.codes.push(doc.language);
    }
  }
  x.doc.translatedLanguageCodes = x.codes;
  return x.doc;
}
