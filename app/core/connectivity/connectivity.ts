/**
 * Created by juandavidcatano on 4/04/16.
 */
import {Injectable} from "angular2/core";
import {Platform} from 'ionic-angular';

@Injectable()
export class Connectivity{

    constructor(private _platform: Platform){}

    getConnectionStatus() : string {
		this._platform.ready().then(() => { 
			let networkState = navigator.connection.type;
			let states = Object;
		    states['Connection.UNKNOWN']  = 'Unknown connection';
		  	states['Connection.ETHERNET'] = 'Ethernet connection';
		    states['Connection.WIFI']     = 'WiFi connection';
		    states['Connection.CELL_2G']  = 'Cell 2G connection';
			   states['Connection.CELL_3G']  = 'Cell 3G connection';
		    states['Connection.CELL_4G']  = 'Cell 4G connection';
		    states['Connection.CELL']     = 'Cell generic connection';
		    states['Connection.NONE']     = 'No network connection';
	        return states[networkState];
		});
		return 'Unknown connection';
    }

}