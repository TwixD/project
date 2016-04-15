/**
 * Created by juandavidcatano on 4/04/16.
 */
import {Injectable} from "angular2/core";
import {SqlStorage, Storage} from 'ionic-angular';
import {Logger} from '../logger/logger.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class Builder {

    private _modules: Array<string> = new Array<string>();
    storage : Storage;

      static get parameters() {
        return [[Logger]]
      }

    constructor(private _logger) {
        this.storage = new Storage(SqlStorage);
    }

    buildModel(obj: Object) {

        this._logger.warn("Building model");
        //Eliminate table config
        this.storage.query('DROP TABLE config');
        this.storage.query('DROP TABLE fields');

        let createConfigStatement = `CREATE TABLE IF NOT EXISTS config
                        (
                        id INTEGER PRIMARY KEY,
                        name TEXT,
                        menu_visible INTEGER,
                        table_name TEXT,
                        label TEXT,
                        module_icon TEXT
                        )`;

        this.storage.query(createConfigStatement).then((data) => {

            this._logger.log("SQLite : TABLE config CREATED");
            let createFieldsStatement = `CREATE TABLE IF NOT EXISTS fields
                                        (
                                           id INTEGER PRIMARY KEY AUTOINCREMENT,
                                           dbtype TEXT,
                                           editable INTEGER,
                                           label TEXT,
                                           name TEXT,
                                           type TEXT,
                                           visible INTEGER,
                                           parent INTEGER
                                        )`;

            this.storage.query(createFieldsStatement).then((data) => { 

                this._logger.log("SQLite : TABLE fields CREATED");
                let count: number = 1;
                this._modules.length = 0;

                if  (Object.keys(obj).length > 0) {
                    for (let module in obj ) {      
                        this._modules.push(module);
                        let insertStatement = `INSERT INTO config 
                                                (id, 
                                                name, 
                                                menu_visible,
                                                table_name,
                                                label,
                                                module_icon
                                                )VALUES(
                                                `+ count +`, 
                                                '`+ obj[module]['name']+`',
                                                1,
                                                '`+ obj[module]['table_name']+`',
                                                '`+ obj[module]['label']+`',
                                                '`+ obj[module]['module_icon']+`')`;

                        this.storage.query(insertStatement).then((data) => {
                            //Insert correct, now will create fields
                            this._logger.log("SQLite : INSERT "+obj[module]['table_name']+" ON TABLE config SUCCESS");
                            
                             if ('fields' in obj[module]){
                                
                                for (let key in obj[module]['fields']){

                                    let insertFieldStatement = `INSERT INTO fields 
                                                (dbtype, 
                                                 editable, 
                                                 label,
                                                 name,
                                                 type,
                                                 visible,
                                                 parent
                                                )VALUES(
                                                '`+ obj[module]['fields'][key]['dbType'] +`',
                                                1,
                                                '`+ obj[module]['fields'][key]['label'] +`',
                                                '`+ obj[module]['fields'][key]['name'] +`',
                                                '`+ obj[module]['fields'][key]['type'] +`',
                                                1,
                                                `+ count +`)`;
                                    
                                    this.storage.query(insertFieldStatement).then((data) => {
                                        this._logger.log("|--SQLite : PARENT "+obj[module]['table_name']+" INSERT " + obj[module]['fields'][key]['name'] + " ON TABLE fields SUCCESS");
                                    }, (error) => {
                                        this._logger.error("|-- SQLite : INSERT " + obj[module]['fields'][key]['name'] + " ON TABLE fields FAILED [" + error.err.message + "]");
                                    });

                                }

                            }

                        }, (error) => {
                            this._logger.error("SQLite : INSERT " + obj[module]['table_name'] + " ON TABLE config FAILED [" + error.err.message + "]");
                        });
                        count++;
                    };
                }

            },(error) => {
                this._logger.log("SQLite : ERROR CREATING TABLE fields [" + error.err.message + "]");
            });


        }, (error) => {
            this._logger.log("SQLite : ERROR CREATING TABLE config [" + error.err.message + "]");
        });
       
    }

    buildTables(): boolean {
        this._logger.warn("Building Tables");

        this.storage.query("SELECT * FROM config").then((config) => {

            if(config.res.rows.length > 0){

                console.log(config.res.rows);

                console.log(config);

            }else{
                this._logger.log("No tables in model");
                return false;
            }

        }, (error) => {
            this._logger.log("SQLite : ERROR CONSULTING TABLE config [" + error.err.message + "]");
            return false;
        });
        return true;
    }

    getModules() {
        return this._modules;
    }

}