CREATE TABLE IF NOT EXISTS `cinematic_expeditions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(150) NOT NULL,
  `category` enum('cinematic_expedition','journey_film','social_capture') NOT NULL DEFAULT 'cinematic_expedition',
  `tagline` varchar(255) DEFAULT NULL,
  `description` text,
  `features` text,
  `image` varchar(255) DEFAULT NULL,
  `price_range` varchar(100) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `cinematic_expeditions` (`title`, `category`, `tagline`, `description`, `features`, `image`, `price_range`, `status`) VALUES
('Cinematic Expedition', 'cinematic_expedition', 'For once-in-a-lifetime journeys that deserve a complete visual story', 'Filmed across multiple days with a dedicated production crew, this premium package captures your entire Nepal journey as a cinematic masterpiece.', 'Multi-day crew,Story-led film,Photography,Drone where permitted,Social edits', 'images/cinematic-expedition.jpg', 'Contact for pricing', 'active'),
('Journey Film', 'journey_film', 'A dedicated filmmaker follows the best parts of your route', 'Turns your Nepal journey into a polished cinematic highlight reel that captures the spirit of your adventure.', 'Dedicated filmmaker,60-120 sec film,Photo selects,Vertical reels', 'images/journey-film.jpg', 'Contact for pricing', 'active'),
('Social Capture', 'social_capture', 'Quick, vibrant content built for social platforms', 'Short-form content optimized for Instagram, TikTok, and other social platforms to share your Nepal experience with the world.', 'Short-form video,Vertical reels,Social media optimization,Quick turnaround', 'images/social-capture.jpg', 'Contact for pricing', 'active');
