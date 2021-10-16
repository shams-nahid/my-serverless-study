import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NotesApiService } from '../../services/notes-api/notes-api.service';
export class NoteSnapshotComponent {
    constructor(notesApiService) {
        this.notesApiService = notesApiService;
        this.deleteNoteEvent = new EventEmitter();
        this.refreshNotesEvent = new EventEmitter();
        this.isLoading = false;
    }
    ngOnInit() {
        this.alert = {};
    }
    deleteNote($event, timestamp) {
        $event.stopPropagation();
        this.isLoading = true;
        this.notesApiService.deleteNote(timestamp).subscribe(res => {
            this.deleteNoteEvent.emit(timestamp);
        }, err => {
            if (err.error && err.error.message) {
                this.alert = {
                    type: 'danger',
                    message: err.error.message
                };
            }
            else {
                this.alert = {
                    type: 'danger',
                    message: err.message
                };
            }
            this.refreshNotesEvent.emit();
            this.isLoading = false;
        }, () => {
            this.isLoading = false;
        });
    }
}
NoteSnapshotComponent.decorators = [
    { type: Component, args: [{
                selector: 'note-snapshot',
                templateUrl: 'note-snapshot.component.html'
            },] },
];
/** @nocollapse */
NoteSnapshotComponent.ctorParameters = () => [
    { type: NotesApiService }
];
NoteSnapshotComponent.propDecorators = {
    note: [{ type: Input }],
    deleteNoteEvent: [{ type: Output }],
    refreshNotesEvent: [{ type: Output }]
};
