import {Injectable} from "angular2/core";
import {ES_LANG} from "./es";
import {US_LANG} from "./us";

@Injectable()
export class Language{
    private lang : any;

    constructor(){
        this.lang = ES_LANG;
    }

    changeLanguage(){

    }

    getLang(){
        return this.lang;
    }
}