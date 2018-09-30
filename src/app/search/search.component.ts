import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  q:string = '';
  status:number = 0;
  query:string = '';
  cities = [ "istanbul", "berlin", "london", "helsinki", "dublin", "vancouver" ];
  constructor(private route: ActivatedRoute, private router: Router, private browserHandler: Location) { }

  ngOnInit() {
    this.query = this.route.snapshot.paramMap.get('keyword').toLowerCase();
    this.search(this.query);
  }

  refresh(e) {
    console.log(e);
  }

  search(query) {
    this.status = this.cities.indexOf(query);
  }

}
