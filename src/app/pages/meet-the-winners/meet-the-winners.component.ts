import { Component, OnInit } from '@angular/core';
import { WordpressApiService } from 'src/app/_services/wordpress-api.service';

@Component({
  selector: 'app-meet-the-winners',
  templateUrl: './meet-the-winners.component.html',
  styleUrls: ['./meet-the-winners.component.scss']
})
export class MeetTheWinnersComponent implements OnInit {
  backendPage: any;

  constructor(private wordpress: WordpressApiService) { }

  ngOnInit(): void {
    this.getPage();
  }

  getPage() {
    this.wordpress.getSinglePage(69).subscribe(
      (data: Array<object>) => {
        this.backendPage = data;
      }
    )
  }
}
