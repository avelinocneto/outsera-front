import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private apiUrl = 'https://localhost:5001/api/movies';

  constructor(private http: HttpClient) { }

  getMovies(page: number, size: number, winner: boolean | null, year: number | null): Observable<any> {
    let url = `${this.apiUrl}?page=${page}&size=${size}`;
    if (winner !== null) {
      url += `&winner=${winner}`;
    }
    if (year !== null) {
      url += `&year=${year}`;
    }
    return this.http.get<any>(url);
  }

  getProducersWinsInterval(): Observable<any> {
    const url = `${this.apiUrl}?projection=max-min-win-interval-for-producers`;
    return this.http.get<any>(url);
  }

  getYearsMultipleWinners(): Observable<any> {
    const url = `${this.apiUrl}?projection=years-with-multiple-winners`;
    return this.http.get<any>(url);
  }

  getTop3Studios(): Observable<any> {
    const url = `${this.apiUrl}?projection=top3-studios`;
    return this.http.get<any>(url);
  }

  getMovieWinnersByYear(year: number): Observable<any> {
    const url = `${this.apiUrl}?winner=true&year=${year}`;
    return this.http.get<any>(url);
  }
}