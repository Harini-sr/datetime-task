import { Component } from '@angular/core';
import { ServiceService } from '../../service/service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-date-time',
  standalone: false,
  templateUrl: './date-time.component.html',
  styleUrl: './date-time.component.css'
})
export class DateTimeComponent {
time:any
  constructor(public service: ServiceService, private http: HttpClient){}
  today = new Date(); 
  

  ngOnInit() {
   setInterval(() => {
     this.today = new Date(); 
   }, 1000);

 }

 Time: any;
 Date: any;


 changeTime(event: any) {
  const timezone = event.target.value;
  this.http.get(`http://localhost:3600/api/Time/GetTimeByCountry?country=${timezone}`).subscribe((res: any) => {
      this.Time = res.time;
      this.Date = res.date;
    }); 
}

}
