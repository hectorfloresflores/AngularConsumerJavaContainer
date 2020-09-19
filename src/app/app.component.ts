import {Component, Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {interval} from 'rxjs/internal/observable/interval';

// @ts-ignore
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent implements OnInit{
  constructor(private http: HttpClient) { }
  console:Object;
  title = 'JavaApiFrontEnd';
  configUrl = 'https://heroku-java-api.herokuapp.com/';
  ngOnInit(): void {
   // this.getConfig().subscribe(data => {
   //   console.log(data);
   // });

    interval(3000).subscribe(() => {
      this.getConfig().subscribe(data =>{
        console.log(data);
        this.console =  data.UsedHeapMemory;
      });
    });
  }


  // tslint:disable-next-line:typedef
  getConfig() {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '/'
      })
    };
    const value = this.http.get(this.configUrl, options);

    return value;
  }



}
