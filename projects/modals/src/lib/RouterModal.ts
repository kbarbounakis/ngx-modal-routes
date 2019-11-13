import { Input, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


export declare interface ModalChanges {
    modalTitle?: string;
    modalClass?: string;
}

export class RouterModal {
    constructor(protected router: Router, protected activatedRoute: ActivatedRoute) {
        //
    }
    private _modalTitle: string;
    private _modalClass: string;
    public readonly modalChanges = new EventEmitter<ModalChanges>();
    @Input()
    get modalTitle(): string {
        return this._modalTitle;
    }
    set modalTitle(value: string) {
        this._modalTitle = value;
        this.modalChanges.emit({
            modalTitle: this._modalTitle,
            modalClass: this._modalClass,
        });
    }
    @Input()
    get modalClass(): string {
        return this._modalClass;
    }
    set modalClass(value: string) {
        this._modalClass = value;
        this.modalChanges.emit({
            modalTitle: this._modalTitle,
            modalClass: this._modalClass,
        });
    }
    public close() {
        return this.router.navigate([
            {
                outlets: {
                    modal: null
                }
            }
        ], {
            relativeTo: this.activatedRoute.parent
        });
    }
}
