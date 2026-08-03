-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: explore_nepal
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `destinations`
--

DROP TABLE IF EXISTS `destinations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `destinations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `location` varchar(150) DEFAULT NULL,
  `description` text,
  `image` varchar(255) DEFAULT NULL,
  `attractions` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `destinations`
--

LOCK TABLES `destinations` WRITE;
/*!40000 ALTER TABLE `destinations` DISABLE KEYS */;
INSERT INTO `destinations` VALUES (1,'Pokhara','Kaski, Gandaki Province','Lake city with stunning mountain views.','images/pokhara.jpg','Phewa Lake, Davis Falls, World Peace Pagoda, Sarangkot'),(2,'Janakpur','Dhanusha, Madhesh Province','Historic city known for Janaki Temple.','images/janakpur.jpg','Janaki Temple, Ram Mandir, Dhanush Sagar'),(3,'Chitwan','Chitwan, Bagmati Province','Wildlife safari and jungle adventures.','images/chitwan.jpg','Chitwan National Park, Elephant Safari, Canoeing'),(4,'Ghandruk','Kaski, Gandaki Province','Traditional Gurung village with mountain views.','images/ghandruk.jpg','Gurung Museum, Annapurna Trek'),(5,'Solukhumbu','Koshi Province','Gateway to Everest and Sherpa culture.','images/solukhumbu.jpg','Everest Base Camp, Namche Bazaar'),(6,'Bandipur','Tanahun, Gandaki Province','Hilltop town with preserved Newari culture.','images/bandipur.jpg','Bandipur Bazaar, Siddha Cave'),(7,'Kathmandu','Kathmandu, Bagmati Province','Capital city rich in history, temples and UNESCO heritage sites.','images/kathmandu.jpg','Swayambhunath, Pashupatinath, Boudhanath, Kathmandu Durbar Square'),(8,'Bhaktapur','Bhaktapur, Bagmati Province','Ancient Newari city famous for architecture and pottery.','images/bhaktapur.jpg','Bhaktapur Durbar Square, Nyatapola Temple, Pottery Square'),(9,'Lalitpur','Lalitpur, Bagmati Province','Historic city famous for art, temples and museums.','images/lalitpur.jpg','Patan Durbar Square, Golden Temple, Patan Museum'),(10,'Mustang','Mustang, Gandaki Province','Remote Himalayan region famous for Lo Manthang and Tibetan culture.','images/mustang.jpg','Lo Manthang, Muktinath Temple, Kagbeni'),(11,'Lumbini','Rupandehi, Lumbini Province','Birthplace of Lord Buddha and an important pilgrimage site.','images/lumbini.jpg','Maya Devi Temple, Peace Pagoda, Monastery Zone'),(12,'Rara Lake','Mugu, Karnali Province','Nepal\'s largest freshwater lake surrounded by beautiful mountains and forests.','images/rara.jpg','Rara Lake, Rara National Park, Murma Top');
/*!40000 ALTER TABLE `destinations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `phone` varchar(20) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'Girwani Ghimire Updated','gg@gmail.com','$2b$10$AFmoh65TMWprnUUOaXbB6eIMTZnOCxqndCVwwPtfTQJUKqZvKbzee','2026-07-26 15:43:47','9800000000','Kathmandu'),(3,'Girwani Test ','test@gmail.com','$2b$10$JSXP0tVDmu0869a3twbRXejDwv/RWQYXJbFz47Odav0ygpbP6eXya','2026-07-26 16:48:10',NULL,NULL),(7,'Girwani New Test','girwani2@gmail.com','$2b$10$SjSlGqMQJKnC7Lkd4qcvUucO/bkNqHgqYEE9oabShii2Rcfx5X2m6','2026-07-26 16:59:31',NULL,NULL),(8,'Haalandk','Haalandk66@gmail.com','$2b$10$dIpav2QCr6U6Ibxp5qzG8OmYdAb3jNecGe6DsDJnifohBvVL0blL.','2026-07-26 17:37:06',NULL,NULL),(9,'Bibek Ranabhat','BibekRana@gmail.com ','$2b$10$cAgYIBj4cCyFepSaDVafYenALnsZKnzXOIqRQhdNyweg5Jqje3mtK','2026-07-29 15:36:47',NULL,NULL),(10,'dipson dahal ','dipsondahal@gmail.com','$2b$10$Uo.xNdVWGZNNnmSIml9kw.1omxXTN2q4IRmz5rHep8VgD0mQPHJeq','2026-07-30 01:27:26',NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-03 20:35:28
