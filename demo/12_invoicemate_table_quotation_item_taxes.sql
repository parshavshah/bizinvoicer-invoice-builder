
--
-- Dumping data for table `quotation_item_taxes`
--

INSERT INTO `quotation_item_taxes` (`id`, `quotation_item_id`, `tax_id`, `tax_name`, `tax_rate`, `tax_amount`, `created_at`) VALUES
(1, 1, 3, 'Environmental Fee', 1.50, 22.74, '2025-05-15 06:00:23'),
(2, 1, 2, 'Digital Services Tax', 3.00, 45.49, '2025-05-15 06:00:23'),
(3, 1, 1, 'State Sales Tax', 6.25, 94.76, '2025-05-15 06:00:23'),
(4, 2, 1, 'State Sales Tax', 6.25, 116.16, '2025-05-15 06:00:23'),
(5, 3, 2, 'Digital Services Tax', 3.00, 68.64, '2025-05-15 06:02:39'),
(6, 4, 2, 'Digital Services Tax', 3.00, 29.94, '2025-05-15 06:03:13'),
(7, 4, 1, 'State Sales Tax', 6.25, 62.38, '2025-05-15 06:03:13'),
(8, 5, 2, 'Digital Services Tax', 3.00, 198.90, '2025-05-15 06:03:50'),
(9, 6, 3, 'Environmental Fee', 1.50, 18.00, '2025-05-15 06:05:23'),
(10, 6, 2, 'Digital Services Tax', 3.00, 36.00, '2025-05-15 06:05:23');
