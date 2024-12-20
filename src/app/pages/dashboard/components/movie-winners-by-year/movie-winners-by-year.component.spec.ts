import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieWinnersByYearComponent } from './movie-winners-by-year.component';
import { MoviesService } from '../../../../services/movies.service';
import { of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

describe('MovieWinnersByYearComponent', () => {
  let component: MovieWinnersByYearComponent;
  let fixture: ComponentFixture<MovieWinnersByYearComponent>;
  let moviesService: jasmine.SpyObj<MoviesService>;

  beforeEach(async () => {
    const moviesServiceSpy = jasmine.createSpyObj('MoviesService', ['getMovieWinnersByYear']);

    await TestBed.configureTestingModule({
      declarations: [MovieWinnersByYearComponent],
      imports: [
        CommonModule,
        MatTableModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        FormsModule
      ],
      providers: [
        { provide: MoviesService, useValue: moviesServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieWinnersByYearComponent);
    component = fixture.componentInstance;
    moviesService = TestBed.inject(MoviesService) as jasmine.SpyObj<MoviesService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call searchMovies when searchYear is set and call moviesService.getMovieWinnersByYear', () => {
    const response = [{ id: 1, year: 2020, title: 'Movie 1', studios: 'Studio 1', producers: 'Producer 1', winner: true }];
    moviesService.getMovieWinnersByYear.and.returnValue(of(response));

    component.searchYear = 2020;
    component.searchMovies();

    expect(moviesService.getMovieWinnersByYear).toHaveBeenCalledWith(2020);
    expect(component.dataSource.data).toEqual(response);
  });

  it('should not call moviesService.getMovieWinnersByYear if searchYear is not set', () => {
    component.searchYear = undefined;
    component.searchMovies();

    expect(moviesService.getMovieWinnersByYear).not.toHaveBeenCalled();
  });

  it('should populate the MatTableDataSource with data', () => {
    const response = [{ id: 1, year: 2020, title: 'Movie 1', studios: 'Studio 1', producers: 'Producer 1', winner: true }];
    moviesService.getMovieWinnersByYear.and.returnValue(of(response));

    component.searchYear = 2020;
    component.searchMovies();

    expect(component.dataSource instanceof MatTableDataSource).toBe(true);
    expect(component.dataSource.data).toEqual(response);
  });
});
