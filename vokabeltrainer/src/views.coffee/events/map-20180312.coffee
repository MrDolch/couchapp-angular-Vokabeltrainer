builddoc = (timestamp, master, changes) ->
    [master._created, master._modified] = [timestamp, {}]
    [master[key], master._modified[key]] = [value, timestamp] for key, value of changes
    return master

emitLanguage = (timestamp, language, changes) ->
    emit ['Language', language], builddoc( timestamp, language: language, deleted: false, changes)

emitPhrase = (timestamp, language, phrase, changes) ->
    emit ['Phrase', language, phrase], builddoc( timestamp, language:language, phrase: phrase, deleted: false, changes)

emitTrainingSet = (timestamp, trainingSet, changes) ->
    emit ['TrainingSet', trainingSet], builddoc( timestamp, trainingSet: trainingSet, deleted: false, changes)

(doc) ->
    if (true or doc.class == 'Event')

        if (doc.type == 'addLanguage')
            emitLanguage(doc.timestamp, doc.language)

        if (doc.type == 'setLanguageEspeakVoice')
            emitLanguage(doc.timestamp, doc.language, espeakVoice: doc.espeakVoice)

        if (doc.type == 'deleteLanguage')
            emitLanguage(doc.timestamp, doc.language, deleted: true)

        if (doc.type == 'addTranslation')
            emitLanguage(doc.timestamp, doc.language1)
            emitLanguage(doc.timestamp, doc.language2)
            emitPhrase(doc.timestamp, doc.language1, doc.phrase1)
            emitPhrase(doc.timestamp, doc.language2, doc.phrase2)

        if (doc.type == 'addPhraseToTrainingSet')
            emitLanguage(doc.timestamp, doc.language)
            emitPhrase(doc.timestamp, doc.language, doc.phrase, trainingSet: doc.trainingSet)
            emitTrainingSet(doc.timestamp, doc.trainingSet)

# View of View: https://github.com/afters/Couch-Incarnate