import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:"trimString"
})

export class TrimStr implements PipeTransform{

    transform(value: any, ...args: any[]) {
        const count = args[0] || 200;
        const trimStr = value.slice(0,count) + ' ...';
        return trimStr
    }
}