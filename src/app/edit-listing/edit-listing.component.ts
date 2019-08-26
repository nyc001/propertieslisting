import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service';
import { FirebaseService } from '../services/firebase.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.css']
})
export class EditListingComponent implements OnInit {
  list;
  id;
  form;
  constructor(public location: LocationService, private fbService: FirebaseService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      title: [''],
      owner: [''],
      city: [''],
      bedrooms: [''],
      type: [''],
      image: [''],
      price: [''],
      id: [''],
      path: ['']
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    // console.log(this.id);
    this.fbService.getSingleListData(this.id).then(data => {
      this.list = data;
      // console.log(this.list);
      this.form.patchValue({
        title: this.list.title,
        owner: this.list.owner,
        city: this.list.city,
        bedrooms: this.list.bedrooms,
        type: this.list.type,
        image: this.list.image,
        price: this.list.price,
        id: this.list.id,
        path: this.list.path
      });
    })

  }
  onSubmit(){
    this.fbService.updateListing(this.form.value);
    // console.log(this.form.value);
  }
}
