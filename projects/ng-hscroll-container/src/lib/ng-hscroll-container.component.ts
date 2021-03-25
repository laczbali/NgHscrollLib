import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ng-hscroll-container',
  templateUrl: './ng-hscroll-container.component.html',
  styleUrls: ['./ng-hscroll-container.component.scss']
})
export class NgHscrollContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('hscroll container works');
  }

}
