import { Component, OnInit } from '@angular/core';
import { BackendPage, Winner, WordpressApiService } from 'src/app/_services/wordpress-api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const currentYear = new Date().getFullYear().toString();
@Component({
  selector: 'app-meet-the-winners',
  templateUrl: './meet-the-winners.component.html',
  styleUrls: ['./meet-the-winners.component.scss']
})
export class MeetTheWinnersComponent implements OnInit {
  pageObservable: Observable<any>;
  backendPage: BackendPage;
  winners: Winner[] = [];
  years: string[] = ["2024/2025"];
  activeYear: string | null = "2024/2025";
  winnersByYear: {[year: string]: Winner[] } = {}
  tabLinks = document.querySelectorAll('.tab-link');
  tabContent: HTMLElement[] = [];
  winnersResponse: any[] = [];
  prop:any
  organizedData:any

  constructor(private wordpress: WordpressApiService) { }

  ngOnInit(): void {
    //this.setActiveYear(this.activeYear);
    //this.getSingleWinner(47);
    this.getWinners(this.activeYear);
    this.organizedData;
    this.keys();
    this.getPage();
        // Add event listeners to tab links
        //this.tabLinks.forEach(tab => {
        //  tab.addEventListener('click', this.openTab);
        //});
    
        // Activate the first tab by default
        //this.openTab({ currentTarget: document.querySelector('.tab-link:first-child') });
    
    // Populate tabContent with elements and add data-year attributes
    this.tabContent = Array.from(document.querySelectorAll('.tab-content'));
    this.tabContent.forEach((tab, index) => {
      tab.setAttribute('data-year', String(this.years[index]));
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
      }
    )
  }

  getWinners(year: string): Winner {
    this.wordpress.getWinnersByYear(year).subscribe(data => {
      this.winners = data;
      this.organizedData = this.organizeWinnersByYear(data);
/*       for (let key in data) {
          if(data.hasOwnProperty(key)){
            this.winners.push(data[key]);
          }
      } */
    })
    return this.organizedData;
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

  openTab(event: any): void {
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
    const year = event.currentTarget.dataset.year; // Use Number to convert to number
    
    // Update active year and fetch winners
    this.setActiveYear(year);
  }

  onTabClick(year: string): void {
    this.activeYear = year;
  }

  setActiveYear(year: string): void {
    this.activeYear = year;
  }

  organizeWinnersByYear(dataToBeOrganized: Winner[]): Winner {
    const organizedData: any = {};
    //this.years.push(currentYear);
    for(const item of Object.values(dataToBeOrganized)) {
      const year = item.acf.chasinggood_winner_year;
      if (!this.winnersByYear[year]) {
        this.winnersByYear;
      }

      if(!this.years.includes(year)){
        this.years.push(year);
      }
      
      if (!organizedData[year]) {
        organizedData[year] = [];
      }
      
      organizedData[year].push(item);
    }

    return organizedData;
/*     dataToBeOrganized.forEach(winner => {
      console.log("Winners: ", winner)
      


      let yearArray = []
      yearArray.push(this.winnersByYear[year] = [winner])
      console.log("By Year: ", yearArray);
    }) */
  }

  keys(): Array<string> { 
    return Object.keys(this.winnersByYear);
  } 
}


