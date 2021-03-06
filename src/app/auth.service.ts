import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from './models/app-user';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;
  constructor(
    private afAuth: AngularFireAuth, 
    private route: ActivatedRoute,
    private userService: UserService){ 
    this.user$ = afAuth.authState;
    }

    login(){
    let returnURl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl',returnURl);
    

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
    }

    logout(){
      this.afAuth.auth.signOut();
    }

    get appUser$(): Observable<AppUser>{
      return this.user$
      .switchMap(user => {
        if(user){
          return this.userService.get(user.uid);
        }

        return Observable.of(null);
      })
    }

}

