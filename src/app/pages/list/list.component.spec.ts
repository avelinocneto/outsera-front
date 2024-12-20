import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { MoviesService } from '../../services/movies.service';
import { of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let moviesService: jasmine.SpyObj<MoviesService>;

  beforeEach(async () => {
    const moviesServiceSpy = jasmine.createSpyObj('MoviesService', ['getMovies']);

    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        FormsModule
      ],
      providers: [
        { provide: MoviesService, useValue: moviesServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    moviesService = TestBed.inject(MoviesService) as jasmine.SpyObj<MoviesService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadMovies on init and populate the table', () => {
    const response = { content: [{ id: 1, year: 2020, title: 'Movie 1', winner: true }], totalElements: 1 };
    moviesService.getMovies.and.returnValue(of(response));

    component.ngOnInit();

    expect(moviesService.getMovies).toHaveBeenCalledWith(0, 10, null, null);
    expect(component.dataSource.data).toEqual(response.content);
    expect(component.totalElements).toBe(response.totalElements);
  });

  it('should apply filter and reload movies', () => {
    const response = { content: [{ id: 1, year: 2020, title: 'Movie 1', winner: true }], totalElements: 1 };
    moviesService.getMovies.and.returnValue(of(response));

    component.filterYear = '2020';
    component.filterWinner = 'true';
    component.applyFilter();

    expect(moviesService.getMovies).toHaveBeenCalledWith(0, 10, true, 2020);
    expect(component.dataSource.data).toEqual(response.content);
    expect(component.totalElements).toBe(response.totalElements);
  });

  it('should handle page change and call loadMovies with new page size and index', () => {
    const response = { content: [{ id: 1, year: 2020, title: 'Movie 1', winner: true }], totalElements: 1 };
    moviesService.getMovies.and.returnValue(of(response));

    const event: PageEvent = { pageIndex: 1, pageSize: 20, length: 1 };
    component.onPageChange(event);

    expect(moviesService.getMovies).toHaveBeenCalledWith(1, 20, null, null);
    expect(component.pageIndex).toBe(1);
    expect(component.pageSize).toBe(20);
    expect(component.dataSource.data).toEqual(response.content);
    expect(component.totalElements).toBe(response.totalElements);
  });
});
