import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private afAuth: AuthService, private af: AngularFireAuth) { }

  ngOnInit() {
  }
  login() {
    // this.af.auth.signInWithPopup(new auth.GoogleAuthProvider());
    var provider = new auth.GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/plus.login");
    provider.setCustomParameters({
      login_hint: "user@example.com"
    });
    this.af.auth.signInWithPopup(
      provider
    ).then(result=>{
      // console.log("Signed in as:", result.user.uid);
    }).catch(err=>{
      // console.error("Authentication failed:", err);
    })
    // this.afAuth.auth.signInWithPopup(new auth.EmailAuthProvider());
    // this.afAuth.googlelogin();

  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.af.auth.signInWithPopup(provider);
  }
  // logout() {
  //   this.afAuth.auth.signOut();
  // }
}
