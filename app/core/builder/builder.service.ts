/**
 * Created by juandavidcatano on 4/04/16.
 */
import {Injectable} from "angular2/core";

@Injectable()
export class Builder{

    constructor(){}

    buildModel(obj: Object){
    	if(Object.keys(obj).length > 0){
			console.log(obj);
    	}
    }
}