import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  
  user: Observable<firebase.User>;
  google_provider = new firebase.auth.GoogleAuthProvider();

  constructor(private afAuth: AngularFireAuth, private flashMsg: FlashMessagesService, private router: Router) { 
    this.user = this.afAuth.user;
    
  }
  ngOnInit(): void {
    
  }

  googlelogin() {
    // this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    // this.afAuth.auth.signInWithEmailAndPassword("x@gmail.com", "xiecom");
    this.afAuth.auth.signInWithPopup(this.google_provider);
    // this.afAuth.auth.signInWithPopup(new auth.EmailAuthProvider());
  }

  signup(loginData){
    this.afAuth.auth.createUserWithEmailAndPassword(loginData.email, loginData.password).then(value => {
      console.log('Success!',value);
      this.showSuccessMessage("Success on signing up!");
      this.navigateTo('');
    }).catch(err =>{
      console.log("Something went wrong!", err)
      this.showFailMessage(err);
    });
    
  }

  emaillogin(loginData){
    this.afAuth.auth.signInWithEmailAndPassword(loginData.email, loginData.password).then(value => {
      console.log('Success!',value);
      this.showSuccessMessage("You are logged in");
      this.navigateTo('');
    }).catch(err =>{
      console.log("Something went wrong!", err)
      this.showFailMessage(err);
    });
  }

  logout() {
    this.afAuth.auth.signOut();
    this.showSuccessMessage("You are logged out");  
  }

  showSuccessMessage(msg){
    this.flashMsg.show(msg, {cssClass:"alert-success", timeout: 3000});  
  }

  showFailMessage(err){
    this.flashMsg.show("Something went wrong! :"+err, {cssClass:"alert-danger", timeout: 3000}); 
  }

  navigateTo(route){
    this.router.navigate([route]);
  }
}
