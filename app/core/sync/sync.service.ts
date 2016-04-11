import {Logger} from '../logger/logger.service';
import {Injectable} from 'angular2/core';
import {Http,Jsonp,URLSearchParams, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';


@Injectable()
export class Sync {
    constructor (private http: Http,
                 private jsonp: Jsonp,
                 private _logger : Logger) {
    }
    // + "?" + params.map( key => Object.keys(key)[0]+'='+key[Object.keys(key)[0]]  ).join("&")    --.angular.2.aans0
    getModel( url : string , params : Array<Object> ) {
    	this._logger.log("Request to : " + url);
        return this.jsonp.request(url+'?callback=JSONP_CALLBACK')
            .map(res => res.json())
            .catch(this.handleError);
    }

    handleError(error) {
    	if(typeof(error) !== 'undefined'){
	        this._logger.error(error);
	        return Observable.throw(error.json().error || 'Server error');
    	}else{
    		this._logger.error("Error in the petition");
    	}
    }
}