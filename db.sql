-- -------------------------------------------------------------
-- TablePlus 6.4.8(608)
--
-- https://tableplus.com/
--
-- Database: hotel
-- Generation Time: 2025-06-25 10:57:23.2950
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP TABLE IF EXISTS `booking_table`;
CREATE TABLE `booking_table` (
  `booking_id` int NOT NULL AUTO_INCREMENT,
  `booking_hotel_id` int NOT NULL,
  `booking_user_id` int NOT NULL,
  `booking_date` date NOT NULL,
  `booking_description` text,
  `booking_table_id` int NOT NULL,
  `booking_start_time` time NOT NULL,
  `booking_end_time` time NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `is_booking_deleted` tinyint(1) DEFAULT '0',
  `is_booking_finished` tinyint(1) DEFAULT NULL,
  `booking_created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`booking_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `comments_id` int NOT NULL AUTO_INCREMENT,
  `comments_hotel_id` int NOT NULL,
  `comments_user_id` int NOT NULL,
  `comments_text` text NOT NULL,
  `is_comments_deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`comments_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `hotel_details`;
CREATE TABLE `hotel_details` (
  `hotel_id` varchar(100) NOT NULL,
  `hotel_name` varchar(100) DEFAULT NULL,
  `hotel_user_id` varchar(100) DEFAULT NULL,
  `hotel_web_url` varchar(255) DEFAULT NULL,
  `address` text,
  `hotel_contact_number` varchar(20) DEFAULT NULL,
  `location_url` varchar(255) DEFAULT NULL,
  `is_deleted` tinyint NOT NULL DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`hotel_id`),
  KEY `hotel_user_id` (`hotel_user_id`),
  CONSTRAINT `hotel_details_ibfk_1` FOREIGN KEY (`hotel_user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `hotel_menu`;
CREATE TABLE `hotel_menu` (
  `menu_id` int NOT NULL AUTO_INCREMENT,
  `menu_name` varchar(100) DEFAULT NULL,
  `menu_user_id` varchar(100) DEFAULT NULL,
  `menu_hotel_id` varchar(100) DEFAULT NULL,
  `is_menu_deleted` tinyint NOT NULL DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `menu_type` int DEFAULT NULL,
  PRIMARY KEY (`menu_id`),
  KEY `menu_user_id` (`menu_user_id`),
  KEY `menu_hotel_id` (`menu_hotel_id`),
  CONSTRAINT `hotel_menu_ibfk_1` FOREIGN KEY (`menu_hotel_id`) REFERENCES `hotel_details` (`hotel_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`menu_user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `hotel_tables`;
CREATE TABLE `hotel_tables` (
  `table_id` varchar(100) NOT NULL,
  `table_name` varchar(100) DEFAULT NULL,
  `table_user_id` varchar(100) DEFAULT NULL,
  `table_hotel_id` varchar(100) DEFAULT NULL,
  `is_table_deleted` tinyint NOT NULL DEFAULT '0',
  `table_created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `table_seat_count` int DEFAULT NULL,
  PRIMARY KEY (`table_id`),
  KEY `table_user_id` (`table_user_id`),
  KEY `table_hotel_id` (`table_hotel_id`),
  CONSTRAINT `hotel_tables_ibfk_1` FOREIGN KEY (`table_hotel_id`) REFERENCES `hotel_details` (`hotel_id`),
  CONSTRAINT `hotel_tables_ibfk_2` FOREIGN KEY (`table_user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `menu_type`;
CREATE TABLE `menu_type` (
  `menu_type_id` int NOT NULL AUTO_INCREMENT,
  `menu_type_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`menu_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `offers`;
CREATE TABLE `offers` (
  `offers_id` int NOT NULL AUTO_INCREMENT,
  `offers_hotel_id` int NOT NULL,
  `offers_user_id` int NOT NULL,
  `offers_started_at` datetime NOT NULL,
  `offers_finished_at` datetime NOT NULL,
  `offers_description` text,
  `offer_image_url` varchar(255) DEFAULT NULL,
  `is_offers_deleted` tinyint(1) DEFAULT '0',
  `is_offers_finished` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`offers_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `user_type`;
CREATE TABLE `user_type` (
  `user_type_id` int NOT NULL AUTO_INCREMENT,
  `user_type_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`user_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` varchar(100) NOT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `user_address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `contact_number` varchar(20) DEFAULT NULL,
  `user_type` tinyint DEFAULT NULL,
  `location_url` varchar(255) DEFAULT NULL,
  `password_salt` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `user_avatar` longtext,
  `is_user_deleted` tinyint NOT NULL DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `hotel_details` (`hotel_id`, `hotel_name`, `hotel_user_id`, `hotel_web_url`, `address`, `hotel_contact_number`, `location_url`, `is_deleted`, `created_at`) VALUES
('4ed2c700-59c3-4baa-967f-4ea7868df323', 'Cafe 360', 'f27a6f71-7cbc-4293-8d2b-6f2320c4f33d', NULL, 'Tamil Nadu, Karur', NULL, NULL, 0, NULL),
('8fd66250-ac9d-4fa2-ae89-c8cdf0f7f945', 'Delhi Dharbar', '8b0461a9-b0e0-4c0d-bd17-72c3ee370c37', NULL, 'Tamilnadu, Karur', NULL, NULL, 0, '2022-05-16 20:09:35');

INSERT INTO `hotel_menu` (`menu_id`, `menu_name`, `menu_user_id`, `menu_hotel_id`, `is_menu_deleted`, `created_at`, `menu_type`) VALUES
(1, 'ASDE', 'f27a6f71-7cbc-4293-8d2b-6f2320c4f33d', '4ed2c700-59c3-4baa-967f-4ea7868df323', 1, NULL, 1),
(2, 'ITLY', 'f27a6f71-7cbc-4293-8d2b-6f2320c4f33d', '4ed2c700-59c3-4baa-967f-4ea7868df323', 1, NULL, 2),
(3, 'itly', 'f27a6f71-7cbc-4293-8d2b-6f2320c4f33d', '4ed2c700-59c3-4baa-967f-4ea7868df323', 0, '2022-05-15 01:20:30', 1),
(4, 'Briyani', 'f27a6f71-7cbc-4293-8d2b-6f2320c4f33d', '4ed2c700-59c3-4baa-967f-4ea7868df323', 0, '2022-05-15 01:20:30', 2),
(5, 'Chicken Fried Rice', 'f27a6f71-7cbc-4293-8d2b-6f2320c4f33d', '4ed2c700-59c3-4baa-967f-4ea7868df323', 0, '2022-05-16 20:02:06', 2),
(6, 'Chicken Mughal Briyani', '8b0461a9-b0e0-4c0d-bd17-72c3ee370c37', '8fd66250-ac9d-4fa2-ae89-c8cdf0f7f945', 0, '2022-05-16 20:11:16', 2),
(7, 'Chicken 65', '8b0461a9-b0e0-4c0d-bd17-72c3ee370c37', '8fd66250-ac9d-4fa2-ae89-c8cdf0f7f945', 0, '2022-05-16 20:11:16', 4);

INSERT INTO `hotel_tables` (`table_id`, `table_name`, `table_user_id`, `table_hotel_id`, `is_table_deleted`, `table_created_at`, `table_seat_count`) VALUES
('04092727-dd96-47dc-a7b2-0c21c88c3144', 'Table 1', 'f27a6f71-7cbc-4293-8d2b-6f2320c4f33d', '4ed2c700-59c3-4baa-967f-4ea7868df323', 0, '2022-05-15 16:26:51', 4),
('449fa683-5640-4ff7-a2fa-1c13bcb14791', 'Table 2', 'f27a6f71-7cbc-4293-8d2b-6f2320c4f33d', '4ed2c700-59c3-4baa-967f-4ea7868df323', 0, '2022-05-15 16:58:09', 8),
('75ca588a-3738-4d57-95c2-378e8565e6a5', 'Table 4', 'f27a6f71-7cbc-4293-8d2b-6f2320c4f33d', '4ed2c700-59c3-4baa-967f-4ea7868df323', 0, '2022-05-15 16:58:09', 6),
('b3dd2307-ce74-441f-a7d6-2f3e74581f10', 'Table 12', 'f27a6f71-7cbc-4293-8d2b-6f2320c4f33d', '4ed2c700-59c3-4baa-967f-4ea7868df323', 1, '2022-05-15 16:25:02', 5),
('ce31f262-31a7-4700-98de-ca102362bb3f', 'Table 3', 'f27a6f71-7cbc-4293-8d2b-6f2320c4f33d', '4ed2c700-59c3-4baa-967f-4ea7868df323', 0, '2022-05-15 16:58:09', 6);

INSERT INTO `menu_type` (`menu_type_id`, `menu_type_name`) VALUES
(1, 'Breakfast'),
(2, 'Lunch'),
(3, 'Dinner'),
(4, 'Snacks');

INSERT INTO `user_type` (`user_type_id`, `user_type_name`) VALUES
(1, 'hotel'),
(2, 'customer');

INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `email`, `user_address`, `contact_number`, `user_type`, `location_url`, `password_salt`, `password`, `user_avatar`, `is_user_deleted`, `created_at`) VALUES
('8b0461a9-b0e0-4c0d-bd17-72c3ee370c37', 'Janani', '', 'padmesh@gmail.com', 'Tamilnadu, Karur', NULL, 1, NULL, '$2a$10$YfB4AC68UjC0nnGJnhFLOO', '$2a$10$YfB4AC68UjC0nnGJnhFLOOPcnV/ladK/9WJOlEoyjXJenjU77Yg8S', '[https://firebasestorage.googleapis.com/v0/b/fir-file-upload-a23df.appspot.com/o/images%2F1652711952397Screenshot (1).png?alt=media&token=6a4450b9-54db-4518-bc08-6ae3db6b97fd](https://firebasestorage.googleapis.com/v0/b/fir-file-upload-a23df.appspot.com/o/images%2F1652711952397Screenshot%20(1).png?alt=media&token=6a4450b9-54db-4518-bc08-6ae3db6b97fd)', 0, '2022-05-16 20:09:35'),
('9449f51c-c555-4f71-8962-770632e60164', 'Sachin', '', 'elavarasan@bititude.com', NULL, NULL, 2, NULL, '$2a$10$KesO2efNZD.bLq3kycEPFO', '$2a$10$KesO2efNZD.bLq3kycEPFO78x3brhcfV.Ti2VCBkrmsJZaVueZLbS', NULL, 0, NULL),
('f27a6f71-7cbc-4293-8d2b-6f2320c4f33d', 'Elavarasan', 'M', 'elavarasanmurugesandevi@gmail.com', NULL, NULL, 1, NULL, '$2a$10$UG8p9Hx0kpNj1uiXWnUYw.', '$2a$10$UG8p9Hx0kpNj1uiXWnUYw.NrP3scSgxhgBfWS7QLgRDs7RUitrk5C', 'https://firebasestorage.googleapis.com/v0/b/fir-file-upload-a23df.appspot.com/o/images%2F1652500765221alessandro-erbetta-mpWPcRT9D1E-unsplash.jpg?alt=media&token=3f7ad686-c68f-4091-9dea-100c3b195ec6', 0, NULL);



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;