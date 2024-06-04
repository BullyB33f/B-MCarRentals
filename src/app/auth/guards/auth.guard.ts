import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})


export class authGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    {if(!this.authService.isLoggedIn()){
    this.router.navigateByUrl('/login');
  }
    return true;}
  }

  // CanActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  // {if(!this.authService.isLoggedIn()){
  //   this.router.navigateByUrl('/login');
  // }
  //   return true;}
};
