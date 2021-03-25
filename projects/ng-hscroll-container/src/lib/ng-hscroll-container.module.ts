import { NgModule } from '@angular/core';
import { NgHscrollContainerComponent } from './ng-hscroll-container.component';
import { BrowserModule } from '@angular/platform-browser';
import { ObserversModule } from '@angular/cdk/observers';

@NgModule({
  declarations: [NgHscrollContainerComponent],
  imports: [
    BrowserModule,
    ObserversModule
  ],
  exports: [NgHscrollContainerComponent]
})
export class NgHscrollContainerModule { }
