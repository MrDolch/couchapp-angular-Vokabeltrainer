function(doc) {
    if (doc.type == 'addLanguage') {
        emit(doc.language, {
            _id: doc._id, class: 'Language',
            _timestamps: { deleted: doc.timestamp },
            language: doc.language,
            deleted: false
        });
    } else if (doc.type == 'setLanguageEspeakVoice') {
        emit(doc.language, {
            _id: doc._id, class: 'Language',
            _timestamps: { espeakVoice: doc.timestamp },
            espeakVoice: doc.espeakVoice
        });
    } else if (doc.type == 'deleteLanguage') {
        emit(doc.language, {
            _id: doc._id, class: 'Language',
            _timestamps: { deleted: doc.timestamp },
            deleted: false
        });
    }
}