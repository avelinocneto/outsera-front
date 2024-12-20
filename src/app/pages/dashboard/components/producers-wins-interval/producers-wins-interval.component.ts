import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MoviesService } from '../../../../services/movies.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-producers-wins-interval',
  templateUrl: './producers-wins-interval.component.html',
  styleUrls: ['./producers-wins-interval.component.scss', '../../../../../styles.scss'],
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule
  ]
})
export class ProducersWinsIntervalComponent implements OnInit {
  displayedColumns: string[] = ['producer', 'interval', 'previousWin', 'followingWin'];
  minDataSource = new MatTableDataSource<any>();
  maxDataSource = new MatTableDataSource<any>();

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.loadProducersWinsInterval();
  }

  loadProducersWinsInterval(): void {
    this.moviesService.getProducersWinsInterval().subscribe(response => {
      this.minDataSource.data = response.min;
      this.maxDataSource.data = response.max;
    });
  }
}