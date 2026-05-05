/*
SQLyog Community v13.3.0 (64 bit)
MySQL - 5.7.44-log : Database - skill_india_db
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`skill_india_db` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `skill_india_db`;

/*Table structure for table `service_requests` */

DROP TABLE IF EXISTS `service_requests`;

CREATE TABLE `service_requests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_email` varchar(255) NOT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `mobile_number` varchar(20) NOT NULL,
  `worker_contact` varchar(20) NOT NULL,
  `worker_name` varchar(255) DEFAULT NULL,
  `worker_mobile` varchar(20) DEFAULT NULL,
  `worker_work_type` varchar(100) DEFAULT NULL,
  `work_type` varchar(100) NOT NULL,
  `problem_description` text NOT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `status` enum('pending','accepted','rejected','completed') DEFAULT 'pending',
  `rating` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `accepted_at` timestamp NULL DEFAULT NULL,
  `completed_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_user_email` (`user_email`),
  KEY `idx_worker_contact` (`worker_contact`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `service_requests` */

/*Table structure for table `support_issues` */

DROP TABLE IF EXISTS `support_issues`;

CREATE TABLE `support_issues` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `worker_contact` varchar(15) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `problem_description` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `support_issues` */

/*Table structure for table `tickets` */

DROP TABLE IF EXISTS `tickets`;

CREATE TABLE `tickets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `state` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `work_type` varchar(100) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `mobile_number` varchar(10) NOT NULL,
  `problem_description` text NOT NULL,
  `user_email` varchar(255) NOT NULL DEFAULT 'guest@example.com',
  `status` enum('pending','accepted','rejected','completed') DEFAULT 'pending',
  `accepted_worker_id` int(11) DEFAULT NULL,
  `accepted_worker_name` varchar(100) DEFAULT NULL,
  `accepted_worker_mobile` varchar(10) DEFAULT NULL,
  `accepted_worker_latitude` decimal(10,8) DEFAULT NULL,
  `accepted_worker_longitude` decimal(11,8) DEFAULT NULL,
  `accepted_worker_work_type` varchar(100) DEFAULT NULL,
  `accepted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `rating` int(11) DEFAULT '0',
  `completed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_status` (`status`),
  KEY `idx_city_work` (`city`,`work_type`),
  KEY `idx_worker_mobile` (`accepted_worker_mobile`),
  KEY `idx_user_email` (`user_email`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;

/*Data for the table `tickets` */

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) NOT NULL,
  `email_id` varchar(100) NOT NULL,
  `mobile_no` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  `state_name` varchar(100) NOT NULL,
  `city_name` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(20) DEFAULT 'Active',
  `deactivated_at` datetime DEFAULT NULL,
  `pet_name` varchar(255) DEFAULT NULL COMMENT 'Security Question 1: Pet nickname',
  `teacher_name` varchar(255) DEFAULT NULL COMMENT 'Security Question 2: Favorite teacher',
  `reset_token` varchar(255) DEFAULT NULL COMMENT 'Email password reset token',
  `reset_token_expiry` datetime DEFAULT NULL COMMENT 'Reset token expiry time',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_email` (`email_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

/*Data for the table `users` */

insert  into `users`(`id`,`full_name`,`email_id`,`mobile_no`,`password`,`state_name`,`city_name`,`created_at`,`status`,`deactivated_at`,`pet_name`,`teacher_name`,`reset_token`,`reset_token_expiry`,`updated_at`) values 
(13,'priya','priya@gmail.com','8857076322','$2b$10$rdpe6qpEUxSDHRQdfO9I2.c/yxXebvQ94js2fehiy7qaCcUAhKZ9O','Maharashtra','Pune','2026-04-28 12:48:29','Active',NULL,'khushi','vinod',NULL,NULL,'2026-04-28 12:48:29');

/*Table structure for table `workers` */

DROP TABLE IF EXISTS `workers`;

CREATE TABLE `workers` (
  `city` varchar(100) NOT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `worker_name` varchar(100) NOT NULL,
  `father_name` varchar(100) DEFAULT NULL,
  `mother_name` varchar(100) DEFAULT NULL,
  `contact` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  `experience` int(11) NOT NULL,
  `state` varchar(100) NOT NULL,
  `work_type` varchar(100) NOT NULL,
  `other_work` varchar(100) DEFAULT NULL,
  `registration_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deactivated_at` datetime DEFAULT NULL,
  `status` varchar(20) DEFAULT 'Active',
  `friend_name` varchar(255) DEFAULT NULL COMMENT 'Childhood best friend name for password recovery',
  `school_name` varchar(255) DEFAULT NULL COMMENT 'Primary school name for password recovery',
  `birthplace` varchar(255) DEFAULT NULL COMMENT 'Birthplace for password recovery',
  `completed_jobs` int(11) DEFAULT '0',
  PRIMARY KEY (`contact`),
  KEY `idx_worker_location` (`latitude`,`longitude`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `workers` */

insert  into `workers`(`city`,`latitude`,`longitude`,`worker_name`,`father_name`,`mother_name`,`contact`,`password`,`experience`,`state`,`work_type`,`other_work`,`registration_date`,`deactivated_at`,`status`,`friend_name`,`school_name`,`birthplace`,`completed_jobs`) values 
('Pune',18.60871300,73.75475600,'vinod kumar','madan prasad','juity devi','9881114267','$2b$10$WM6zGfGNt/K5bgceahIPEupMKPe1DrQrrtOk/fcfGmdJ4FuB5kcAm',18,'Maharashtra','Tiles Fitting','','2026-04-28 12:36:26',NULL,'Active','dipu','godawari','up',0);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
