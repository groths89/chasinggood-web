import { Component, Input, OnInit } from '@angular/core';
import { Winner } from '../../_services/wordpress-api.service';

@Component({
  selector: 'app-winners-tab',
  templateUrl: './winners-tab.component.html',
  styleUrls: ['./winners-tab.component.scss']
})
export class WinnersTabComponent implements OnInit {
  @Input() keys: string[];
  @Input() activeYear: number | null = 2024;
  @Input() winners: Winner[] = [];
  @Input() winnersByYear: {[year: number]: any } = {};
  @Input() organizedData: any;

  constructor() { }

  ngOnInit(): void {
    console.log("Winners By Year From Child: ", this.winnersByYear)
    console.log("Organized Data From Child: ", this.organizedData)
  }

}
