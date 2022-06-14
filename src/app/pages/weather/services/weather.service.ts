import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coord, WeatherData } from '@app/shared/interfaces/weather.interface';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class WeatherService{

    private readonly API_URL = environment.apiOpenWeather.url;

    constructor(private readonly http: HttpClient){}
    
    public getWeatherByName(city: string): Observable<WeatherData>{
        //clase que setea los parametros que le paso a la url
        const params = new HttpParams()
        .set('q', city)
        
        return this.http.get<WeatherData>(`${this.API_URL}/weather`, {params: params});
    }

    public getWeatherByCoords(coord: Coord): Observable<WeatherData>{
        const params = new HttpParams()
        .set('lat', coord.latitude)
        .set('lon', coord.longitude)

        return this.http.get<WeatherData>(`${this.API_URL}/weather`, {params: params});
    }
}