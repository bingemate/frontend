import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../../feature/subscription/payment.service';
import { Invoice } from '../../../shared/models/payment.models';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.less'],
})
export class InvoicesComponent implements OnInit {
  isOnPhone = false;

  invoices: Invoice[] = [];
  invoiceLoading = false;
  
  constructor(
    private breakpointObserver: BreakpointObserver,
    private paymentService: PaymentService
  ) {
    this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait])
      .subscribe(result => {
        this.isOnPhone = result.matches;
      });
  }

  ngOnInit() {
    this.invoiceLoading = true;
    this.paymentService.getInvoices().subscribe(invoices => {
      this.invoiceLoading = false;
      this.invoices = invoices;
    });
  }

  mapStatus(
    status: 'draft' | 'open' | 'paid' | 'uncollectible' | 'void'
  ): 'secondary' | 'warning' | 'danger' | 'success' | undefined {
    switch (status) {
      case 'paid':
        return 'success';
      case 'draft':
        return 'secondary';
      case 'open':
        return 'warning';
      case 'uncollectible':
        return 'danger';
      case 'void':
        return 'danger';
    }
  }
}
