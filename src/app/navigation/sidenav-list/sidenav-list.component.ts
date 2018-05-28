import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit,OnDestroy {

  @Output() closeSidenav = new EventEmitter<void>();
  isAuth = false;
  authStatusEvent: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authStatusEvent = this.authService.authChange.subscribe( authStatus => {
      this.isAuth = authStatus;
    });
  }

  onLogout() {
    this.Onclose();
    this.authService.logout();
  }

  Onclose() {
    this.closeSidenav.emit();
  }

  ngOnDestroy() {
    this.authStatusEvent.unsubscribe();
  }

}
