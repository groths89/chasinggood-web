import { Component, Input, OnInit } from '@angular/core';
import { BackendPage, Winner, WordpressApiService } from '../../_services/wordpress-api.service';

@Component({
  selector: 'app-winners-tab',
  templateUrl: './winners-tab.component.html',
  styleUrls: ['./winners-tab.component.scss']
})
export class WinnersTabComponent implements OnInit {
  @Input() backendPage: BackendPage;
  @Input() currentYear: any;
  @Input() keys: string[];
  @Input() activeYear: string | null = "2024/2025";
  @Input() winners: Winner[] = [];
  @Input() winnersByYear: {[year: string]: any } = {};
  @Input() organizedData: any;

  constructor(private wordpress: WordpressApiService) { }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
    this.getPage();
  }

  getPage() {
    this.wordpress.getSinglePage(69).subscribe(
      (data) => {
        this.backendPage = data;
      }
    );
  }

}
