import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MoviesService } from '../../services/movies.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'year', 'title', 'winner'];
  dataSource = new MatTableDataSource<any>();
  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;
  filterYear: string = '';
  filterWinner: string = '';

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(pageIndex: number = 0, pageSize: number = 10): void {
    const year = this.filterYear ? parseInt(this.filterYear, 10) : null;
    const winner = this.filterWinner ? this.filterWinner === 'true' : null;
    this.moviesService.getMovies(pageIndex, pageSize, winner, year).subscribe(response => {
      this.dataSource.data = response.content;
      this.totalElements = response.totalElements;
    });
  }

  applyFilter(): void {
    this.pageIndex = 0;
    this.loadMovies(this.pageIndex, this.pageSize);
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadMovies(this.pageIndex, this.pageSize);
  }
}