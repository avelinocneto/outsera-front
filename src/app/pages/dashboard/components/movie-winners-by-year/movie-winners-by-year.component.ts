import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MoviesService } from '../../../../services/movies.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-winners-by-year',
  templateUrl: './movie-winners-by-year.component.html',
  styleUrls: ['./movie-winners-by-year.component.scss', '../../../../../styles.scss'],
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule
  ]
})
export class MovieWinnersByYearComponent implements OnInit {
  displayedColumns: string[] = ['id', 'year', 'title', 'studios', 'producers', 'winner'];
  dataSource = new MatTableDataSource<any>();
  searchYear!: number | undefined;

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
  }

  searchMovies(): void {
    if (this.searchYear) {
      this.moviesService.getMovieWinnersByYear(this.searchYear).subscribe(response => {
        this.dataSource.data = response;
      });
    }
  }
}