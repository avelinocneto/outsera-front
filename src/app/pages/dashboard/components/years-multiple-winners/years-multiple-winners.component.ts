import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MoviesService } from '../../../../services/movies.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-years-multiple-winners',
  templateUrl: './years-multiple-winners.component.html',
  styleUrls: ['./years-multiple-winners.component.scss', '../../../../../styles.scss'],
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule
  ]
})
export class YearsMultipleWinnersComponent implements OnInit {
  displayedColumns: string[] = ['year', 'winnerCount'];
  dataSource = new MatTableDataSource<any>();

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.loadYearsMultipleWinners();
  }

  loadYearsMultipleWinners(): void {
    this.moviesService.getYearsMultipleWinners().subscribe(response => {
      this.dataSource.data = response.years;
    });
  }
}