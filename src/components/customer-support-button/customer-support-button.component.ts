import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomerSupportComponent } from '../customer-support/customer-support.component';

@Component({
  selector: 'app-customer-support-button',
  templateUrl: './customer-support-button.component.html',
  styleUrls: ['./customer-support-button.component.scss'],
})
export class CustomerSupportButtonComponent {
  customerSupportDialogOpened: boolean = false;
  constructor(private readonly dialog: MatDialog) {}

  onCustomerSupportOpen(): void {
    if (this.customerSupportDialogOpened) {
      return;
    }

    this.customerSupportDialogOpened = true;

    this.dialog
      .open(CustomerSupportComponent, {
        width: '400px',
        disableClose: false,
        panelClass: 'mat-dialog-customer-support-modal',
        autoFocus: false,
        hasBackdrop: false,
      })
      .afterClosed()
      .subscribe(() => {
        this.customerSupportDialogOpened = false;
      });
  }
}
