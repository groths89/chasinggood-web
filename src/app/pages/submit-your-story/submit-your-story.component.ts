import { Component, OnInit, Input } from '@angular/core';
import { BackendPage, WordpressApiService } from 'src/app/_services/wordpress-api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-submit-your-story',
  templateUrl: './submit-your-story.component.html',
  styleUrls: ['./submit-your-story.component.scss']
})
export class SubmitYourStoryComponent implements OnInit {
  pageObservable: Observable<any>;
  backendPage: BackendPage;


  constructor(private wordpress: WordpressApiService) {

   }

   ngAfterViewInit() {
/*     const els = document.querySelectorAll('.alignfull');
    for (let index = 0; index < els.length; index++) {
      (els[index] as HTMLElement).style.marginTop = "0";
      (els[index] as HTMLElement).style.marginBottom = "0";
      (els[index] as HTMLElement).style.paddingTop = "var(--wp--preset--spacing--50)";
      (els[index] as HTMLElement).style.paddingRight = "var(--wp--preset--spacing--50)";
      (els[index] as HTMLElement).style.paddingBottom = "var(--wp--preset--spacing--50)";
      (els[index] as HTMLElement).style.paddingLeft = "var(--wp--preset--spacing--50)";
    }
*/
    const el = document.querySelectorAll('h2.wp-block-heading.alignwide.has-base-color.has-text-color.has-link-color.wp-elements-c9b5699bdecff18878afa112249018b5');
    for (let index = 0; index < el.length; index++) {
      (el[index] as HTMLElement).style.minHeight = "100px;";
      (el[index] as HTMLElement).style.letterSpacing = "-0.02em;";
    }

    const howItWorksCard = document.querySelectorAll('.how-it-works-card');
    for (let index = 0; index < howItWorksCard.length; index++) {
      (howItWorksCard[index] as HTMLElement).style.borderRadius = "15px";
      (howItWorksCard[index] as HTMLElement).style.marginTop = "var(--wp--preset--spacing--40)";
      (howItWorksCard[index] as HTMLElement).style.marginBottom = "var(--wp--preset--spacing--40)";
    }

    const spacer = document.querySelectorAll('.wp-block-spacer');
    for (let index = 0; index < spacer.length; index++) {
      (spacer[index] as HTMLElement).style.height = "100px";
    }
  }

  ngOnInit(): void {
    this.getPage();
  }

  getPage() {
    this.wordpress.getSinglePage(59).subscribe(
      (data) => {
        this.backendPage = data;
      }
    )
  }
}
