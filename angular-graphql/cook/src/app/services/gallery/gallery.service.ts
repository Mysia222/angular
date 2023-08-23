import { Injectable } from '@angular/core';
import { Gallery } from '../../interfaces';
import {
  ADD_RECIPE,
  GET_INGREDIENTS,
  GET_RECIPES,
  UPLOAD_FILE,
} from '../../graphql/graphql.queries';
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
  converToImg(bufferData: any[]) {
    var arrayBufferView = new Uint8Array( bufferData );
    var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
    var urlCreator = window.URL || window.webkitURL;
    var imageUrl = urlCreator.createObjectURL( blob );
    return imageUrl;
  }

  getImage(imageId: string): any {
    try {
      return fetch(`${apiUrl}/${imageId}`, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((data) => {
            return this.converToImg(data.img.data.data);
        });
    } catch (error) {
      // TypeError: Failed to fetch
      console.log('There was an error', error);
      return error;
    }
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
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  }
}
