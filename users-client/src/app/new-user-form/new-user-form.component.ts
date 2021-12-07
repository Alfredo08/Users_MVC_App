import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../userlist/users.service';

@Component({
  selector: 'app-new-user-form',
  templateUrl: './new-user-form.component.html',
  styleUrls: ['./new-user-form.component.css']
})
export class NewUserFormComponent implements OnInit {
  //@Input() postUser: any;
  //@Input() allUsers: any[] = [];
  newUser: any;

  constructor( private _usersService: UsersService ,
               private _router:Router,
               private _route:ActivatedRoute) { }

  ngOnInit(): void {
    this.newUser = {
      firstName : "",
      lastName : "",
      password : "",
      userName : ""
    }
  }

  createNewUser( event: any ): void{
    event.preventDefault();

    this._usersService.createUser( this.newUser );
    this._router.navigate( ['/home'] );
  }

}
