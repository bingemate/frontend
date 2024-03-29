export interface CheckoutResponse {
  url: string;
}
export interface InvoiceResponse {
  invoiceUrl: string;
  invoicePdfUrl: string;
  created: number;
  status: 'draft' | 'open' | 'paid' | 'uncollectible' | 'void';
  price: number;
  currency: string;
}

export interface Invoice {
  invoiceUrl: string;
  invoicePdfUrl: string;
  created: Date;
  status: 'draft' | 'open' | 'paid' | 'uncollectible' | 'void';
  price: number;
  currency: string;
}

export function toInvoice(invoice: InvoiceResponse): Invoice {
  return { ...invoice, created: new Date(invoice.created * 1000) };
}
