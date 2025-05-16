
--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `first_name`, `last_name`, `created_at`, `updated_at`, `role`) VALUES
(1, 'admin@gmail.com', '$2b$10$HmMknA85qcjLrdPdgaiXgeWdMejLQxHsbGx9ilwtid6kV4kj6mHrq', 'Kevin', 'Walker', '2025-05-15 05:45:08', '2025-05-15 06:13:56', 'ADMIN'),
(2, 'manager@gmail.com', '$2b$10$HmMknA85qcjLrdPdgaiXgeWdMejLQxHsbGx9ilwtid6kV4kj6mHrq', 'Jason', 'Reed', '2025-05-15 06:12:49', '2025-05-15 06:12:49', 'MANAGER');
