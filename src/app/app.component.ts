import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tdot-mathe';
  windowWidth;

  ngOnInit(): void {
    this.windowWidth = window.innerWidth-100;
    console.log(this.windowWidth);
  }

}
