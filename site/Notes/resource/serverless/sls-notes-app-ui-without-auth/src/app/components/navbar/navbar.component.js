import { Component, Output, EventEmitter } from '@angular/core';
import { NotesDataService } from '../../services/notes-data/notes-data.service';
export class NavbarComponent {
    constructor(notesDataService) {
        this.notesDataService = notesDataService;
        this.showNoteModalEvent = new EventEmitter();
        this.signOutUserEvent = new EventEmitter();
    }
    ngOnInit() { }
    onShowNoteModal($event) {
        $event.preventDefault();
        this.showNoteModalEvent.emit();
    }
    onSignOut() {
        this.signOutUserEvent.emit();
    }
}
NavbarComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-navbar',
                templateUrl: 'navbar.component.html'
            },] },
];
/** @nocollapse */
NavbarComponent.ctorParameters = () => [
    { type: NotesDataService }
];
NavbarComponent.propDecorators = {
    showNoteModalEvent: [{ type: Output }],
    signOutUserEvent: [{ type: Output }]
};
