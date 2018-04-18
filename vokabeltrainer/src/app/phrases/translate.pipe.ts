import { Pipe, PipeTransform } from '@angular/core';
import { Phrase, Language } from '../model/entities';


@Pipe({ name: 'translate' })
export class TranslatePipe implements PipeTransform {
    transform(allPhrases: Phrase[], toLanguage: Language) {
        let phraseLanguageFilter = 'Phrase;' + toLanguage.code + ';';
        let translatedPhrases: Phrase[] = [];
        for (const phrase of allPhrases || []) {
            if (phrase && phrase.translations) {
                for (const key in phrase.translations) {
                    if (key.startsWith(phraseLanguageFilter)) {
                        const translation: Phrase = phrase.translations[key];
                        translatedPhrases.push(translation);
                    }
                }
            }
        }
        return translatedPhrases;
    }
}
