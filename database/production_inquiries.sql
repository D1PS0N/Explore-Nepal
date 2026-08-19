CREATE TABLE IF NOT EXISTS `production_inquiries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `package` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `destination` varchar(255) NOT NULL,
  `travel_date` date DEFAULT NULL,
  `brief` text,
  `status` enum('new','contacted','closed') NOT NULL DEFAULT 'new',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
