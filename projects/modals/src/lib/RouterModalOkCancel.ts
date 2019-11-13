import { Input, EventEmitter } from '@angular/core';
import { RouterModal } from './RouterModal';
import { ButtonTypes, ButtonType } from './ButtonTypes';
export abstract class RouterModalOkCancel extends RouterModal {
    public readonly buttonChanges = new EventEmitter<{ [ button: string]: ButtonType }>();
    @Input()
    private _okButtonText = ButtonTypes.ok.buttonText;

    protected get okButtonState(): { ok: ButtonType } {
        return {
            ok: {
                buttonText: this._okButtonText,
                buttonClass: this._okButtonClass,
                buttonDisabled: this._okButtonDisabled
            }
        }
    }

    protected get cancelButtonState(): { cancel: ButtonType } {
        return {
            cancel: {
                buttonText: this._cancelButtonText,
                buttonClass: this._cancelButtonClass,
                buttonDisabled: this._cancelButtonDisabled
            }
        }
    }

    public get okButtonText() {
        return this._okButtonText;
    }
    public set okButtonText(value) {
        this._okButtonText = value;
        this.buttonChanges.emit(this.okButtonState);
    }
    @Input()
    private _okButtonClass = ButtonTypes.ok.buttonClass;
    public get okButtonClass() {
        return this._okButtonClass;
    }
    public set okButtonClass(value) {
        this._okButtonClass = value;
        this.buttonChanges.emit(this.okButtonState);
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
    private _okButtonDisabled = ButtonTypes.ok.buttonDisabled;
    public get okButtonDisabled() {
        return this._okButtonDisabled;
    }
    public set okButtonDisabled(value) {
        this._okButtonDisabled = value;
        this.buttonChanges.emit(this.okButtonState);
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
    abstract ok(): Promise<any>;
    abstract cancel(): Promise<any>;
}
