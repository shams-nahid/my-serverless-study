import { Component, Input, Output, EventEmitter, HostListener, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NotesApiService } from '../../services/notes-api/notes-api.service';
import { NotesDataService } from '../../services/notes-data/notes-data.service';
export class NoteComponent {
    constructor(formBuilder, notesApiService, notesDataService) {
        this.formBuilder = formBuilder;
        this.notesApiService = notesApiService;
        this.notesDataService = notesDataService;
        this.closeModalEvent = new EventEmitter();
        this.updateNoteEvent = new EventEmitter();
        this.isLoading = false;
        this.disableSubmit = false;
    }
    ngOnInit() {
        this.alert = {};
        this.isLoading = true;
        this.defaultTitle = 'Title';
        this.noteForm = this.formBuilder.group({
            'title': [this.note.title ? this.note.title : ''],
            'content': [this.note.content ? this.note.content : '', Validators.required],
            'cat': [this.note.cat ? this.note.cat : 'general'],
            'timestamp': [this.note.timestamp],
            'note_id': [this.note.note_id]
        });
        this.isLoading = false;
    }
    ngAfterContentInit() {
        this.vcInput.nativeElement.focus();
    }
    onSubmit() {
        this.isLoading = true;
        this.disableSubmit = true;
        if (!this.noteForm.value.timestamp) {
            this.notesApiService.addNote(this.noteForm.value).subscribe(note => {
                this.notesDataService.announceAddNote(note);
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
                this.disableSubmit = false;
                this.isLoading = false;
            }, () => {
                this.onCloseNoteModal();
            });
        }
        else {
            this.notesApiService.updateNote(this.noteForm.value).subscribe(note => {
                this.updateNoteEvent.emit(note);
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
                this.disableSubmit = false;
                this.isLoading = false;
            }, () => {
                this.onCloseNoteModal();
            });
        }
    }
    onCloseNoteModal($event) {
        if ($event) {
            $event.preventDefault();
        }
        this.closeModalEvent.emit();
    }
    handleKeyboardEvent(event) {
        if (event.keyCode == 27) { // 27 ==> Escape key 
            this.closeModalEvent.emit();
        }
    }
}
NoteComponent.decorators = [
    { type: Component, args: [{
                selector: 'note',
                templateUrl: 'note.component.html'
            },] },
];
/** @nocollapse */
NoteComponent.ctorParameters = () => [
    { type: FormBuilder },
    { type: NotesApiService },
    { type: NotesDataService }
];
NoteComponent.propDecorators = {
    note: [{ type: Input }],
    closeModalEvent: [{ type: Output }],
    updateNoteEvent: [{ type: Output }],
    vcInput: [{ type: ViewChild, args: ["focus",] }],
    handleKeyboardEvent: [{ type: HostListener, args: ['document:keydown', ['$event'],] }]
};
