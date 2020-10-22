import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'ngx-clients-list',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.scss']
})
export class ClientsTableComponent implements OnInit {

  clients = [];
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    // this.api.getClients().subscribe(clients => {
    //   this.clients = clients;
    // })
  }

}
