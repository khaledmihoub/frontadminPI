import {Component, OnInit} from '@angular/core';
import {Category} from "../Models/Category";
import {Router} from "@angular/router";
import {CategoryService} from "../services/Category/Category.service";
import {SubCategoryService} from "../services/Category/SubCategory.service";
import {CookiesService} from "../services/cookie/cookies.service";
import {Product} from "../Models/Product";
import {SubCategory} from "../Models/SubCategory";
import {error} from "protractor";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastService} from "../_services/toast.service";
import {waitForAsync} from "@angular/core/testing";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  SubCategories: SubCategory[] = [];
  jwt: string;
  showStats = false;

  constructor(private R: Router, private CategoryService: CategoryService,
              private SubCategoryService: SubCategoryService,
              private cs: CookiesService,
              public toastService: ToastService) {
    this.jwt = this.cs.getCookieJWT().toString();

  }

  public SubCategoryToAdd: SubCategory = {
    idSubCategory: null,
    name: '',
    category: null,
    products: null,
    favoriteList: null,
  }

  public CategoryToAdd: Category = {
    idCategory: null,
    name: '',
    subcategories: null,
  }
  searchTerm: any;
  EditSub: boolean;
  EditCat: boolean;
  EditSubId: number;
  EditCatId: number;

  ngOnInit(): void {
    this.CategoryService.GetAllCategories(this.jwt)
      .subscribe((response: Category[]) => {
          this.categories = response;
          console.log(this.categories)

        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        });
    this.SubCategoryService.GetAllSubCategories(this.jwt)
      .subscribe((response: SubCategory[]) => {
          this.SubCategories = response;
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        });
  }

  addCategory() {
    this.CategoryService.addCategory(this.CategoryToAdd, this.jwt)
      .subscribe((response: Product) => {
          this.showSuccessCat();

          window.location.reload();
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      );
  }

  deleteSubCategory(idSubCategory: number) {
    this.SubCategoryService.deleteSubCategory(idSubCategory, this.jwt).subscribe(() => {
        this.showErrorSCat();
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  deleteCategory(idCategory: number) {
    this.CategoryService.deleteCategory(idCategory, this.jwt).subscribe(() => {
        this.showErrorCat();
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  EditSubCategory(Id, Name) {
    this.SubCategoryService.updateSubCategory(Id, Name, this.jwt).subscribe(() => {
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  EditCategory(category: Category) {
    this.CategoryService.updateCategory(category, this.jwt).subscribe(() => {
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );

  }

  addSubCategory() {
    console.log(this.SubCategoryToAdd)
    this.SubCategoryService.addSubCategory(this.SubCategoryToAdd, this.jwt)
      .subscribe(() => {
          this.showSuccessSCat();
          window.location.reload();
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      );

  }

  showSuccessCat() {
    this.toastService.show('Category Added', {
      classname: 'bg-success text-light',
      delay: 2000,
      autohide: true,

    });
  }

  showErrorCat() {
    this.toastService.show('Category Deleted', {
      classname: 'bg-danger text-light',
      delay: 2000,
      autohide: true,
    });
  }

  showSuccessSCat() {
    this.toastService.show('SubCategory Added', {
      classname: 'bg-success text-light',
      delay: 2000,
      autohide: true,

    });
  }

  showErrorSCat() {
    this.toastService.show('SubCategory Deleted', {
      classname: 'bg-danger text-light',
      delay: 2000,
      autohide: true,
    });
  }
}
