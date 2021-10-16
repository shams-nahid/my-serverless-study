import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
export class NotesApiService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    setOptions() {
        this.options = {
            headers: {
                app_user_id: 'test_user',
                app_user_name: 'Test User'
            }
        };
    }
    addNote(item) {
        let path = STAGE + '/note';
        let endpoint = API_ROOT + path;
        let itemData;
        itemData = {
            content: item.content,
            cat: item.cat
        };
        if (item.title != "") {
            itemData.title = item.title;
        }
        let reqBody = {
            Item: itemData
        };
        this.setOptions();
        return this.httpClient.post(endpoint, reqBody, this.options);
    }
    updateNote(item) {
        let path = STAGE + '/note';
        let endpoint = API_ROOT + path;
        let itemData;
        itemData = {
            content: item.content,
            cat: item.cat,
            timestamp: parseInt(item.timestamp),
            note_id: item.note_id
        };
        if (item.title != "") {
            itemData.title = item.title;
        }
        let reqBody = {
            Item: itemData
        };
        this.setOptions();
        return this.httpClient.patch(endpoint, reqBody, this.options);
    }
    deleteNote(timestamp) {
        let path = STAGE + '/note/t/' + timestamp;
        let endpoint = API_ROOT + path;
        this.setOptions();
        return this.httpClient.delete(endpoint, this.options);
    }
    getNotes(start) {
        let path = STAGE + '/notes?limit=8';
        if (start > 0) {
            path += '&start=' + start;
        }
        let endpoint = API_ROOT + path;
        this.setOptions();
        return this.httpClient.get(endpoint, this.options);
    }
}
NotesApiService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
NotesApiService.ctorParameters = () => [
    { type: HttpClient }
];
