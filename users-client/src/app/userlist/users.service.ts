import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: any[] = [];

  constructor( private _http: HttpClient ) { 
    this.fetchUsers();
  }

  fetchUsers(): void{
    this._http.get( "/api/users/" )
      .subscribe( (data:any) => {
        this.users = data;
        console.log( this.users );
      });
  }

  getAllUsers(): any{
    return  this._http.get( "/api/users/" );
  }

  createUser( newUser: any ): void {
    this._http.post( "/api/users/", newUser )
      .subscribe( (data: any) => {
        this.fetchUsers();
      });
  }

  createAndReturnUser( newUser: any ) {
    return  this._http.post( "/api/users/", newUser );
  }

  loginUser( currentUser: any ){
    console.log( currentUser );
    return  this._http.post( "/api/users/login", currentUser );
  }

  validateUser(): any {
    return this._http.get( "/api/users/validate" );
  }

  logoutUser(): any {
    return this._http.get( '/api/users/logout' );
  }
}
