import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule,StorageBucket } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireFunctionsModule} from '@angular/fire//functions';
import {AngularFireMessagingModule} from '@angular/fire/messaging';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {FlashMessagesModule} from 'angular2-flash-messages';

import {FirebaseService} from './services/firebase.service';
import {AuthService} from './services/auth.service';
import {LocationService} from './services/location.service';
import {AuthguardGuard} from './services/authguard.guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ListingsComponent } from './listings/listings.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ListingComponent } from './listing/listing.component';
import { AddListingComponent } from './add-listing/add-listing.component';
import { EditListingComponent } from './edit-listing/edit-listing.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';


const routes:Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'listings',
    component: ListingsComponent,
    canActivate: [AuthguardGuard]
  },
  {
    path: 'listing/:id',
    component: ListingComponent,
    canActivate: [AuthguardGuard]
  },
  {
    path: 'add-listing',
    component: AddListingComponent,
    canActivate: [AuthguardGuard]
  },
  {
    path: 'edit-listing/:id',
    component: EditListingComponent,
    canActivate: [AuthguardGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },


];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListingsComponent,
    NavbarComponent,
    ListingComponent,
    AddListingComponent,
    EditListingComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes, { useHash: true }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AngularFireMessagingModule,
    AngularFireFunctionsModule,
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,
    FlashMessagesModule.forRoot(),
    
  ],
  providers: [FirebaseService,AuthService,AuthguardGuard,LocationService, { provide: StorageBucket, useValue: 'propertylisting-f4fca.appspot.com' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
