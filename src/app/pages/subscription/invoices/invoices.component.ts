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
  ): 'green' | 'blue' | 'red' {
    switch (status) {
      case 'paid':
        return 'green';
      case 'draft':
        return 'blue';
      case 'open':
        return 'blue';
      case 'uncollectible':
        return 'red';
      case 'void':
        return 'red';
    }
  }
}
