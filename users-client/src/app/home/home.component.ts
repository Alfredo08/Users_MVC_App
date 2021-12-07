import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../userlist/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allUsers: any[] = [];

  constructor(  private _usersService: UsersService, 
                private _router:Router,
                private _route:ActivatedRoute) { }

  ngOnInit(): void {
    let observable = this._usersService.validateUser();
    observable.subscribe( (data: any) => {
      console.log( data );
    },
    (error: any) =>{
      console.log( error.statusText );
      this._router.navigate( ['/login'] );
    })
    this.getUsers();
  }

  getUsers(): void {
    let observable = this._usersService.getAllUsers();
    observable.subscribe( (data: any) => {
      this.allUsers = data;
    });
  }

  logout(): void {
    let observable = this._usersService.logoutUser();

    observable.subscribe( (data: any) => {
      console.log( data );
      this._router.navigate( ['/login'] );
    });

  }

}
