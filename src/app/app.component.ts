import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterState, Event } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AppConfig } from './app.config';
import { environment } from 'src/environments/environment';

declare const gtag: Function;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = 'Chasing Good';
  loadingDataImg: boolean = false;

  constructor(public _router: Router, private activatedRoute: ActivatedRoute, public config: AppConfig, private titleService: Title) {
      _router.events.subscribe(event => {
        this.navigationInterceptor(event);
      })

      this.grabTrackId();
  
      /** START : Code to Track Page View using gtag.js */
      this._router.events.pipe(
        filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
        gtag('event', 'page_view', {
          page_path: event.urlAfterRedirects
        })
      })
      /** END : Code to Track Page View  using gtag.js */  
  
      //Add dynamic title for selected pages - Start
      _router.events.subscribe(event => {
        if(event instanceof NavigationEnd) {
            var title = this.getTitle(_router.routerState, _router.routerState.root).join(' > ');
            titleService.setTitle(title);
          }
        });
      //Add dynamic title for selected pages - End
  }

  ngAfterViewInit() {
    const els = document.querySelectorAll('.alignfull');
    for (let index = 0; index < els.length; index++) {
      (els[index] as HTMLElement).style.marginTop = "0";
      (els[index] as HTMLElement).style.marginBottom = "0";
      (els[index] as HTMLElement).style.paddingTop = "var(--wp--preset--spacing--50)";
      (els[index] as HTMLElement).style.paddingRight = "var(--wp--preset--spacing--50)";
      (els[index] as HTMLElement).style.paddingBottom = "var(--wp--preset--spacing--50)";
      (els[index] as HTMLElement).style.paddingLeft = "var(--wp--preset--spacing--50)";
    }

    const el = document.querySelectorAll('h2.wp-block-heading.alignwide.has-base-color.has-text-color.has-link-color.wp-elements-c9b5699bdecff18878afa112249018b5');
    for (let index = 0; index < el.length; index++) {
      (el[index] as HTMLElement).style.minHeight = "100px;";
      (el[index] as HTMLElement).style.letterSpacing = "-0.02em;";
    }

    const eli = document.querySelectorAll('.is-nowrap.is-layout-flex');
    for (let index = 0; index < eli.length; index++) {
      (eli[index] as HTMLElement).style.flexDirection = "column";
      (eli[index] as HTMLElement).style.flexWrap = "nowrap";
    }

    const eljc = document.querySelectorAll('.is-content-justification-center');
    for (let index = 0; index < eljc.length; index++) {
      (eljc[index] as HTMLElement).style.justifyContent = "center";
      (eljc[index] as HTMLElement).style.paddingTop = "1em";
    }
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }
  
  onActivate(event: any) {
    event.preventDefault;
    window.scroll(0,0);
  }

  // collect that title data properties from all child routes
  // there might be a better way but this works for now
  getTitle(state: any, parent: any):any {
    var data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if(state && parent) {
      data.push(... this.getTitle(state, state.firstChild(parent)));
    }

    return data;
  }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: any): void {

    //Triggered When the navigation starts
      if (event instanceof NavigationStart) {
        this.loadingDataImg = true;
      }
    //Triggered When the navigation ends
      if (event instanceof NavigationEnd) {
        this.loadingDataImg = false;
      }
  
      // Set loading state to false in both of the below events to hide the spinner in case a request fails
      if (event instanceof NavigationCancel) {
        this.loadingDataImg = false;
      }
    //Triggered When the error occurrs while navigation
      if (event instanceof NavigationError) {
        this.loadingDataImg = false;
      }
    }

  grabTrackId() {
    //Read the value of the track id
    let gaTrackId = this.config.getConfig('trackId')

    //Add the custom script tag for the Google Analytics
    let customGtagScriptElem: HTMLScriptElement = document.createElement('script');
    customGtagScriptElem.async = true;
    customGtagScriptElem.src = 'https://www.googletagmanager.com/gtag/js?id='+ gaTrackId;
    
    //Add the custom script tag for gtag
    let customScriptElem: HTMLScriptElement = document.createElement('script');
    customScriptElem.append(`window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${environment.GA_TRACKING_ID}', { send_page_view: false });
    `)

    //Append the tags to the DOM
    document.head.prepend(customGtagScriptElem);
    document.head.appendChild(customScriptElem);
  }
}

