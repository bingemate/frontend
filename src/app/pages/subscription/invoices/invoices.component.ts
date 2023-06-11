import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../../feature/subscription/payment.service';
import { Invoice } from '../../../shared/models/payment.models';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.less'],
})
export class InvoicesComponent implements OnInit {
  invoices: Invoice[] = [];
  constructor(private paymentService: PaymentService) {}

  ngOnInit() {
    this.paymentService
      .getInvoices()
      .subscribe(invoices => (this.invoices = invoices));
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
