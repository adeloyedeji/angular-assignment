import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  public baseURL: string = 'http://localhost/weather.php?command=';
  constructor(private httpClient: HttpClient) { }

  getCityWoeID(city: string) {
    if(city) {
      return new Promise((resolve, reject) => {
        this.httpClient.get(this.baseURL + 'search&keyword=' + city)
        .subscribe(resp => {
          resolve(resp);
        }, error => {
          reject(error);
        });
      });
    }
  }

  getLocationBasicInfo(woeID: number) {
    if(woeID) {
      return new Promise((resolve, reject) => {
        this.httpClient.get(this.baseURL + 'location&woeid=' + woeID)
        .subscribe(resp => {
          resolve(resp);
        }, error => {
          reject(error);
        });
      });
    }
  }
}
