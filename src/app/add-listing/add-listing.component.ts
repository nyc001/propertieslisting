import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service';
import { FormBuilder, Validators, Form } from '@angular/forms';
import {FirebaseService} from '../services/firebase.service';
import { AngularFireStorage } from '@angular/fire/storage';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})
export class AddListingComponent implements OnInit {
  
  form;
  file;
  filepath;

  constructor(public locationService: LocationService, private fb: FormBuilder, private fbService:FirebaseService,private storage: AngularFireStorage, private au:AuthService ) {
    this.form = fb.group({
      title: [''],
      owner: [''],
      city: [''],
      bedrooms: [''],
      type: ['Estate'],
      image: [''],
      price: [''],
      id: this.fbService.createItemId(),
      path: ['']
    });
  }

  ngOnInit() {

  }

  onSubmit() {
    // console.log(this.form.value);
    this.fbService.addListing(this.form.value);

  }

  uploadFile(event){
    var file = event.target.files[0];
    if (file.type != 'image/jpeg'){
      // console.log(file.type);
      console.log("wrong file type, picture please!");
      this.au.showFailMessage("wrong file type, picture please!");
      return;
    }
    var filePath = 'img/'+this.form.value.id+'/'+file.name;
    var customMetadata = { app: 'My AngularFire-powered PWA!' };
    this.form.value.image = file.name;
    this.form.value.path = filePath;
    var task = this.storage.upload(filePath, file, {customMetadata});
    
    // console.log("img:",this.form.value.image);
    // console.log("path:",this.form.value.path);
    // console.log("form value:",this.form.value);
  }

}
