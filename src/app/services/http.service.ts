import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, retry, catchError } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  
  baseUrl = "http://localhost:3000/api/";


  get = (endPoint: string) => {
		const url = `${this.baseUrl + endPoint}`;
		return this.http.get(url).pipe(
			map((resp) => resp),
			retry(2),
			catchError(this.handleError)
		);
  };
  
  post = (endPoint: string, body: any) => {
		const url = `${this.baseUrl + endPoint}`;
		return this.http.post(url, body, {}).pipe(
			map((resp) => resp),
			retry(1),
			catchError(this.handleError)
		);
  };
  
  put = (endPoint: string, body: any) => {
		const url = `${this.baseUrl + endPoint}`;
		return this.http.put(url, body).pipe(
			map((resp) => resp),
			retry(1),
			catchError(this.handleError)
		);
  };

  delete = (endPoint: string) => {
		const url = `${this.baseUrl + endPoint}`;
		return this.http.delete(url).pipe(
			map((resp) => resp),
			retry(2),
			catchError(this.handleError)
		);
  };

  handleError(error) {
		let errorMessage = "";
		if (error.error instanceof ErrorEvent) {
			errorMessage = `Error: ${error.error.message}`;
		} else {
			errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
		}
		console.log(errorMessage);
		return throwError(errorMessage);
	}

}
