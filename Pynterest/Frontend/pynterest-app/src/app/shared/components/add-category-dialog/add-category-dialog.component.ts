import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WriteCategoryModel } from '@app/shared/models/writeCategoryModel';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-add-category-dialog',
  templateUrl: './add-category-dialog.component.html',
  styleUrls: ['./add-category-dialog.component.scss']
})
export class AddCategoryDialogComponent implements OnInit {

  public addCategoryForm: FormGroup = this.formBuilder.group({
    categoryName: [, { validators: [Validators.required], updateOn: "change" }],

  });

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService) { }

  ngOnInit(): void {
  }

  async submitAddCategoryForm(_addCategoryForm) {
    this.addCategoryForm = _addCategoryForm;
    let category: WriteCategoryModel = { name: this.addCategoryForm.get("categoryName").value }
    this.categoryService.addCategory(category).subscribe((error) => console.log(error))
  }

}
