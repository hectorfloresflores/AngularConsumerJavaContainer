import {Component, Directive, Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {interval} from 'rxjs/internal/observable/interval';


interface Response {
  CpuUsage: string;
  MemoryUsage: string;
  Processors: string;
}

// @ts-ignore
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private http: HttpClient) {}



  cpu = '';
  memory = '';
  processors = '';
  title = 'JavaApiFrontEnd';
  configUrl = 'https://heroku-java-api.herokuapp.com/';




  ngOnInit() {
    interval(1000).subscribe(() => {
      this.getConfig().subscribe(data => {
        console.log(data);

        this.cpu =  data.CpuUsage;
        this.memory = data.MemoryUsage;
        this.processors = data.Processors;
      });
    });
  }

  // tslint:disable-next-line:typedef
  getConfig() {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '/'
      })
    };
    return this.http.get<Response>(this.configUrl, options);
  }



}
