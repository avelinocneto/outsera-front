import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MoviesService } from '../../../../services/movies.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-top3-studios',
  templateUrl: './top3-studios.component.html',
  styleUrls: ['./top3-studios.component.scss', '../../../../../styles.scss'],
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule
  ]
})
export class Top3StudiosComponent implements OnInit {
  displayedColumns: string[] = ['name', 'winCount'];
  dataSource = new MatTableDataSource<any>();

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.loadTop3Studios();
  }

  loadTop3Studios(): void {
    this.moviesService.getTop3Studios().subscribe(response => {
      this.dataSource.data = response.studios;
    });
  }
}