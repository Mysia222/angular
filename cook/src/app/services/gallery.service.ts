import { Injectable } from '@angular/core';
import { Gallery } from '../interfaces';
import {
  ADD_RECIPE,
  GET_INGREDIENTS,
  GET_RECIPES,
  UPLOAD_FILE,
} from '../graphql/graphql.queries';
import { Apollo } from 'apollo-angular';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';

const apiUrl = 'http://localhost:3000/gallery';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  private galleries: Gallery[] = [];

  constructor(private apollo: Apollo, private http: HttpClient) {}

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  addGallery(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    const header = new HttpHeaders();
    const params = new HttpParams();

    const options = {
      params,
      reportProgress: true,
      headers: header,
    };
    
    return fetch(apiUrl, {
      method: 'POST',
      body: formData,
    })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    // const req = new HttpRequest('POST', apiUrl, formData, options);
    // return this.http.request(req);
  }
}
