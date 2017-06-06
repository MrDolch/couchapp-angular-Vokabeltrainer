function(keys, values) {
  var transient = {languageCodes:[]};
  var phrase = null;

  for(var i=0; i < values.length; i++) {
    var doc = values[i];

    if(doc.class=="Phrase"){
      phrase = doc;

    }else if(doc.class=="Translation" && keys[i][0][1]==doc.phraseId){
      transient.languageCodes.push(doc.secondLanguage);

    }else if(doc.class=="Translation" && keys[i][0][1]==doc.secondPhraseId){
      transient.languageCodes.push(doc.language);

    }else if(doc.class=="EspeakSample"){
//      transient.sample = doc.sample;
      transient.ipa = doc.ipa;
      transient.espeakSampleId = doc._id;

    }
  }
  phrase.transient = transient;
  return phrase;
}
