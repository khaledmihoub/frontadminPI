import {Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {Product} from '../models/Product';
import {ProductService} from '../services/product/product.service';
import {MatDialog} from "@angular/material/dialog";
import {ToastService} from '../_services/toast.service';
import {CookiesService} from "../services/cookie/cookies.service";
import {ImageService} from "../services/Image/Image.service";
import {SubCategory} from "../Models/SubCategory";
import {Image} from "../Models/Image";
import {ModalDirective} from "ngx-bootstrap/modal";
import {Category} from "../Models/Category";
import {CategoryService} from "../services/Category/Category.service";
import {SubCategoryService} from "../services/Category/SubCategory.service";


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  jwt: string;
  @ViewChild('DetailsModal') DetailsModal: ModalDirective;
  today: string;
  currentProduct: Product;
  categories: Category[] = [];
  SubCategories: SubCategory[] = [];
  currentCategory: Category;
  productForm: FormGroup;
  filteredSubCategories: SubCategory[];
  id: number;

  constructor(private R: Router,
              private productService: ProductService,
              private formBuilder: FormBuilder,
              public toastService: ToastService,
              private cs: CookiesService,
              private ImageService: ImageService,
              private CategoryService: CategoryService,
              private SubCategoryService: SubCategoryService) {
    this.jwt = this.cs.getCookieJWT().toString();
    this.id=this.cs.getCookieIDUser();
    this.productForm = this.formBuilder.group({
      title: ['', Validators.required],
      reference: ['', Validators.required],
      quantity: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  public productToAdd: Product = {
    idProduct: null,
    title: '',
    reference: '',
    description: '',
    createDateTime: new Date().toISOString(),
    status: 1,
    user: null,
    quantity: 0,
    subcategory: null,
    ProductImages: [],
    commende:[]
  }
  searchTerm: string = "";


  ngOnInit(): void {
    this.GetAllProducts();
    this.getAllCategories();
    this.getAllSubCategories();
  }
  searchProducts() {
    // Filter products based on the search query
    if (this.searchTerm.length > 0) {
    this.products = this.products.filter((product) => {

        return product.title.toLowerCase().includes(this.searchTerm.toLowerCase())  ;

    });
    }
    else{
      this.GetAllProducts()

    }
  }

  GetAllProducts() {
    this.productService.GetAllProducts(this.jwt)
      .subscribe(
        (response: Product[]) => {
          this.products = response;

        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      );
  }

  getAllCategories() {
    this.CategoryService.GetAllCategories(this.jwt)
      .subscribe((response: Category[]) => {
          this.categories = response;

        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        });
  }

  getAllSubCategories() {
    this.SubCategoryService.GetAllSubCategories(this.jwt)
      .subscribe((response: SubCategory[]) => {
          this.SubCategories = response;
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        });
  }

  showProduct(product: Product) {
    console.log(product)
    this.currentProduct = product;
    this.DetailsModal.show();
    this.ImageService.GetImageByIdProduct(this.currentProduct.idProduct, this.jwt).subscribe(
      (value: any) => {
        this.currentProduct.ProductImages = this.ImageService.createImage(value);
        this.CategoryService.FindCategoryBySubId(this.currentProduct.subcategory.idSubCategory,this.jwt)
          .subscribe(
            (response : Category) => {
              this.currentCategory = response;
              this.filteredSubCategories = this.currentCategory.subcategories;
              console.log(this.currentCategory);

            }
          )
      }

    )
  }

  DeleteProduct(idProduct: number) {
    this.productService.deleteProduct(idProduct, this.jwt).subscribe(() => {
      setTimeout(function () {
        window.location.reload();
      }, 5000);
      this.showError();
    });
  }

  showSuccess() {
    this.toastService.show('Product Accepted', {
      classname: 'bg-success text-light',
      delay: 2000,
      autohide: true,

    });
  }

  showSuccessSave() {
    this.toastService.show('Product Modified!', {
      classname: 'bg-success text-light',
      delay: 2000,
      autohide: true,

    });
  }

  showError() {
    this.toastService.show('Product Removed', {
      classname: 'bg-danger text-light',
      delay: 2000,
      autohide: true,
    });
  }

  saveProduct(Product) {
    if (this.productForm.valid) {
    this.productService.updateProduct(Product, this.jwt).subscribe(() => {
      this.showSuccessSave();
      setTimeout(function () {
        window.location.reload();
      }, 5000);
    });
  } else {
      alert('Please fill all the required fields.');
    }
  }


  addProduct() {
    this.productToAdd.user = {idUser: this.id};
    const product = this.prepareFormData(this.productToAdd)
    console.log(product)
    console.log(this.productToAdd)
    this.productService.addProduct(product, this.jwt)
      .subscribe((response: Product) => {
          this.showSuccess();
          setTimeout(function () {
            window.location.reload();
          }, 5000);
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      );

  }

  prepareFormData(product: Product) {
    const formdata = new FormData();
    this.productToAdd.ProductImages.forEach(image => {
      formdata.append('image',
        image.file,
        image.file.name);
    });
    formdata.append(
      'product',
      new Blob([JSON.stringify(product)], {type: 'application/json'})
    )
    return formdata;
  }

  onFileSelected(event: any) {
    if (event.target.files) {
      const files = event.target.files;
      for (let file of files) {
        const image: Image = {
          file: file,
          url: false
        }
        this.productToAdd.ProductImages.push(image);
      }
    }
  }

  updateProduct() {


  }

  compareCategories(category1: any, category2: any): boolean {
    return category1 && category2 && category1.name === category2.name;
  }
  compareSubcategories(sub1: SubCategory, sub2: SubCategory): boolean {
    return sub1 && sub2 ? sub1.idSubCategory === sub2.idSubCategory : sub1 === sub2;
  }

}



