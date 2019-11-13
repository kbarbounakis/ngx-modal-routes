import { Input } from '@angular/core';
import { RouterModal } from './RouterModal';
import { ButtonTypes, ButtonType } from './ButtonTypes';
import { RouterModalYesNo } from './RouterModalYesNo'
// noinspection JSUnusedGlobalSymbols
export abstract class RouterModalYesNoCancel extends RouterModalYesNo {

    protected get cancelButtonState(): { cancel: ButtonType } {
        return {
            cancel: {
                buttonText: this._cancelButtonText,
                buttonClass: this._cancelButtonClass,
                buttonDisabled: this._cancelButtonDisabled
            }
        }
    }

    @Input()
    private _cancelButtonText = ButtonTypes.cancel.buttonText;
    public get cancelButtonText() {
        return this._cancelButtonText;
    }
    public set cancelButtonText(value) {
        this._cancelButtonText = value;
        this.buttonChanges.emit(this.cancelButtonState);
    }
    @Input()
    private _cancelButtonClass = ButtonTypes.cancel.buttonClass;
    public get cancelButtonClass() {
        return this._cancelButtonClass;
    }
    public set cancelButtonClass(value) {
        this._cancelButtonClass = value;
        this.buttonChanges.emit(this.cancelButtonState);
    }

    @Input()
    private _cancelButtonDisabled = ButtonTypes.cancel.buttonDisabled;
    public get cancelButtonDisabled() {
        return this._cancelButtonDisabled;
    }
    public set cancelButtonDisabled(value) {
        this._cancelButtonDisabled = value;
        this.buttonChanges.emit(this.cancelButtonState);
    }

    abstract yes(): Promise<any>;
    abstract no(): Promise<any>;
    abstract cancel(): Promise<any>;
}
