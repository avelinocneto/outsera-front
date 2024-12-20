import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducersWinsIntervalComponent } from './producers-wins-interval.component';

describe('ProducersWinsIntervalComponent', () => {
  let component: ProducersWinsIntervalComponent;
  let fixture: ComponentFixture<ProducersWinsIntervalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducersWinsIntervalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProducersWinsIntervalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
