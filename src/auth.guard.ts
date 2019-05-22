import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
     if(sessionStorage.getItem('email') !== null){
       return true;
     }
     else{
       console.log('Log in first!');
       this.router.navigateByUrl('/login');
       return false;
     }
  }
  
}
