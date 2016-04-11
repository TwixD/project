/**
 * Created by juandavidcatano on 11/04/16.
 */

import {Page, SqlStorage, Storage, NavController} from 'ionic-angular';
import {ServerData} from '../../pages/server-data/server-data';
import {Connectivity} from '../connectivity/connectivity';
import {Logger} from '../logger/logger.service';

@Page({
    template: `
    <ion-navbar *navbar>
      <ion-title>CoreApp</ion-title>
    </ion-navbar>

    <ion-content>Opal Group</ion-content>`,
})
export class Bootstrap {
    
    nav : NavController;
    storage : any;
    
    constructor(nav: NavController,
                private _logger : Logger,
                private _connectivity : Connectivity){
        this.nav = nav;
        this.storage = new Storage(SqlStorage);
        this._logger.log("App Ready!");
        this.loadConfig();
    }

    loadConfig(){

        this._logger.log("Loading config...");
        this.storage.query('CREATE TABLE IF NOT EXISTS config (id INTEGER PRIMARY KEY,configured INTEGER)').then((data) => {

            this.storage.query("SELECT * FROM config").then((config) => {

                //First start of App
                if(config.res.rows.length === 0){

                    //Check connection internet
                    if(this._connectivity.getConnectionStatus()){
                        this._logger.log("Connected to internet");
                        this.nav.push(ServerData);
                    }else{
                        this._logger.warn("No connected to internet");
                    }

                }

            }, (error) => {
                console.log("ERROR -> " + JSON.stringify(error.err));
            });



        },(error) => {
            this._logger.error( JSON.stringify(error.err) );
        });

    }
    
}
