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
  CreateSubscriptionRequest,
  SubscriptionIdResponse,
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

  stopSubscription() {
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

  cancelSubscription(subscriptionId: string): Observable<void> {
    return this.http.delete<void>(
      `${API_RESOURCE_URI.PAYMENT_SERVICE}/subscription/cancel/${subscriptionId}`
    );
  }

  createSubscription(create: CreateSubscriptionRequest): Observable<string> {
    return this.http
      .post<SubscriptionIdResponse>(
        `${API_RESOURCE_URI.PAYMENT_SERVICE}/subscription/create`,
        create
      )
      .pipe(map(dto => dto.id));
  }

  getSubscriptionDetails(userId: string): Observable<SubscriptionModel> {
    return this.http
      .get<SubscriptionResponse>(
        `${API_RESOURCE_URI.PAYMENT_SERVICE}/subscription/details/${userId}`
      )
      .pipe(map(toSubscription));
  }

  getCustomer(userId: string) {
    return this.http.get<void>(
      `${API_RESOURCE_URI.PAYMENT_SERVICE}/customer/${userId}`
    );
  }
}
