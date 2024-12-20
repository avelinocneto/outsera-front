import { Component } from '@angular/core';
import { ProducersWinsIntervalComponent } from './components/producers-wins-interval/producers-wins-interval.component';
import { YearsMultipleWinnersComponent } from './components/years-multiple-winners/years-multiple-winners.component';
import { Top3StudiosComponent } from './components/top3-studios/top3-studios.component';
import { MovieWinnersByYearComponent } from './components/movie-winners-by-year/movie-winners-by-year.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    ProducersWinsIntervalComponent, 
    YearsMultipleWinnersComponent,
    Top3StudiosComponent,
    MovieWinnersByYearComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
