
export declare interface ButtonType {
    buttonText: string;
    buttonClass: string;
    buttonDisabled?: boolean
}

export const ButtonTypes = {
    ok: {
      buttonText: 'OK',
      buttonClass: 'btn btn-primary',
      buttonDisabled: false
    },
    cancel: {
      buttonText: 'Cancel',
      buttonClass: 'btn btn-default',
      buttonDisabled: false
    },
    yes: {
      buttonText: 'Yes',
      buttonClass: 'btn btn-primary',
      buttonDisabled: false
    },
    no: {
      buttonText: 'No',
      buttonClass: 'btn btn-default',
      buttonDisabled: false
    },
    abort: {
      buttonText: 'Abort',
      buttonClass: 'btn btn-danger',
      buttonDisabled: false
    },
    retry: {
      buttonText: 'Retry',
      buttonClass: 'btn btn-primary',
      buttonDisabled: false
    },
    ignore: {
      buttonText: 'Ignore',
      buttonClass: 'btn btn-warning',
      buttonDisabled: false
    }
  };