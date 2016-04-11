/**
 * Created by juandavidcatano on 4/04/16.
 */
import {Injectable} from "angular2/core";

@Injectable()
export class Connectivity{

    constructor(){}

    getConnectionStatus() {

        document.addEventListener("deviceready", function () {
            //var networkState = navigator.connection.type;
            //console.log(networkState);
            // work only on device
        }, false);

        return true;
    }

}