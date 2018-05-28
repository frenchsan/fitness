import { AuthData } from './auth-data.model';
import { User } from './auth.model';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthService {

    constructor(private router: Router, private afAuth: AngularFireAuth) {

    }

authChange = new Subject<boolean>();
private isAuthenticated = false;


registerUser(authData: AuthData) {
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
    .then(
    result => {
      console.log(result);
      this.authSuccessfully();
    })
    .catch(err => {
        console.log(err);
    });
}

login(authData: AuthData) {
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
    .then(
    result => {
      console.log(result);
      this.authSuccessfully();
    })
    .catch(err => {
        console.log(err);
    });
}

logout() {
    this.authChange.next(false);
    this.router.navigate(['/login']);
    this.isAuthenticated = false;
}

isAuth() {
    return this.isAuthenticated;
}

authSuccessfully() {
    this.authChange.next(true);
    this.isAuthenticated = true;
    this.router.navigate(['/training']);

}
}
