
--
-- Dumping data for table `quotation_items`
--

INSERT INTO `quotation_items` (`id`, `quotation_id`, `product_id`, `description`, `quantity`, `unit_price`, `discount_percent`, `subtotal`, `created_at`, `updated_at`, `name`) VALUES
(1, 1, 5, 'Enterprise-grade antivirus software for up to 50 users', 4.00, 399.00, 5.00, 1516.20, '2025-05-15 06:00:23', '2025-05-15 06:00:23', 'NovaX Antivirus Suite'),
(2, 1, 3, 'High-back mesh chair with lumbar support for office use', 7.00, 295.00, 10.00, 1858.50, '2025-05-15 06:00:23', '2025-05-15 06:00:23', 'Apex Ergonomic Chair'),
(3, 2, 4, 'Weekly content creation and platform monitoring', 4.00, 650.00, 12.00, 2288.00, '2025-05-15 06:02:39', '2025-05-15 06:02:39', 'Social Media Management Plan'),
(4, 3, 1, 'Secure cloud backup solution with multi-device support', 2.00, 499.00, 0.00, 998.00, '2025-05-15 06:03:13', '2025-05-15 06:03:13', 'CloudSync Pro'),
(5, 4, 4, 'Weekly content creation and platform monitoring', 12.00, 650.00, 15.00, 6630.00, '2025-05-15 06:03:50', '2025-05-15 06:03:50', 'Social Media Management Plan'),
(6, 5, 2, 'Comprehensive audit of network and server health', 1.00, 1200.00, 0.00, 1200.00, '2025-05-15 06:05:23', '2025-05-15 06:05:23', 'IT Infrastructure Audit');
