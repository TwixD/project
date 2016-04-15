import 'es6-shim';
import {App,IonicApp,Platform,SqlStorage, Storage} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HTTP_PROVIDERS,JSONP_PROVIDERS} from 'angular2/http';
import {Sync} from './core/sync/sync.service';
import {Logger} from './core/logger/logger.service';
import {Builder} from './core/builder/builder.service';
import {Connectivity} from './core/connectivity/connectivity';
import {Language} from './core/language/Language';
import {Menu} from './pages/menu/menu';
import {TutorialPage} from './pages/tutorial/tutorial';
import {FormBuilder} from 'angular2/common';
import {ServerData} from './pages/server-data/server-data';


@App({
  templateUrl: 'build/app.html',
  config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
  providers: [
        HTTP_PROVIDERS,
        JSONP_PROVIDERS,
        Sync,
        Logger,
        Builder,
        Connectivity,
        Language,
        FormBuilder
    ]
})
export class CoreApp {

  root : any;
  storage : Storage;

  constructor(
              private app: IonicApp,
              platform: Platform,
              private _logger : Logger,
              private _builder : Builder,
              private _connectivity : Connectivity,
              private _language: Language,
              private _sync: Sync,
              private _fb: FormBuilder) {

    platform.ready().then(() => {
      StatusBar.styleDefault();
    });
    this.app = app;
    this.storage = new Storage(SqlStorage);

  }


  ngAfterViewInit() {
    let nav = this.app.getComponent('nav');
    this._logger.log("Loading config...");
    this.storage.query("SELECT count(*) AS EXIST FROM sqlite_master WHERE type='table' AND name='config'").then((data) => {

        if (data.res.rows[0]['EXIST'] == 1){
            //Exist table config
            this.storage.query("SELECT * FROM config").then((config) => {

            //Reconfiguring the app
            if(config.res.rows.length === 0){
              this._logger.log("Reconfiguring");
              //No Exists table config, start tutorial & config
              nav.push(ServerData);
            }else{
              //App Ready!
              this._logger.log("App ready to run!");
              nav.push(ServerData);

            }

           }, (error) => {
              //Put Alert < ---
              console.log("ERROR -> " + JSON.stringify(error.err));
          });
        } else if (data.res.rows[0]['EXIST'] == 0 ){
          //No Exists table config, start tutorial & config
          this._logger.log("Initial Config");
          nav.push(ServerData);
        }

    },(error) => {
        this._logger.error( JSON.stringify(error.err) );
    });

  }


}
