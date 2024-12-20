import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YearsMultipleWinnersComponent } from './years-multiple-winners.component';
import { MoviesService } from '../../../../services/movies.service';
import { of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

describe('YearsMultipleWinnersComponent', () => {
  let component: YearsMultipleWinnersComponent;
  let fixture: ComponentFixture<YearsMultipleWinnersComponent>;
  let moviesService: jasmine.SpyObj<MoviesService>;

  beforeEach(async () => {
    const moviesServiceSpy = jasmine.createSpyObj('MoviesService', ['getYearsMultipleWinners']);

    await TestBed.configureTestingModule({
      declarations: [YearsMultipleWinnersComponent],
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

    fixture = TestBed.createComponent(YearsMultipleWinnersComponent);
    component = fixture.componentInstance;
    moviesService = TestBed.inject(MoviesService) as jasmine.SpyObj<MoviesService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadYearsMultipleWinners on init and populate the dataSource', () => {
    const response = { years: [{ year: 2020, winnerCount: 2 }, { year: 2021, winnerCount: 3 }] };
    moviesService.getYearsMultipleWinners.and.returnValue(of(response));

    component.ngOnInit();

    expect(moviesService.getYearsMultipleWinners).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual(response.years);
  });

  it('should not populate dataSource if no response is received', () => {
    moviesService.getYearsMultipleWinners.and.returnValue(of({ years: [] }));

    component.ngOnInit();

    expect(component.dataSource.data).toEqual([]);
  });

  it('should call moviesService.getYearsMultipleWinners when loadYearsMultipleWinners is called', () => {
    const response = { years: [{ year: 2020, winnerCount: 2 }, { year: 2021, winnerCount: 3 }] };
    moviesService.getYearsMultipleWinners.and.returnValue(of(response));

    component.loadYearsMultipleWinners();

    expect(moviesService.getYearsMultipleWinners).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual(response.years);
  });
});
