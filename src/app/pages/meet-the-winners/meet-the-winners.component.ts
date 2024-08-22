import { Component, OnInit } from '@angular/core';
import { BackendPage, Winner, WordpressApiService } from 'src/app/_services/wordpress-api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-meet-the-winners',
  templateUrl: './meet-the-winners.component.html',
  styleUrls: ['./meet-the-winners.component.scss']
})
export class MeetTheWinnersComponent implements OnInit {
  pageObservable: Observable<any>;
  backendPage: BackendPage;
  winners: Winner[] = [];
  years: number[] = [2024, 2023, 2022];
  activeYear: number = 2024;
  tabLinks = document.querySelectorAll('.tab-link');
  tabContent: HTMLElement[] = [];

  constructor(private wordpress: WordpressApiService) { }

  ngOnInit(): void {
    this.setActiveYear(this.activeYear);
    //this.getSingleWinner(47);
    this.getPage();
    this.getPosts();
    
        // Add event listeners to tab links
        this.tabLinks.forEach(tab => {
          tab.addEventListener('click', this.openTab);
        });
    
        // Activate the first tab by default
        this.openTab({ currentTarget: document.querySelector('.tab-link:first-child') });
    
        // Populate tabContent with elements and add data-year attributes
        this.tabContent = Array.from(document.querySelectorAll('.tab-content'));
        this.tabContent.forEach((tab, index) => {
          tab.setAttribute('data-year', this.years[index].toString());
        });
    // Add event listeners to tab links
    //this.tabLinks.forEach(tab => {
    //  tab.addEventListener('click', this.openTab);
    //});

    // Activate the first tab by default
    //this.openTab({ currentTarget: document.querySelector('.tab-link:first-child') });
  }

  getSingleWinner(winnerId: number) {
    this.wordpress.getSingleWinner(winnerId).subscribe(
      (data) => {
        console.log(data);
      }
    )
  }

  getWinners(year: number) {
    this.wordpress.getWinnersByYear(year).subscribe(data => {
        for (let key in data) {
          if(data.hasOwnProperty(key)){
            this.winners.push(data[key]);
          }
      }
    })

    console.log(this.winners);
  }

  getPage() {
    this.wordpress.getSinglePage(69).subscribe(
      (data) => {
        this.backendPage = data;
      }
    );
  }

  getPosts() {
    this.wordpress.getPosts().subscribe(data => {
      (data: any) => {
        this.backendPage = data;
      }
    })
  }

  openTab(event: any) {
/*     // Remove active class from all tab links
    this.tabLinks.forEach(tab => tab.classList.remove('active'));

    // Add active class to clicked tab link
    event.currentTarget.classList.add('active');

    // Get the year from the clicked tab
    const tabName = event.currentTarget.dataset.year;

    // Hide all tab content
    this.tabContent.forEach(tab => tab.classList.remove('active'));

    // Show the content for the clicked tab
    document.getElementById('tab-' + tabName).classList.add('active'); */
    
     // Extract year from clicked tab
    const year = Number(event.currentTarget.dataset.year); // Use Number to convert to number
    
    // Update active year and fetch winners
    this.setActiveYear(year);
    this.getWinners(year);
  }

  setActiveYear(year: number) {
    this.activeYear = year;
  }
}


