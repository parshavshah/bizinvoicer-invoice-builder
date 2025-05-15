
--
-- Dumping data for table `invoice_items`
--

INSERT INTO `invoice_items` (`id`, `invoice_id`, `product_id`, `description`, `quantity`, `unit_price`, `discount_percent`, `subtotal`, `created_at`, `updated_at`, `name`) VALUES
(3, 1, 5, 'Enterprise-grade antivirus software for up to 50 users', 20.00, 399.00, 0.00, 7980.00, '2025-05-15 06:08:07', '2025-05-15 06:08:07', 'NovaX Antivirus Suite'),
(4, 1, 4, 'Weekly content creation and platform monitoring', 10.00, 650.00, 0.00, 6500.00, '2025-05-15 06:08:07', '2025-05-15 06:08:07', 'Social Media Management Plan'),
(5, 2, 3, 'High-back mesh chair with lumbar support for office use', 50.00, 295.00, 10.00, 13275.00, '2025-05-15 06:08:44', '2025-05-15 06:08:44', 'Apex Ergonomic Chair'),
(6, 3, 1, 'Secure cloud backup solution with multi-device support', 3.00, 499.00, 5.00, 1422.15, '2025-05-15 06:09:23', '2025-05-15 06:09:23', 'CloudSync Pro'),
(7, 3, 2, 'Comprehensive audit of network and server health', 6.00, 1200.00, 5.00, 6840.00, '2025-05-15 06:09:23', '2025-05-15 06:09:23', 'IT Infrastructure Audit'),
(8, 4, 5, 'Enterprise-grade antivirus software for up to 50 users', 56.00, 399.00, 19.00, 18098.64, '2025-05-15 06:10:00', '2025-05-15 06:10:00', 'NovaX Antivirus Suite'),
(9, 5, 2, 'Comprehensive audit of network and server health', 12.00, 1200.00, 9.00, 13104.00, '2025-05-15 06:10:39', '2025-05-15 06:10:39', 'IT Infrastructure Audit'),
(10, 5, 5, 'Enterprise-grade antivirus software for up to 50 users', 12.00, 399.00, 9.00, 4357.08, '2025-05-15 06:10:39', '2025-05-15 06:10:39', 'NovaX Antivirus Suite');
