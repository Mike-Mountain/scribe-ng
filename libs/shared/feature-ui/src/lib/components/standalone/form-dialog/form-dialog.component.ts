import {Component, Inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {FormDialogData, MappedForm} from "../../../models";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'ng-scribe-form-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent<T extends object> implements OnInit {

  public formGroup: FormGroup<MappedForm<T>>;
  public formControls: string[];

  constructor(public dialogRef: MatDialogRef<FormDialogComponent<T>>,
              @Inject(MAT_DIALOG_DATA) public data: FormDialogData<T>) {
    this.formGroup = new FormGroup<MappedForm<T> | any>({});
    this.formControls = Object.keys(data.formData);
  }

  ngOnInit(): void {
    // Set up the formGroup
    Object.keys(this.data.formData).forEach(key => {
      const value = this.data.formData[key as keyof T];
      const control = new FormControl(value);
      // @ts-ignore
      this.formGroup.setControl(key, control);
    })
  }

  closeDialog(submitted: boolean) {
    this.dialogRef.close({submitted, data: this.formGroup.value});
  }
}
