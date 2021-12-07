import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'users-client';
  greeting: string = "Hello there!";

  test(): void{
    console.log( "This is in the app.component" );
  }
}
