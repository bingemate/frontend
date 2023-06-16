import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  CheckoutResponse,
  Invoice,
  InvoiceResponse,
  toInvoice,
} from '../../shared/models/payment.models';
import {
  SubscriptionModel,
  SubscriptionResponse,
  toSubscription,
} from '../../shared/models/streaming.model';
import { API_RESOURCE_URI } from '../../shared/api-resource-uri/api-resources-uri';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private readonly http: HttpClient) {}

  getCheckoutSessionUrl(): Observable<CheckoutResponse> {
    return this.http.get<CheckoutResponse>(
      `${API_RESOURCE_URI.PAYMENT_SERVICE}/subscription/subscribe`
    );
  }
  getChangePaymentMethodUrl(): Observable<CheckoutResponse> {
    return this.http.get<CheckoutResponse>(
      `${API_RESOURCE_URI.PAYMENT_SERVICE}/subscription/payment-method`
    );
  }

  cancelSubscription() {
    return this.http.delete(`${API_RESOURCE_URI.PAYMENT_SERVICE}/subscription`);
  }

  getInvoices(): Observable<Invoice[]> {
    return this.http
      .get<InvoiceResponse[]>(`${API_RESOURCE_URI.PAYMENT_SERVICE}/invoice`)
      .pipe(map(invoices => invoices.map(toInvoice)));
  }

  getSubscription(): Observable<SubscriptionModel> {
    return this.http
      .get<SubscriptionResponse>(
        `${API_RESOURCE_URI.PAYMENT_SERVICE}/subscription`
      )
      .pipe(map(toSubscription));
  }
}
