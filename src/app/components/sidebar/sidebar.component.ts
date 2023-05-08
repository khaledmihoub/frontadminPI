import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'design_app', class: '' },
    { path: '/user', title: 'Users',  icon:'users_single-02', class: '' },
    { path: '/product', title: 'Products',  icon:'users_single-02', class: '' },
    { path: '/post', title: 'Posts',  icon:'users_single-02', class: '' },
    { path: '/event', title: 'Event',  icon:'users_single-02', class: '' },
    { path: '/order', title: 'Order',  icon:'users_single-02', class: '' },
    { path: '/pot', title: 'Pot',  icon:'business_money-coins', class: '' },
    { path: '/claim', title: 'Claim',  icon:'files_paper', class: '' },
    { path: '/category', title: 'Category',  icon:'business_money-coins', class: '' },

];
export const ROUTESASS: RouteInfo[] = [
  { path: '/ass/product', title: 'Products',  icon:'users_single-02', class: '' },
  { path: '/ass/post', title: 'Posts',  icon:'users_single-02', class: '' },
  { path: '/ass/event', title: 'Event',  icon:'users_single-02', class: '' },
  { path: '/ass/order', title: 'Order',  icon:'users_single-02', class: '' },
  { path: '/ass/pot', title: 'Pot',  icon:'business_money-coins', class: '' },

];
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private ls: UserService) { }

  ngOnInit() {
    if (this.ls.isLoggedInAdmin()){
    this.menuItems = ROUTES.filter(menuItem => menuItem);

  }else if (this.ls.isLoggedInAss()){
    this.menuItems = ROUTESASS.filter(menuItem => menuItem);
  }
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
}
