import {Page,MenuController} from 'ionic-angular';
import {DashBoard} from '../dashboard/dashboard';

@Page({
  template: `<ion-content>Menu</ion-content>`
})
export class Menu {
  rootPage : any;
  constructor(private menu: MenuController) {
    this.menu = menu;
    this.rootPage = DashBoard;
  }

}