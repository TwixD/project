import {Page, NavController, MenuController} from 'ionic-angular';
import {Language} from '../../core/language/Language';
import {ServerData} from '../server-data/server-data';

@Page({
  templateUrl: 'build/pages/tutorial/tutorial.html'
})
export class TutorialPage {
  
  slides : any;
  infoTutorial : any;

  static get parameters() {
    return [[NavController], [MenuController], [Language]];
  }

  constructor(private nav, 
              private menu, 
              private _language) {

    this.nav = nav;
    this.menu = menu;
    this.infoTutorial = this._language.getLang()['tutorial'];

    this.slides = [
      {
        title: this.infoTutorial['title']+" <b>"+this.infoTutorial['app']+"</b>",
        description: this.infoTutorial['description'],
        image: "img/logo-opal.png"
      }
    ];

  }

  startApp() {
    this.nav.push(ServerData);
  }

  onPageDidEnter() {
    // the left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }


}
