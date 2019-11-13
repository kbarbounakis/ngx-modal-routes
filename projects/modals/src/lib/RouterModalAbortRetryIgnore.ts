import { Input, EventEmitter } from '@angular/core';
import { RouterModal } from './RouterModal';
import { ButtonTypes } from './ButtonTypes';
export abstract class RouterModalAbortRetryIgnore extends RouterModal {
    public readonly statusChanges = new EventEmitter<any>();
    @Input()
    abortButtonText = ButtonTypes.abort.buttonText;
    @Input()
    abortButtonClass = ButtonTypes.abort.buttonClass;
    @Input()
    retryButtonText = ButtonTypes.retry.buttonText;
    @Input()
    retryButtonClass = ButtonTypes.retry.buttonClass;
    @Input()
    ignoreButtonText = ButtonTypes.ignore.buttonText;
    @Input()
    ignoreButtonClass = ButtonTypes.ignore.buttonClass;
    // noinspection JSUnusedGlobalSymbols
    abstract abort(): Promise<any>;
    abstract retry(): Promise<any>;
    abstract ignore(): Promise<any>;
}
