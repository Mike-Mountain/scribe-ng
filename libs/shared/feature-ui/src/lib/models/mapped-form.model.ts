// Loop through the keys of the type we want to convert, if the property is an array, return FormArray; else if the property is an object, return FormGroup, else return FormControl
import {FormArray, FormControl, FormGroup} from "@angular/forms";

export type MappedForm<Type> = { [Key in keyof Type]: Type[Key] extends Array<any> ? formArray<Type[Key][0]> : Type[Key] extends object ? formGroup<Type[Key]> : FormControl<Type[Key]> };
type formArray<T> = FormArray<FormControl<T>>;
type formGroup<T> = FormGroup<MappedForm<T>>;
