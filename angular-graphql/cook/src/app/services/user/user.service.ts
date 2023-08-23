import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CREATE_USER, LOGIN_USER } from '../../graphql/graphql.queries';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apollo: Apollo) { }

  createUser(formData: any): any {
    return this.apollo.mutate({
      mutation: CREATE_USER,
      variables: {
        username : formData.username,
        email : formData.email,
        password : formData.password
      }
    });
  }

  logInUser(formData: any): any {
    return this.apollo.mutate({
      mutation: LOGIN_USER,
      variables: {
        email : formData.email,
        password : formData.password
      }
    });
  }
}
