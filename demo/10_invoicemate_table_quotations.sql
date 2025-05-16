
--
-- Dumping data for table `quotations`
--

INSERT INTO `quotations` (`id`, `client_id`, `firm_id`, `quotation_number`, `reference`, `issue_date`, `due_date`, `status`, `notes`, `subtotal`, `tax_total`, `total`, `currency`, `created_at`, `updated_at`) VALUES
(1, 3, 2, 'QT001', NULL, '2025-05-01', '2025-05-31', 'rejected', 'Prices are subject to change based on final project scope and requirements', 3374.70, 279.15, 3653.85, '', '2025-05-15 06:00:23', '2025-05-15 06:04:47'),
(2, 3, 1, 'QT002', NULL, '2025-05-09', '2025-05-22', 'sent', 'Prices are subject to change based on final project scope and requirements', 2288.00, 68.64, 2356.64, '', '2025-05-15 06:02:39', '2025-05-15 06:04:14'),
(3, 2, 2, 'QT003', NULL, '2025-05-15', '2025-05-30', 'accepted', 'Prices are subject to change based on final project scope and requirements', 998.00, 92.32, 1090.32, '', '2025-05-15 06:03:13', '2025-05-15 06:04:23'),
(4, 1, 1, 'QT004', NULL, '2025-05-17', '2025-05-17', 'cancelled', 'Prices are subject to change based on final project scope and requirements', 6630.00, 198.90, 6828.90, '', '2025-05-15 06:03:50', '2025-05-15 06:04:31'),
(5, 1, 2, 'QT005', NULL, '2025-05-16', '2025-05-17', 'draft', 'Prices are subject to change based on final project scope and requirements', 1200.00, 54.00, 1254.00, '', '2025-05-15 06:05:23', '2025-05-15 06:05:23');
