import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IngredientService } from '../../services/ingredient/ingredient.service';

@Component({
  selector: 'add-new-ingredient',
  templateUrl: './add-new-ingredient.component.html',
  styleUrls: ['./add-new-ingredient.component.scss'],
})
export class AddNewIngredientComponent {
  form: FormGroup;
  description: string;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddNewIngredientComponent>,
    private ingredientService: IngredientService,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.description = data.description;
  }
  ngOnInit() {
    this.form = this.fb.group({
      title: ['', []],
      description: ['', []],
    });
  }

  save() {
    this.ingredientService.addIngredient(this.form.value).subscribe((data) => {
      this.dialogRef.close(this.form.value);
    });
  }

  close() {
    this.dialogRef.close();
  }
}
