import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Top3StudiosComponent } from './top3-studios.component';
import { MoviesService } from '../../../../services/movies.service';
import { of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

describe('Top3StudiosComponent', () => {
  let component: Top3StudiosComponent;
  let fixture: ComponentFixture<Top3StudiosComponent>;
  let moviesService: jasmine.SpyObj<MoviesService>;

  beforeEach(async () => {
    const moviesServiceSpy = jasmine.createSpyObj('MoviesService', ['getTop3Studios']);

    await TestBed.configureTestingModule({
      declarations: [Top3StudiosComponent],
      imports: [
        CommonModule,
        MatTableModule,
        MatCardModule
      ],
      providers: [
        { provide: MoviesService, useValue: moviesServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Top3StudiosComponent);
    component = fixture.componentInstance;
    moviesService = TestBed.inject(MoviesService) as jasmine.SpyObj<MoviesService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadTop3Studios on init and populate the dataSource', () => {
    const response = { studios: [{ name: 'Studio 1', winCount: 5 }, { name: 'Studio 2', winCount: 3 }, { name: 'Studio 3', winCount: 2 }] };
    moviesService.getTop3Studios.and.returnValue(of(response));

    component.ngOnInit();

    expect(moviesService.getTop3Studios).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual(response.studios);
  });

  it('should not populate dataSource if no response is received', () => {
    moviesService.getTop3Studios.and.returnValue(of({ studios: [] }));

    component.ngOnInit();

    expect(component.dataSource.data).toEqual([]);
  });

  it('should call moviesService.getTop3Studios when loadTop3Studios is called', () => {
    const response = { studios: [{ name: 'Studio 1', winCount: 5 }, { name: 'Studio 2', winCount: 3 }, { name: 'Studio 3', winCount: 2 }] };
    moviesService.getTop3Studios.and.returnValue(of(response));

    component.loadTop3Studios();

    expect(moviesService.getTop3Studios).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual(response.studios);
  });
});
