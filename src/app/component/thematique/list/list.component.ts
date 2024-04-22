import { Component, OnInit, OnDestroy,AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  apiData: any;

  constructor(private http: HttpClient,private router:Router) {
    // Static data definition
    this.apiData = [
      { id: 1, title: 'aa', body: 'a', startDate: '2024-04-21', endDate: '2024-04-30' },
      { id: 2, title: 'Titlea 2', body: 'Body 2', startDate: '2024-05-12', endDate: '2024-05-10' },
      { id: 3, title: 'Title 3', body: 'Body 3', startDate: '2024-05-10', endDate: '2024-05-20' },
      { id: 4, title: 'Title 4', body: 'Body 1', startDate: '2024-04-11', endDate: '2024-04-30' },
      { id: 5, title: 'Title 5', body: 'Body 5', startDate: '2024-05-01', endDate: '2024-05-10' },
      { id: 6, title: 'Title 6', body: 'Body 6', startDate: '2024-05-15', endDate: '2024-05-20' },
      { id: 7, title: 'Title 7', body: 'Body 7', startDate: '2024-04-21', endDate: '2024-04-30' },
      { id: 8, title: 'Title 8', body: 'Body 8', startDate: '2024-05-01', endDate: '2024-05-10' },
      // Add more static data as needed
    ];
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      $('#example').DataTable({
        "lengthMenu": [[5, 8], [5, 8]] // Customize the number of entries shown
      });
    }, 0);
  }

}
