import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../service/data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService:DataService, private router:Router){}
  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      // If the user is not authenticated, redirect to the login page
      this.router.navigate(['/login']);
      return false;
    }
  }
}
