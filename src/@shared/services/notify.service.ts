import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IconSnackBarComponent } from '../cmpts/icon-snack-bar/icon-snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private snackBar: MatSnackBar) { }

  notify(message: string, type: 'info' | 'success' | 'warning' | 'error'): void {
    const icon = this._getIcon(type);
    const panelClass = this._getPanelClass(type);
    this.snackBar.openFromComponent(IconSnackBarComponent,
      {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: [panelClass],
        data: {
          message: message,
          icon: icon
        },
      });
  }

  private _getIcon(type: 'info' | 'success' | 'warning' | 'error'): string {
    let icon: 'info.png' | 'success.png' | 'warning.png' | 'error.png' = 'info.png';
    switch (type) {
      case 'info':
        icon = 'info.png';
        break;
      case 'success':
        icon = 'success.png';
        break;
      case 'warning':
        icon = 'warning.png';
        break;
      case 'error':
        icon = 'error.png';
        break;
      default:
        icon = 'info.png';
        break;
    }
    return icon;
  }

  private _getPanelClass(type: 'info' | 'success' | 'warning' | 'error'): string {
    let panelClass: 'info-snackbar' | 'success-snackbar' | 'warning-snackbar' | 'error-snackbar' = 'info-snackbar';
    switch (type) {
      case 'info':
        panelClass = 'info-snackbar';
        break;
      case 'success':
        panelClass = 'success-snackbar';
        break;
      case 'warning':
        panelClass = 'warning-snackbar';
        break;
      case 'error':
        panelClass = 'error-snackbar';
        break;
      default:
        panelClass = 'info-snackbar';
        break;
    }
    return panelClass;
  }

}
