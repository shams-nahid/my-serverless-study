import { Component } from '@angular/core';
import { NotesDataService } from '../../services/notes-data/notes-data.service';
export class HomeComponent {
    constructor(notesDataService) {
        this.notesDataService = notesDataService;
        this.showNoteModal = false;
    }
    ngOnInit() {
        this.newNote = {};
    }
    onShowNoteModal($event) {
        this.showNoteModal = true;
    }
    onCloseNoteModal($event) {
        this.showNoteModal = false;
    }
    onSignOut() {
    }
}
HomeComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-home',
                templateUrl: 'home.component.html'
            },] },
];
/** @nocollapse */
HomeComponent.ctorParameters = () => [
    { type: NotesDataService }
];
