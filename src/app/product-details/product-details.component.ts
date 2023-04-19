import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef,MatDialogActions} from '@angular/material/dialog';
import {Product} from "../Models/Product";
import {ProductService} from "../services/product/product.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ImageService} from "../services/Image/Image.service";
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  public product: Product;
  subcategories: ["a","b"];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private productService: ProductService,
              private ImageService: ImageService) {}

  ngOnInit(): void {
    this.getProductBuId();
  }

  getProductBuId(){
    this.productService.FindProductById(this.data.id)
      .subscribe(
        (response: any) => {
          this.product = response;
          this.ImageService.GetImageByIdProduct(this.product.idProduct).subscribe(
            (value:any) => {
              this.product.ProductImages = this.ImageService.createImage(value);
            }
          )

        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      )
  }

  deleteProduct() {
    this.productService.deleteProduct(this.product.idProduct).subscribe(() => {
      this.closeDialog();
    })

  }


  saveProduct(){
    this.productService.updateProduct(this.product).subscribe(() => {
      this.closeDialog();
    });
  }
  updateProduct() {

  }

  closeDialog() {
    this.data.productdialog.closeAll();
  }
}


