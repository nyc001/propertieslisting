import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import {LocationService} from '../services/location.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  id;
  list;
  profileUrl;
  
  constructor(private fbService:FirebaseService, private route: ActivatedRoute, public location:LocationService ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    // this.list = this.fbService.getSingleListData(this.id);
    this.fbService.getSingleListData(this.id).then(data =>{
      this.list = data;
      this.profileUrl = this.fbService.getProfileUrl(this.list.path);
    });
    // console.log("com id:",this.id);
    // console.log("com data:",this.list);
    
    // console.log("profile url:",this.profileUrl);
  }

  deleteData(){
    this.fbService.deleteListing(this.list.id);    
  }

}
