import { Component, OnInit } from '@angular/core';
import {SubCategory} from "../Models/SubCategory";
import {ChartDataSets, ChartOptions, ChartType} from "chart.js";
import {Label} from "ng2-charts";
import {ProductService} from "../services/product/product.service";
import {SubCategoryService} from "../services/Category/SubCategory.service";
import {CookiesService} from "../services/cookie/cookies.service";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  jwt: string;
  subcategories: SubCategory[] = [];
  chartData: ChartDataSets[] = [{ data: [], label: 'Number of Products' }];
  chartLabels: Label[] = [];
  chartType: ChartType = 'bar';
  chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          precision: 0
        }
      }]
    }
  };

  constructor(private productService: ProductService,
              private SubCategoryService: SubCategoryService,
              private cs : CookiesService) {
    this.jwt = cs.getCookieJWT().toString();
  }

  ngOnInit() {
    // First fetch all subcategories
    this.SubCategoryService.GetAllSubCategories(this.jwt).subscribe(subcategories => {
      this.subcategories = subcategories;

      // Loop through each subcategory and fetch its products
      this.subcategories.forEach((subcategory, index) => {
        this.productService.GetProductBySubCategroy(subcategory.idSubCategory,this.jwt).subscribe(products => {
          this.subcategories[index].products = products;
          // Update chart data and labels after all products have been fetched
          if (index === this.subcategories.length - 1) {
            this.chartData[0].data = this.subcategories.map(subcategory => subcategory.products.length);
            this.chartLabels = this.subcategories.map(subcategory => subcategory.name);
          }
        });
      });
    });

  }
}
