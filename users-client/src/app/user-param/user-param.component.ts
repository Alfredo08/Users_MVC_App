import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-user-param',
  templateUrl: './user-param.component.html',
  styleUrls: ['./user-param.component.css']
})
export class UserParamComponent implements OnInit {

  constructor( private _route: ActivatedRoute,
               private _router: Router) { }

  ngOnInit(): void {
    this._route.params.subscribe( (params: any) => {
      console.log( params.username );
    });
  }

}
