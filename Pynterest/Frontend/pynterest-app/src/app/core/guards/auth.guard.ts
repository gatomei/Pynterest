import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      try {
        if (this.authService.isLoggedIn()) {
          return true;
        }
        else{
          this.router.navigate(['login']);
          return false;
        }
      } catch (err) {
        this.router.navigate(['login']);
        return false;
      }
    
  }
  
}
