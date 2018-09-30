import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  @Input() location: string;
  locationInfo: any;
  basicInfo: any;
  woeid:number;
  temp:any = 'Loading...';
  minTemp:any = 'Loading...';
  maxTemp:any = 'Loading...';
  icon:any = 'Loading...';
  constructor(private weatherProvider: WeatherService) { }

  async ngOnInit() {
    await this.getLocationWoeID(this.location);
  }

  // use city name parsed as component argument to get woeid from weather.php
  getLocationWoeID(city: string) {
    this.weatherProvider.getCityWoeID(city).then(data => {
      this.locationInfo = data[0];
      this.woeid = this.locationInfo.woeid;
      // use the gotten woeid to get basic info i.e. temp, min and max temp etc.
      this.getLocationBasicInfo(this.locationInfo.woeid);
    }).catch(error => {
      console.log("Error occured trying to get location info!");
      console.log(error);
    });
  }

  getLocationBasicInfo(woeID: number) {
    this.weatherProvider.getLocationBasicInfo(woeID).then(data => {
      this.basicInfo = data;
      this.basicInfo = this.basicInfo.consolidated_weather;
      let dt = new Date();
      let y = dt.getFullYear();
      let mm:number = dt.getMonth() + 1;
      let m:string = '';
      let d = dt.getDate();
      if(mm < 10) {
        m = "0" + mm;
      }
      let today = y + "-" + m + "-" + d;
      this.basicInfo.forEach(i => {
        if(i.applicable_date == today) {
          this.temp = i.the_temp;
          this.minTemp = i.min_temp;
          this.maxTemp = i.max_temp;
          this.icon = 'https://www.metaweather.com/static/img/weather/png/' + i.weather_state_abbr + '.png';
        }
      });
    }).catch(error => {
      console.log("error occured while trying to get basic data");
      console.log(error);
    });
  }

}
