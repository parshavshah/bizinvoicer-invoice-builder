# InvoiceMate – Smart Invoicing Made Simple

InvoiceMate is a powerful, user-friendly invoicing application designed to simplify billing and streamline financial workflows for freelancers, small businesses, and agencies. Built with modern web technologies, InvoiceMate helps you create, manage, and send professional invoices with ease — all from a secure, web-based platform.

## Database Tables and Relationships

### Users

```sql
CREATE TABLE users (
id INT AUTO_INCREMENT PRIMARY KEY,
email VARCHAR(255) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
first_name VARCHAR(100),
last_name VARCHAR(100),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Firms (Company Settings)

```sql
CREATE TABLE firms (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
name VARCHAR(255) NOT NULL,
address TEXT,
city VARCHAR(100),
state VARCHAR(100),
postal_code VARCHAR(20),
country VARCHAR(100),
phone VARCHAR(50),
email VARCHAR(255),
website VARCHAR(255),
tax_number VARCHAR(100),
logo_path VARCHAR(255),
default_currency VARCHAR(10) DEFAULT 'USD',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_firms_user_id ON firms(user_id);
```

### Clients

```sql
CREATE TABLE clients (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
name VARCHAR(255) NOT NULL,
contact_person VARCHAR(100),
email VARCHAR(255),
phone VARCHAR(50),
address TEXT,
city VARCHAR(100),
state VARCHAR(100),
postal_code VARCHAR(20),
country VARCHAR(100),
tax_number VARCHAR(100),
notes TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_clients_user_id ON clients(user_id);
```

### Products/Services

```sql
CREATE TABLE products (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
name VARCHAR(255) NOT NULL,
description TEXT,
sku VARCHAR(100),
unit VARCHAR(50),
regular_price DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_products_user_id ON products(user_id);
```

### Taxes

```sql
CREATE TABLE taxes (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
name VARCHAR(100) NOT NULL,
rate DECIMAL(10, 2) NOT NULL,
description VARCHAR(255),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_taxes_user_id ON taxes(user_id);
```

### Product-Tax Association (Many-to-Many)

```sql
CREATE TABLE product_taxes (
id INT AUTO_INCREMENT PRIMARY KEY,
product_id INT NOT NULL,
tax_id INT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
FOREIGN KEY (tax_id) REFERENCES taxes(id) ON DELETE CASCADE,
UNIQUE KEY unique_product_tax (product_id, tax_id)
);

CREATE INDEX idx_product_taxes_product_id ON product_taxes(product_id);
CREATE INDEX idx_product_taxes_tax_id ON product_taxes(tax_id);
```

### Invoices

```sql
CREATE TABLE invoices (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
client_id INT NOT NULL,
firm_id INT NOT NULL,
invoice_number VARCHAR(50) NOT NULL,
reference VARCHAR(100),
issue_date DATE NOT NULL,
due_date DATE NOT NULL,
status ENUM('draft', 'sent', 'paid', 'overdue', 'cancelled') DEFAULT 'draft',
notes TEXT,
subtotal DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
tax_total DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
total DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
currency VARCHAR(10) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
FOREIGN KEY (firm_id) REFERENCES firms(id) ON DELETE CASCADE
);

CREATE INDEX idx_invoices_user_id ON invoices(user_id);
CREATE INDEX idx_invoices_client_id ON invoices(client_id);
CREATE INDEX idx_invoices_firm_id ON invoices(firm_id);
```

### Invoice Items

```sql
CREATE TABLE invoice_items (
id INT AUTO_INCREMENT PRIMARY KEY,
invoice_id INT NOT NULL,
product_id INT,
description TEXT NOT NULL,
quantity DECIMAL(15, 2) NOT NULL,
unit_price DECIMAL(15, 2) NOT NULL,
discount_percent DECIMAL(5, 2) DEFAULT 0.00,
subtotal DECIMAL(15, 2) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE,
FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);

CREATE INDEX idx_invoice_items_invoice_id ON invoice_items(invoice_id);
CREATE INDEX idx_invoice_items_product_id ON invoice_items(product_id);
```

### Invoice Item Taxes

```sql
CREATE TABLE invoice_item_taxes (
id INT AUTO_INCREMENT PRIMARY KEY,
invoice_item_id INT NOT NULL,
tax_id INT NOT NULL,
tax_name VARCHAR(100) NOT NULL,
tax_rate DECIMAL(10, 2) NOT NULL,
tax_amount DECIMAL(15, 2) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (invoice_item_id) REFERENCES invoice_items(id) ON DELETE CASCADE,
FOREIGN KEY (tax_id) REFERENCES taxes(id) ON DELETE CASCADE
);

CREATE INDEX idx_invoice_item_taxes_invoice_item_id ON invoice_item_taxes(invoice_item_id);
CREATE INDEX idx_invoice_item_taxes_tax_id ON invoice_item_taxes(tax_id);
```
