builddoc = (timestamp, master, changes) ->
    [master._created, master._modified] = [timestamp, {}]
    for key, value of changes
      if Object.prototype.toString.call(value) == '[object Object]'
        [master[key], master._modified[key]] = [{},{}] if not master[key]
        [master[key][k], master._modified[key][k]] = [v, timestamp] for k, v of value
      else
        [master[key], master._modified[key]] = [value, timestamp]
    return master

emitLanguage = (timestamp, code, changes) ->
    emit ['Language', code], builddoc( timestamp, {code, deleted: false}, changes)

emitPhrase = (timestamp, language, phrase, changes) ->
    emitLanguage timestamp, language
    emit ['Phrase', language, phrase], builddoc(timestamp, {language, phrase, deleted: false}, changes)

emitTrainingSet = (timestamp, language, trainingSet, changes) ->
    emit ['TrainingSet', language, trainingSet], builddoc(timestamp, {language, trainingSet, deleted: false}, changes)


(doc) ->
    if doc.class == 'Event'

        if doc.operation == 'addLanguage'
            emit null, doc
            emitLanguage doc.timestamp, doc.parameters.code

        if doc.operation == 'setLanguageEspeakVoice'
            emitLanguage doc.timestamp, doc.parameters.code, espeakVoice: doc.parameters.espeakVoice

        if doc.operation == 'deleteLanguage'
            emitLanguage doc.timestamp, doc.parameters.code, deleted: true

        if doc.operation == 'addTranslation'
            emitPhrase doc.timestamp, doc.parameters.language1, doc.parameters.phrase1, translations: "#{doc.parameters.language2}": doc.parameters.phrase2
            emitPhrase doc.timestamp, doc.parameters.language2, doc.parameters.phrase2, translations: "#{doc.parameters.language1}": doc.parameters.phrase1

        if doc.operation == 'addPhraseToTrainingSet'
            emitPhrase doc.timestamp, doc.parameters.language, doc.parameters.phrase, trainingSet: "#{doc.parameters.trainingSet}": true
            emitTrainingSet doc.timestamp, doc.parameters.language, doc.parameters.trainingSet, phrases: "#{doc.parameters.phrase}": true
