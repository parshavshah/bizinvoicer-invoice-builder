
--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`id`, `client_id`, `firm_id`, `invoice_number`, `reference`, `issue_date`, `due_date`, `status`, `notes`, `subtotal`, `tax_total`, `total`, `created_at`, `updated_at`) VALUES
(1, 3, 2, 'INV001', NULL, '2025-05-01', '2025-05-31', 'sent', 'Thank you for your business! Payment is due within 30 days of the invoice date.', 14480.00, 933.15, 15413.15, '2025-05-15 06:07:36', '2025-05-15 06:10:44'),
(2, 2, 2, 'INV002', NULL, '2025-05-02', '2025-05-31', 'cancelled', 'Thank you for your business! Payment is due within 30 days of the invoice date.', 13275.00, 829.69, 14104.69, '2025-05-15 06:08:44', '2025-05-15 06:10:53'),
(3, 1, 2, 'INV003', NULL, '2025-05-01', '2025-05-31', 'overdue', 'Thank you for your business! Payment is due within 30 days of the invoice date.', 8262.15, 439.35, 8701.50, '2025-05-15 06:09:23', '2025-05-15 06:10:58'),
(4, 3, 1, 'INV004', NULL, '2025-05-31', '2025-05-10', 'draft', 'Thank you for your business! Payment is due within 30 days of the invoice date.', 18098.64, 1674.12, 19772.76, '2025-05-15 06:10:00', '2025-05-15 06:10:00'),
(5, 2, 1, 'INV005', NULL, '2025-05-14', '2025-05-16', 'paid', 'Thank you for your business! Payment is due within 30 days of the invoice date.', 17461.08, 992.71, 18453.79, '2025-05-15 06:10:39', '2025-05-15 06:10:49');
