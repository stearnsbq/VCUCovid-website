import { ApiService } from './api.service';
import { Component, AfterViewInit, ElementRef, isDevMode, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
declare let ga: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})


export class AppComponent implements AfterViewInit, OnInit {
  title = 'vcu-covid-app';
  public totals: any
  public lastUpdated: string;
  public showModal: boolean;




  constructor(public api: ApiService, private elementRef: ElementRef, public meta: Meta, public router: Router) {
    this.showModal = false;

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
  }

  ngOnInit() {
    this.api.get("totals").subscribe(({data}) => {
      this.totals = data;
    })

    this.api.get("lastUpdated").subscribe(({data}) => {
      this.lastUpdated = data;
    })

  }

  ngAfterViewInit() {

    this.elementRef.nativeElement.ownerDocument.body.style[
      'background-image'
    ] = `url(${!isDevMode() ? 'vcucovid' : ''}/assets/bg${Math.floor(Math.random() * 8) + 1}.png)`;
  }
}
