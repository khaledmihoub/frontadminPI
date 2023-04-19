import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Product } from '../models/Product';
import { ProductService } from '../services/product/product.service';
import {ProductDetailsComponent} from "../product-details/product-details.component";
import {MatDialog} from "@angular/material/dialog";
import { ToastService } from '../_services/toast.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  product!:Product;
  currentProduct!: Product;
  constructor(private R: Router,private productService: ProductService,public dialog: MatDialog, public toastService: ToastService) {}

  ngOnInit(): void {
    this.productService.GetAllProducts()
      .subscribe(
        (response: Product[]) => {

          console.log(response);
          this.products = response;
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      );
    console.log(this.products[0].user.name)
    console.log(this.products[0].subCategory.name)
  }

  showProductDetails(id:number){
    this.productService.FindProductById(id).subscribe(currentProduct => {

      if (currentProduct) {
        const status = currentProduct.status ? 'Available' : 'InAvailable';
        this.dialog.open(ProductDetailsComponent, {
          data: {id: id, productdialog:this.dialog}
        });
      }
    });
  }

  AcceptProduct(Product) {
    Product.status = 1;
    console.log(Product);
    this.productService.updateProduct(Product).subscribe(() => {
      this.showSuccess();    });

  }

  DeleteProduct(idProduct: number) {
    this.productService.deleteProduct(idProduct).subscribe(() => {
      this.showError();    });}
  showSuccess() {
    this.toastService.show('Product Accepted', {
      classname: 'bg-success text-light',
      delay: 2000 ,
      autohide: true,

    });
  }
  showError() {
    this.toastService.show('Product Removed', {
      classname: 'bg-danger text-light',
      delay: 2000 ,
      autohide: true,
    });
  }


}


