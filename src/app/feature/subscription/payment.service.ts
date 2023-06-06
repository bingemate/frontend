import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
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

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private readonly http: HttpClient) {}

  getCheckoutSession(): Observable<CheckoutResponse> {
    return this.http.get<CheckoutResponse>(
      `${environment.apiUrl}/payment-service/subscription/subscribe`
    );
  }
  changePaymentMethodUrl(): Observable<CheckoutResponse> {
    return this.http.get<CheckoutResponse>(
      `${environment.apiUrl}/payment-service/subscription/payment-method`
    );
  }

  cancelSubscription() {
    return this.http.delete(
      `${environment.apiUrl}/payment-service/subscription`
    );
  }

  getInvoices(): Observable<Invoice[]> {
    return this.http
      .get<InvoiceResponse[]>(`${environment.apiUrl}/payment-service/invoice`)
      .pipe(map(invoices => invoices.map(toInvoice)));
  }

  getSubscription(): Observable<SubscriptionModel> {
    return this.http
      .get<SubscriptionResponse>(
        `${environment.apiUrl}/payment-service/subscription`
      )
      .pipe(map(toSubscription));
  }
}
