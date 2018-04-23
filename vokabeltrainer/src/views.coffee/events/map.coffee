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
    emit ['Language', code], builddoc( timestamp, {code}, changes)

emitPhrase = (timestamp, language, text, changes) ->
    emitLanguage timestamp, language
    emit ['Phrase', language, text], builddoc(timestamp, {language, text}, changes)

emitTrainingSet = (timestamp, language, name, changes) ->
    emit ['TrainingSet', language, name], builddoc(timestamp, {language, name}, changes)


(doc) ->
    if doc.class == 'Event'

        if doc.operation == 'addLanguage'
            emitLanguage doc.timestamp, doc.parameters.code, deleted: false
#            emitPhrase doc.timestamp, doc.parameters.code, '1, 2, 3, 4, 5, 6, 7, 8, 9, 10', deleted: false

        if doc.operation == 'setLanguageEspeakVoice'
            emitLanguage doc.timestamp, doc.parameters.code, espeakVoice: doc.parameters.espeakVoice

        if doc.operation == 'deleteLanguage'
            emitLanguage doc.timestamp, doc.parameters.code, deleted: true

        if doc.operation == 'addPhrase'
            emitPhrase doc.timestamp, doc.parameters.language, doc.parameters.text, deleted: false

        if doc.operation == 'deletePhrase'
            emitPhrase doc.timestamp, doc.parameters.language, doc.parameters.text, deleted: true

        if doc.operation == 'addTranslation'
            emitPhrase doc.timestamp, doc.parameters.language1, doc.parameters.phrase1, translations: {
                "Phrase;#{doc.parameters.language2};#{doc.parameters.phrase2}": {
                    language: doc.parameters.language2
                    text: doc.parameters.phrase2
                    deleted: false
                }
            }
            emitPhrase doc.timestamp, doc.parameters.language2, doc.parameters.phrase2, translations: {
                "Phrase;#{doc.parameters.language1};#{doc.parameters.phrase1}": {
                    language: doc.parameters.language1
                    text: doc.parameters.phrase1
                    deleted: false
                }
            }

        if doc.operation == 'deleteTranslation'
            emitPhrase doc.timestamp, doc.parameters.language1, doc.parameters.phrase1, translations: {
                "Phrase;#{doc.parameters.language2};#{doc.parameters.phrase2}": {
                    language: doc.parameters.language2
                    text: doc.parameters.phrase2
                    deleted: true
                }
            }
            emitPhrase doc.timestamp, doc.parameters.language2, doc.parameters.phrase2, translations: {
                "Phrase;#{doc.parameters.language1};#{doc.parameters.phrase1}": {
                    language: doc.parameters.language1
                    text: doc.parameters.phrase1
                    deleted: true
                }
            }

        if doc.operation == 'addTrainingSet'
            emitTrainingSet doc.timestamp, doc.parameters.language, doc.parameters.name, deleted: false

        if doc.operation == 'deleteTrainingSet'
            emitTrainingSet doc.timestamp, doc.parameters.language, doc.parameters.name, deleted: true

        if doc.operation == 'addTrainingQuestion'
            emitTrainingSet doc.timestamp, doc.parameters.language, doc.parameters.trainingSet, phrases: {
                "Phrase;#{doc.parameters.language};#{doc.parameters.phrase}": {
                    language: doc.parameters.language
                    text: doc.parameters.phrase
                    deleted: true
                }
            }
            emitPhrase doc.timestamp, doc.parameters.language, doc.parameters.phrase, trainingSets: {
                "TrainingSet;#{doc.parameters.language};#{doc.parameters.trainingSet}":{
                    language: doc.parameters.language
                    name: doc.parameters.trainingSet
                    deleted: false
                }
            }
