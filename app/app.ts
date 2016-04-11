import 'es6-shim';
import {App,Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {Bootstrap} from './core/bootstrap/bootstrap';
import {HTTP_PROVIDERS,JSONP_PROVIDERS} from 'angular2/http';
import {Sync} from './core/sync/sync.service';
import {Logger} from './core/logger/logger.service';
import {Builder} from './core/builder/builder.service';
import {Connectivity} from './core/connectivity/connectivity';
import {LanguageCore} from './core/language/LanguageCore';

@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
  providers: [
        HTTP_PROVIDERS,
        JSONP_PROVIDERS,
        Sync,
        Logger,
        Builder,
        Connectivity,
        LanguageCore
    ]
})
export class MyApp {

  rootPage : any = Bootstrap;
  constructor(platform: Platform,
              private _logger : Logger,
              private _builder : Builder,
              private _connectivity : Connectivity,
              private _language: LanguageCore,
              private _sync: Sync) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });

  }

}
