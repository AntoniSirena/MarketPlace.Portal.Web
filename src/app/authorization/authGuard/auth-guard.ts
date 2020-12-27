import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router';
import { ListenService } from '../../services/listen/listen.service';
import { RedirectService } from '../../services/redirect/redirect.service';


@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {

    isVisitorUser = JSON.parse(localStorage.getItem("isVisitorUser"));

    constructor(private router: Router, private listenService: ListenService, private redirectService: RedirectService) {
    }

    canActivate() {
        if (this.isVisitorUser) {
            if (this.validateHashVisitador()) {
                if (localStorage.length > 0) {
                    return true;
                }
            }
        } else {
            if (localStorage.length > 0) {
                return true;
            }
        }

        this.redirectService.login(true);
    }

    readyToRequest() {
        this.listenService.readyToRequest().subscribe((response: any) => {
        },
            error => {
                console.log(JSON.stringify(error));
            });
    }


    validateHashVisitador() {
        let currentHash = window.location.hash;
        let result: Boolean = false;

        if (currentHash == '#/login' ||
            currentHash == '#/register' ||
            currentHash == '#/portada' ||
            currentHash == '#/appointment' ||
            currentHash == '#/scheduleAppointment' ||
            currentHash == '#/checkAppointment' ||
            currentHash == '#/my-files') {
            result = true;
        }

        return result;
    }


}
