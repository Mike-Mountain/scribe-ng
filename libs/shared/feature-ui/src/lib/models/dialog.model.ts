import {FormArray, FormControl, FormGroup} from "@angular/forms";

export interface FormDialogData<T> {
  formData: T;
  formTitle: string;
  cancelButton: boolean;
  okayButton: boolean;
}

export interface MessageDialogData {
  icon: string;
  title: string;
  message: string;
  buttons: DialogButtons;
}

export interface DialogButtons {
  cancel: boolean;
  cancelText: string;
  action?: boolean;
  actionText?: string;
}
