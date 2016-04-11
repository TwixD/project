/**
 * Created by juandavidcatano on 6/04/16.
 */
import {Page, NavController, NavParams,Alert} from 'ionic-angular';
import {Logger} from '../../core/logger/logger.service';
import {LanguageCore} from  '../../core/language/LanguageCore';
import {Sync} from '../../core/sync/sync.service';
import {Builder} from '../../core/builder/builder.service';
import { FORM_DIRECTIVES, FormBuilder,  ControlGroup, Validators, AbstractControl } from 'angular2/common';

@Page({
    templateUrl : 'build/pages/server-data/server-data.html',
    directives: [FORM_DIRECTIVES]
})
export class ServerData{
   
    model : any;
    info : any;
    authForm: ControlGroup;
    server_url : AbstractControl;
    user : AbstractControl;
    password: AbstractControl;
    alert : any;

    constructor(
                private _language: LanguageCore,
                private nav: NavController,
                navParams: NavParams,
                private _builder: Builder,
                private _sync: Sync,
                private _logger : Logger,
                fb: FormBuilder
    ) {
        console.log("loaded");
        this.nav = nav;
        this.info = _language.getLang()['server-data'];

        this.authForm = fb.group({
            'server_url': ['', Validators.compose([Validators.required])],
            'user': ['', Validators.compose([Validators.required])],
            'password': ['', Validators.compose([Validators.required])]
        });

        this.server_url = this.authForm.controls['server_url'];
        this.user = this.authForm.controls['user'];
        this.password = this.authForm.controls['password'];

            //TESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTEST
            this._sync.getModel( 'http://dev.opalo.com.co/MobileAppMockData/model.php',null)
                      .subscribe(
                        res => {
                                this._logger.log("Request success");
                                this._builder.buildModel(res);
                            
                            },
                        err => {
                                this._logger.error("Request fail");
                            }
                        );
            //TESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTEST
    }

    loading() {
         this.alert = Alert.create({
          title: this.info['alert']['title'],
          enableBackdropDismiss : false,
          subTitle: this.info['alert']['message']
        });
        this.nav.present(this.alert);
    }

    onSubmit(value: Object): void {
        if(this.authForm.valid) {

            this.loading();
            this._sync.getModel( value['server_url'] , [ {user : value['user']},{password : value['password']}] )
                      .subscribe(
                        res => {
                                this._logger.log("Request success");
                                this._builder.buildModel(res);
                                this.alert.dismiss();
                            },
                        err => {
                                this._logger.error("Request fail");
                                this.alert.dismiss();
                            }
                        );
        }
    }
    
}