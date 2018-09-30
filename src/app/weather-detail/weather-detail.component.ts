import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.css']
})
export class WeatherDetailComponent implements OnInit {

  woeID:number = 0;
  reports:any;
  constructor(private route: ActivatedRoute, private browserLocation: Location, private weatherProvider: WeatherService) { }

  async ngOnInit() {
    this.woeID = +this.route.snapshot.paramMap.get('woeid');
    await this.getCityDetailedWeatherReport(this.woeID);
  }

  getCityDetailedWeatherReport(woeID: number) {
    this.weatherProvider.getLocationBasicInfo(woeID).then(data => {
      this.reports = data;
    }).catch(error => {
      console.log("Unable to fetch city information");
      console.log(error);
    });
  }

  getDay(date) {
    let d = new Date(date);
    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    console.log(d.getDay());
    return days[d.getDay()];
  }

}
