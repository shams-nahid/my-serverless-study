import { Component, Input } from '@angular/core';
export class SpinnerComponent {
    constructor() {
        this.loadingText = '';
    }
    ngOnInit() { }
}
SpinnerComponent.decorators = [
    { type: Component, args: [{
                selector: 'spinner',
                styles: [`
        .loading-spinner-container {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background: rgba(255,255,255,0.8);
            z-index: 999;
            padding: 30px 0;
        }
    `],
                template: `<div class="loading-spinner-container"><div class="loading-spinner">
            <svg class="spinner stationary"><circle cx="20" cy="20" r="18"></circle></svg>
            <svg class="spinner"><circle cx="20" cy="20" r="18"></circle></svg>
            </div>
            <div class="spinner-center" *ngIf="loadingText != ''">{{loadingText}}</div>
            </div>`
            },] },
];
/** @nocollapse */
SpinnerComponent.ctorParameters = () => [];
SpinnerComponent.propDecorators = {
    loadingText: [{ type: Input }]
};
