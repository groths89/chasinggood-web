import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnersTabComponent } from '../../../../src/app/features/winners-tab/winners-tab.component';

describe('WinnersTabComponent', () => {
  let component: WinnersTabComponent;
  let fixture: ComponentFixture<WinnersTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WinnersTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WinnersTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
