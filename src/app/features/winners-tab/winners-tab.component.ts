import { Component, Input, OnInit } from '@angular/core';
import { Winner } from '../../_services/wordpress-api.service';

@Component({
  selector: 'app-winners-tab',
  templateUrl: './winners-tab.component.html',
  styleUrls: ['./winners-tab.component.scss']
})
export class WinnersTabComponent implements OnInit {
  @Input() currentYear: any;
  @Input() keys: string[];
  @Input() activeYear: number | null = 2024;
  @Input() winners: Winner[] = [];
  @Input() winnersByYear: {[year: number]: any } = {};
  @Input() organizedData: any;

  constructor() { }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
  }

}
