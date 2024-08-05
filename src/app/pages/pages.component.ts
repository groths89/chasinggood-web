import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor(public _router: Router) { }

  ngAfterViewInit() {
    // const els = document.querySelectorAll('.alignfull');
    // for (let index = 0; index < els.length; index++) {
    //   (els[index] as HTMLElement).style.marginTop = "0";
    //   (els[index] as HTMLElement).style.marginBottom = "0";
    //   (els[index] as HTMLElement).style.paddingTop = "var(--wp--preset--spacing--50)";
    //   (els[index] as HTMLElement).style.paddingRight = "var(--wp--preset--spacing--50)";
    //   (els[index] as HTMLElement).style.paddingBottom = "var(--wp--preset--spacing--50)";
    //   (els[index] as HTMLElement).style.paddingLeft = "var(--wp--preset--spacing--50)";
    // }

    // const el = document.querySelectorAll('h2.wp-block-heading.alignwide.has-base-color.has-text-color.has-link-color.wp-elements-c9b5699bdecff18878afa112249018b5');
    // for (let index = 0; index < el.length; index++) {
    //   (el[index] as HTMLElement).style.minHeight = "100px;";
    //   (el[index] as HTMLElement).style.letterSpacing = "-0.02em;";
    // }

    // const eli = document.querySelectorAll('.is-nowrap.is-layout-flex');
    // for (let index = 0; index < eli.length; index++) {
    //   (eli[index] as HTMLElement).style.flexDirection = "column";
    //   (eli[index] as HTMLElement).style.flexWrap = "nowrap";
    // }

    console.log(document.querySelectorAll('.is-content-justification-center'));
    const eljc = document.querySelectorAll('.is-content-justification-center');
    for (let index = 0; index < eljc.length; index++) {
      (eljc[index] as HTMLElement).style.justifyContent = "center";
      (eljc[index] as HTMLElement).style.paddingTop = "1em";
    }
  }

  ngOnInit(): void {
  }

  onActivate(event: Event) {
    event.preventDefault;
    window.scroll(0,0);
  }
}
