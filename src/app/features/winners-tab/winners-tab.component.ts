import { Component, Input, OnInit } from '@angular/core';
import { Winner } from '../../_services/wordpress-api.service';

@Component({
  selector: 'app-winners-tab',
  templateUrl: './winners-tab.component.html',
  styleUrls: ['./winners-tab.component.scss']
})
export class WinnersTabComponent implements OnInit {
  @Input() winners: Winner[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
