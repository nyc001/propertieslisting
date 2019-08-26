import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.user.take(1).map(user => !!user).do(auth => {
      if (!auth) {
        this.auth.showFailMessage("Not authorized");
      }
      !auth ? this.router.navigate(['/']) : true;
    }
    );
  }

}
