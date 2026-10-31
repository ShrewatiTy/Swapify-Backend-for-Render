-- Store payment-provider references, never raw card numbers or security codes.
CREATE TABLE payment_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  account_username VARCHAR(120) NOT NULL,
  plan_name VARCHAR(80) NOT NULL,
  amount_minor INTEGER NOT NULL,
  currency CHAR(3) NOT NULL DEFAULT 'INR',
  customer_name VARCHAR(160) NOT NULL,
  card_last4 CHAR(4),
  provider VARCHAR(30) NOT NULL,
  provider_payment_token VARCHAR(255),
  status VARCHAR(30) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Do not add card_number, cvv/security_number, or expiry_date columns.
-- A PCI-compliant provider should collect and tokenize those fields.
