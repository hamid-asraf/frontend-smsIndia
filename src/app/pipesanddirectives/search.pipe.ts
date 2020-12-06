import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "SearchPipe"
})
export class SearchPipe implements PipeTransform {
  transform(value: any, keys?: any, args?: any, remove?: any): any {
    if (!value) return null;
    if (!args) return value;

    if (typeof args !== "object" && args !== null) args = args.toLowerCase();

    return value.filter(function(item) {
      return JSON.stringify(keys.split(".").reduce((o, i) => o[i], item))
        .toLowerCase()
        .includes(args);
    });
  }
}
