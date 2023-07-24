import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent implements OnInit {

  @Output() onContinue: EventEmitter<any> = new EventEmitter();
  @Output() onLogout: EventEmitter<any> = new EventEmitter();

  private timer: any;
  remainingTime: number = 30;

  constructor(private router: Router, private toastr:ToastrService) {
    this.startTimer();
  }

  ngOnInit(): void {}

  onContinueClick() {
    console.log('continue');
    this.stopTimer();
    this.onContinue.emit();
  }

  onLogoutClick() {
    console.log('logout');
    this.stopTimer();
    this.onLogout.emit();
  }

  private startTimer(): void {
    this.timer = setInterval(() => {
      this.remainingTime--;
      if (this.remainingTime <= 0) {
        this.onLogoutClick();
        this.toastr.error("Session Time Out!")
      }
    }, 1000);
  }

  private stopTimer(): void {
    clearInterval(this.timer);
  }
}
