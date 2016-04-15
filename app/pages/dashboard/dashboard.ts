import {Page,NavController} from 'ionic-angular';

@Page({
  template: `
    <ion-content>Dashboard</ion-content>

    `
})
export class DashBoard {

  constructor(private nav: NavController) {
    this.nav = nav;
  }

}