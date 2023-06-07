import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Constants } from "src/app/models/constants";

@Injectable({
    providedIn:'root'
})

export class InterviewService {

    constructor ( private http: HttpClient){}

    submitForm(formData:Object,URL:String){
        const url = Constants.BASE_URL + URL ;
        return this.http.put(url, formData);
    }

    get(URL:string){
        const url = Constants.BASE_URL + URL ;
        return this.http.get(url);
    }
} 