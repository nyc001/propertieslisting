import { Component, OnInit } from '@angular/core';
import { Observable} from 'rxjs';
import {FirebaseService} from '../services/firebase.service';


@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {
  lists:any;

  constructor(private af: FirebaseService) {
    
   }

  ngOnInit() {
    this.lists = this.af.getListData();
  }

}

