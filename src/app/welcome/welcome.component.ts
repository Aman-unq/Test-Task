import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  title = 'TestTask';
  user: any;
  sessionPopupVisible: boolean = false;
  sessionTimeout: number = 20 * 1000;
  sessionTimer: any;

  @ViewChild(PopupComponent) popup!: PopupComponent
  constructor(private authService: DataService, private router:Router) {
    this.resetSessionTimer();
  }
  @HostListener('window:keyup', ['$event'])
  @HostListener('window:mousemove', ['$event'])

  ngOnInit(): void {
    let userData = this.authService.getUser()
    this.user = JSON.parse(userData)
    console.log('user',this.user);
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }



  resetSessionTimer(): void {
    clearTimeout(this.sessionTimer);
    this.sessionTimer = setTimeout(() => {
      this.showSessionPopup();
    }, this.sessionTimeout);
  }

  showSessionPopup(): void {
    this.sessionPopupVisible = true;
  }

  // hideSessionPopup(): void {
  //   this.sessionPopupVisible = false;
  //   this.resetSessionTimer();
  // }

  endSession(): void {
    this.sessionPopupVisible = false;
    console.log("session",this.sessionPopupVisible);
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  continueSession(): void {
    this.sessionPopupVisible = false;
    console.log("session",this.sessionPopupVisible);
    this.resetSessionTimer();
  }
}
