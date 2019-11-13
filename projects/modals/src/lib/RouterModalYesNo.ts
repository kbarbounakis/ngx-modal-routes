import { Input, EventEmitter } from '@angular/core';
import { RouterModal } from './RouterModal';
import { ButtonTypes, ButtonType } from './ButtonTypes';
export abstract class RouterModalYesNo extends RouterModal {
    public readonly buttonChanges = new EventEmitter<{ [ button: string]: ButtonType }>();

    protected get yesButtonState(): { yes: ButtonType } {
        return {
            yes: {
                buttonText: this._yesButtonText,
                buttonClass: this._yesButtonClass,
                buttonDisabled: this._yesButtonDisabled
            }
        }
    }

    protected get noButtonState(): { no: ButtonType } {
        return {
            no: {
                buttonText: this._noButtonText,
                buttonClass: this._noButtonClass,
                buttonDisabled: this._noButtonDisabled
            }
        }
    }

    @Input()
    private _yesButtonText = ButtonTypes.yes.buttonText;
    public get yesButtonText() {
        return this._yesButtonText;
    }
    public set yesButtonText(value) {
        this._yesButtonText = value;
        this.buttonChanges.emit(this.yesButtonState);
    }
    @Input()
    private _yesButtonClass = ButtonTypes.yes.buttonClass;
    public get yesButtonClass() {
        return this._yesButtonClass;
    }
    public set yesButtonClass(value) {
        this._yesButtonClass = value;
        this.buttonChanges.emit(this.yesButtonState);
    }
    @Input()
    private _noButtonText = ButtonTypes.no.buttonText;
    public get noButtonText() {
        return this._noButtonText;
    }
    public set noButtonText(value) {
        this._noButtonText = value;
        this.buttonChanges.emit(this.noButtonState);
    }
    @Input()
    private _noButtonClass = ButtonTypes.no.buttonClass;
    public get noButtonClass() {
        return this._noButtonClass;
    }
    public set noButtonClass(value) {
        this._noButtonClass = value;
        this.buttonChanges.emit(this.noButtonState);
    }

    @Input()
    private _yesButtonDisabled = ButtonTypes.yes.buttonDisabled;
    public get yesButtonDisabled() {
        return this._yesButtonDisabled;
    }
    public set yesButtonDisabled(value) {
        this._yesButtonDisabled = value;
        this.buttonChanges.emit(this.noButtonState);
    }
    @Input()
    private _noButtonDisabled = ButtonTypes.no.buttonDisabled;
    public get noButtonDisabled() {
        return this._noButtonDisabled;
    }
    public set noButtonDisabled(value) {
        this._noButtonDisabled = value;
       this.buttonChanges.emit(this.noButtonState);
    }

    abstract yes(): Promise<any>;
    abstract no(): Promise<any>;
}
