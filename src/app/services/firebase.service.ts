import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, of, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { LocationService } from '../services/location.service';
import { AngularFireDatabase } from '@angular/fire/database';
import {AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private listCollection: AngularFirestoreCollection<Listing>;
  lists: Observable<any[]>;
  list: Observable<Listing>;

  constructor(private af: AngularFirestore, private storage: AngularFireStorage, private location: LocationService,private db: AngularFireDatabase, private au: AuthService) {
    this.listsIni();
    
  }

  listsIni() {
    // this.listCollection = this.af.collection<Listing>("listings");
    // if (!this.lists) {
    //   this.lists = this.listCollection.snapshotChanges().map(actions => {
    //     return actions.map(a => {
    //       const data = a.payload.doc.data() as Listing;
    //       const id = a.payload.doc.id;
    //       return { id, ...data };
    //     });
    //   });
    // }
    this.listCollection = this.af.collection<Listing>("listings");
    // this.lists = this.db.list('listings').valueChanges();
    this.lists = this.listCollection.valueChanges();
  }

  getListData() {
    // return this.lists = this.af.collection(dbName).valueChanges() as Observable<Listing[]>;

    return this.lists;
  }

  async getSingleListData(id) {
    // this.af.collection("listings").doc(id).ref.get().then(doc =>{
    //   if (doc.exists){
    //     this.list = doc.data() as Observable<Listing>;
    //     return this.list;
    //     console.log("doc data:", doc.data());
    //   }
    // }).catch(err =>{
    //   console.log("Something went wrong!"+err);
    // });

    // return this.list;

    await this.listCollection.doc(id).ref.get().then(doc => {
      if (doc.exists) {
        this.list = doc.data() as Observable<Listing>;
        // console.log("Document data:", doc.data());
        // console.log("Document this list:", this.list);
      } else {
        console.log("No such document!");
      }
    }).catch(err => {
      console.log("Error getting document:", err);
    });
    // console.log("from doc:", this.list);
    return this.list;
    // console.log("doc data:", this.list);
  }

  addListing(list) {
    this.listCollection.doc(list.id).set(list);
    this.au.showSuccessMessage("List added");
    this.location.back();
  }

  updateListing(form){
    // form.id = this.createItemId();
    this.listCollection.doc(form.id).set(form);
    this.au.showSuccessMessage("List updated");
    this.location.back();
  }

  createItemId() {
    return this.af.createId();
  }

  deleteListing(id){
    this.listCollection.doc(id).delete();
    this.au.showSuccessMessage("List deleted");
    this.location.back();

  }

  getProfileUrl(path) {
    const ref = this.storage.ref(path);
    return ref.getDownloadURL();
  }
}


export interface Listing {
  id?: string,
  title?: string,
  type?: string,
  image?: string,
  city?: string,
  owner?: string,
  path?: string
}

export interface ListingID extends Listing {
  id: string
}
