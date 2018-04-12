import { Pipe, PipeTransform } from '@angular/core';

import { DeletableCouchdbDoc } from './entities';

@Pipe({ name: 'notDeleted' })
export class NotDeletedPipe implements PipeTransform {
    transform(allDeletables: DeletableCouchdbDoc[]) {
        if (allDeletables) {
            return allDeletables.filter(deletable => true !== deletable.deleted);
        }
    }
}
