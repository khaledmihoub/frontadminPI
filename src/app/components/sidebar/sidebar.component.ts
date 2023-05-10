import { Component, OnInit } from '@angular/core';

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
    { path: '/delivery', title: 'Delivery',  icon:'shopping_delivery-fast', class: '' },
    { path: '/chat', title: 'Chat',  icon:'shopping_delivery-fast', class: '' },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
}
