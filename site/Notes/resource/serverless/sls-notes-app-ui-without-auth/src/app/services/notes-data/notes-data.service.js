import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
export class NotesDataService {
    constructor() {
        this.announceAddNoteSource = new Subject();
        this.addNote$ = this.announceAddNoteSource.asObservable();
    }
    announceAddNote(note) {
        this.announceAddNoteSource.next(note);
    }
}
NotesDataService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
NotesDataService.ctorParameters = () => [];
