/**
 * Created by juandavidcatano on 6/04/16.
 */

import {Page, NavController, NavParams,Alert} from 'ionic-angular';
import {Logger} from '../../core/logger/logger.service';
import {Language} from  '../../core/language/Language';
import {Sync} from '../../core/sync/sync.service';
import {Builder} from '../../core/builder/builder.service';
import { FORM_DIRECTIVES, FormBuilder,  ControlGroup, Validators, AbstractControl } from 'angular2/common';
import {Menu} from '../menu/menu';
import {Connectivity} from '../../core/connectivity/connectivity';


@Page({
  templateUrl: 'build/pages/server-data/server-data.html',
  directives: [FORM_DIRECTIVES]
})
export class ServerData {

  infoServerData : any;
  infoConnectivity : any;
  authForm: ControlGroup;
  server_url : AbstractControl;
  user : AbstractControl;
  password: AbstractControl;
  alert : any;
  alert2 : any;

  static get parameters() {
    return [[NavController], [NavParams], [Language], [Sync], [Logger], [FormBuilder], [Connectivity], [Builder]]
  }

  constructor(
              private nav,
              private navParams,
              private _language,
              private _sync,
              private _logger,
              private _fb,
              private _connectivity,
              private _builder) {

        this.infoServerData = this._language.getLang()['server-data'];
        this.infoConnectivity = this._language.getLang()['connectivity'];

        this.authForm = _fb.group({
          'server_url': ['', Validators.compose([Validators.required])],
          'user': ['', Validators.compose([Validators.required])],
          'password': ['', Validators.compose([Validators.required])]
        });

        this.server_url = this.authForm.controls['server_url'];
        this.user = this.authForm.controls['user'];
        this.password = this.authForm.controls['password'];

    //TESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTEST
        this._sync.getModel('http://dev.opalo.com.co/MobileAppMockData/model.php',null) 
          .subscribe(
                    res => {
                      this._logger.log("Request success");
                      this._builder.buildModel(res);
                    },
                    err => {
                      this._logger.error("Request fail");
                    }
           );
    //TESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTEST

  }

  loading(title: string, subtitle: string) {
    this.alert = Alert.create({
      title: title,
          subTitle: subtitle,
          enableBackdropDismiss : false
        });
        this.nav.present(this.alert);
    }

    alertMessage(title : string, subtitle : string) {
        this.alert2 = Alert.create({
          title: title,
          subTitle: subtitle,
          enableBackdropDismiss : false,
          buttons: ['OK']
        });
        this.nav.present(this.alert2);
    }


    onSubmit(value: Object): void { 
        if(this.authForm.valid) {
            console.log("here");
            let connection = this._connectivity.getConnectionStatus();
            console.log("here");
            if( connection == 'No network connection'){
              this.alertMessage(this.infoConnectivity['alert']['title_no_connection'],this.infoConnectivity['alert']['description_no_connection']);
              return;
            }

            if( connection === 'Cell 2G connection' || connection === 'Cell 3G connection' || connection === 'Cell 4G connection' ){
              this.alertMessage(this.infoConnectivity['alert']['title_data_connection'],this.infoConnectivity['alert']['description_data_connection']);
            }

            this.loading(this.infoServerData['alert']['title'],this.infoServerData['alert']['message']);
            this._sync.getModel( value['server_url'] , [ {user : value['user']},{password : value['password']}] )
                .subscribe(
                    res => {
                      this._logger.log("Request success");
                      if( this._builder.buildModel(res) ){

                      }
                      this.alert.dismiss();
                    },
                    err => {
                        this.alert.dismiss();
                        this.alertMessage(this.infoServerData['alert']['title_error'],this.infoServerData['alert']['message_error']);
                        this._logger.error("Request fail");
                    }
                );
        }
    }

}