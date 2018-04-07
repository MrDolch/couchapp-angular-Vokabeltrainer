builddoc = (timestamp, master, changes) ->
    [master._created, master._modified] = [timestamp, {}]
    for key, value of changes
      if Object.prototype.toString.call(value) == '[object Object]'
        [master[key], master._modified[key]] = [{},{}] if not master[key]
        [master[key][k], master._modified[key][k]] = [v, timestamp] for k, v of value
      else
        [master[key], master._modified[key]] = [value, timestamp]
    return master

emitLanguage = (timestamp, language, changes) ->
    emit ['Language', language], builddoc( timestamp, language: language, deleted: false, changes)

emitPhrase = (timestamp, language, phrase, changes) ->
    emitLanguage timestamp, language
    emit ['Phrase', language, phrase], builddoc( timestamp, language: language, phrase: phrase, deleted: false, changes)

emitTrainingSet = (timestamp, language, trainingSet, changes) ->
    emit ['TrainingSet', language, trainingSet], builddoc( timestamp, language: language, trainingSet: trainingSet, deleted: false, changes)


(doc) ->
    if true or doc.class == 'Event'

        if doc.type == 'addLanguage'
            emitLanguage doc.timestamp, doc.language

        if doc.type == 'setLanguageEspeakVoice'
            emitLanguage doc.timestamp, doc.language, espeakVoice: doc.espeakVoice

        if doc.type == 'deleteLanguage'
            emitLanguage doc.timestamp, doc.language, deleted: true

        if doc.type == 'addTranslation'
            emitPhrase doc.timestamp, doc.language1, doc.phrase1, translations: "#{doc.language2}": doc.phrase2
            emitPhrase doc.timestamp, doc.language2, doc.phrase2, translations: "#{doc.language1}": doc.phrase1

        if doc.type == 'addPhraseToTrainingSet'
            emitPhrase doc.timestamp, doc.language, doc.phrase, trainingSet: "#{doc.trainingSet}": true
            emitTrainingSet doc.timestamp, doc.language, doc.trainingSet, phrases: "#{doc.phrase}": true
