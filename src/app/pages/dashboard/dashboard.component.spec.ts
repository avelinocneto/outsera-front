import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { ProducersWinsIntervalComponent } from './components/producers-wins-interval/producers-wins-interval.component';
import { YearsMultipleWinnersComponent } from './components/years-multiple-winners/years-multiple-winners.component';
import { Top3StudiosComponent } from './components/top3-studios/top3-studios.component';
import { MovieWinnersByYearComponent } from './components/movie-winners-by-year/movie-winners-by-year.component';
import { CommonModule } from '@angular/common';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        ProducersWinsIntervalComponent,
        YearsMultipleWinnersComponent,
        Top3StudiosComponent,
        MovieWinnersByYearComponent
      ],
      imports: [CommonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load child components', () => {
    const producerComponent = fixture.debugElement.query(
      (de) => de.componentInstance instanceof ProducersWinsIntervalComponent
    );
    const yearComponent = fixture.debugElement.query(
      (de) => de.componentInstance instanceof YearsMultipleWinnersComponent
    );
    const top3Component = fixture.debugElement.query(
      (de) => de.componentInstance instanceof Top3StudiosComponent
    );
    const movieWinnersComponent = fixture.debugElement.query(
      (de) => de.componentInstance instanceof MovieWinnersByYearComponent
    );

    expect(producerComponent).toBeTruthy();
    expect(yearComponent).toBeTruthy();
    expect(top3Component).toBeTruthy();
    expect(movieWinnersComponent).toBeTruthy();
  });
});
