import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

const defaultTimeOut = 2000;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private toastr: ToastrService) { }

  showSuccess(message: string, title = 'Success', timeOut = defaultTimeOut ){
      this.showToast(message, title, timeOut, 'toast-success');
  }

  showError(message: string, title = 'Error', timeOut = defaultTimeOut) {
    this.showToast(message, title, timeOut, 'toast-error');
  }

  showWarning(message: string, title = 'Warning', timeOut = defaultTimeOut) {
    this.showToast(message, title, timeOut, 'toast-warning');
  }

  showInfo(message: string, title = 'Info', timeOut = defaultTimeOut) {
    this.showToast(message, title, timeOut, 'toast-info');
  }

  private showToast(message: string, title: string, timeOut: number, type: string) {
    this.toastr.show(message, title, { timeOut }, type);
  }
}
