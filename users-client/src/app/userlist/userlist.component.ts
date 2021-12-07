import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from './users.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  allUsers: any[] = [];

  @Input() greeting: string = "";
  @Input() test: any;

  constructor( private _usersService: UsersService ) { }

  ngOnInit(): void {
    console.log( "We are inside the userlist component!" );
    this.test();
  }

  getUsers(): void {
    console.log( "We are going to fetch the user lists!" );
    this.allUsers = this._usersService.users;
    console.log( "Userlist component", this.allUsers );
  }

  postUser( newUser: any ): void {
    //this._usersService.createUser( newUser );
    let observable = this._usersService.createAndReturnUser( newUser );
    
    observable.subscribe( (data: any) => {
      this.allUsers.push( data );
    }); 
    
  }
}
