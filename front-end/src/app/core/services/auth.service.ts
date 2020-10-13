import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '@app/models/user.interface';
import { LocalStorageService } from './local-storage.service';
import { AppSettings } from '@app/core/settings/index';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { api } from '@env/environment';


@Injectable({ providedIn: 'root' })
export class AuthService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(
        private http: HttpClient,
        private router: Router,
        private store: LocalStorageService,
        private toast: MatSnackBar
    ) {
        this.currentUserSubject = new BehaviorSubject<User>(
            JSON.parse(this.store.get(AppSettings.localStorage.logged))
        );
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public set currentUserValue(value) {
        this.currentUserSubject.next(value);
    }

    login(email: string, password: string) {
        return this.http
            .post<any>(`${api.usucampeao}/auth`, {
                email,
                password
            })
            .toPromise()
            .then(user => {
                console.log(user)
                this.router.navigate(['/consulta']);
                this.currentUserSubject.next(user);
                this.store.set(AppSettings.localStorage.logged, JSON.stringify(user))
                const expiresAt = moment().add(user.expiresIn, 'second');
                this.store.set(AppSettings.localStorage.expires, JSON.stringify(expiresAt.valueOf()));
            }).catch(() => {
                this.toast.open('Dados inválidos');
            });
    }

    logout() {
        this.store.delete(AppSettings.localStorage.logged);
        this.store.delete(AppSettings.localStorage.expires);
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = JSON.parse(this.store.get(AppSettings.localStorage.expires));
        return moment(expiration);
    }

}
