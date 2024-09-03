import { Component, OnInit } from '@angular/core';
import { WordpressApiService, BackendPage } from '../../_services/wordpress-api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  backendPage: BackendPage;
  pageObservable: Observable<any>;
  constructor(private wordpress: WordpressApiService) { }

  ngAfterViewInit() {
/*     const els = document.querySelectorAll('.wp-group, .wp-group .alignfull');
    for (let index = 0; index < els.length; index++) {
      (els[index] as HTMLElement).style.marginTop = "0";
      (els[index] as HTMLElement).style.marginBottom = "0";
      (els[index] as HTMLElement).style.paddingTop = "var(--wp--preset--spacing--50)";
      (els[index] as HTMLElement).style.paddingRight = "var(--wp--preset--spacing--50)";
      (els[index] as HTMLElement).style.paddingBottom = "var(--wp--preset--spacing--50)";
      (els[index] as HTMLElement).style.paddingLeft = "var(--wp--preset--spacing--50)";
    }*/

    const el = document.querySelectorAll('h2.wp-block-heading.alignwide.has-base-color.has-text-color.has-link-color.wp-elements-c9b5699bdecff18878afa112249018b5');
    for (let index = 0; index < el.length; index++) {
      (el[index] as HTMLElement).style.minHeight = "100px;";
      (el[index] as HTMLElement).style.letterSpacing = "-0.02em;";
    }

    const eljc = document.querySelectorAll('.is-content-justification-center');
    for (let index = 0; index < eljc.length; index++) {
      (eljc[index] as HTMLElement).style.justifyContent = "center";
      (eljc[index] as HTMLElement).style.paddingTop = "1em";
    }
  }

  ngOnInit(): void {
    this.getPage();
/*     window.addEventListener("scroll", () => {
      firstSectionScroll();
    });

    function firstSectionScroll() {
      var y = window.screenY;
      if (y > 10) {
        var section = document.getElementsByClassName('about-section')[0];
        section.classList.add('');
      } else if (y < 10) {
        var section = document.getElementsByClassName('about-section')[0];
      }
    } */
  }

  getPage() {
    this.wordpress.getSinglePage(10).subscribe(
      (data) => {
        this.backendPage = data;
      }
    );
  }
}
