/*
SQLyog Community v13.1.7 (64 bit)
MySQL - 5.5.62 : Database - travelsayapp
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`travelsayapp` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `travelsayapp`;

/*Table structure for table `contact` */

DROP TABLE IF EXISTS `contact`;

CREATE TABLE `contact` (
  `PurchaseId` int(10) NOT NULL,
  `ContactDetailsName` varchar(255) NOT NULL,
  `ContactDetailsEmail` varchar(255) NOT NULL,
  `ContactDetailsMobile` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `contact` */

/*Table structure for table `facilities` */

DROP TABLE IF EXISTS `facilities`;

CREATE TABLE `facilities` (
  `PassengersId` int(10) NOT NULL,
  `PurchaseId` int(10) NOT NULL,
  `Baggage` int(20) NOT NULL,
  `SeatNumber` varchar(255) NOT NULL,
  `SeatNumberType` varchar(255) NOT NULL,
  `Code` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `facilities` */

/*Table structure for table `flightlist` */

DROP TABLE IF EXISTS `flightlist`;

CREATE TABLE `flightlist` (
  `PurchaseId` int(10) NOT NULL,
  `AirlineName` varchar(100) NOT NULL,
  `CODE` varchar(100) NOT NULL,
  `FromAirport` varchar(255) NOT NULL,
  `ToAirport` varchar(255) NOT NULL,
  `DepartureDate` date NOT NULL,
  `DepartureDateTime` datetime NOT NULL,
  `ArrivalDateTime` datetime NOT NULL,
  `DurationFlight` varchar(255) NOT NULL,
  `SeatClass` varchar(255) NOT NULL,
  `Entertainment` tinyint(1) NOT NULL,
  `Wifi` tinyint(1) NOT NULL,
  `PowerOrUSBPort` tinyint(1) NOT NULL,
  `Meals` tinyint(1) NOT NULL,
  `AircraftType` varchar(255) NOT NULL,
  `SeatLayout` varchar(255) NOT NULL,
  `SeatPitch` varchar(255) NOT NULL,
  `NumberTransit` int(10) NOT NULL,
  `TransitLocation` varchar(255) NOT NULL,
  `TransitDuration` varchar(255) NOT NULL,
  `Price` bigint(50) NOT NULL,
  `BaggageOrdered` varchar(255) NOT NULL,
  `SeatNumberOrdered` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `flightlist` */

/*Table structure for table `insurances` */

DROP TABLE IF EXISTS `insurances`;

CREATE TABLE `insurances` (
  `PurchaseId` int(10) NOT NULL,
  `TravelInsurance` tinyint(1) NOT NULL,
  `Covid19Insurance` tinyint(1) NOT NULL,
  `FlightDelayInsurance` tinyint(1) NOT NULL,
  `BaggageLossProtection` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `insurances` */

/*Table structure for table `passengers` */

DROP TABLE IF EXISTS `passengers`;

CREATE TABLE `passengers` (
  `PassengersId` int(10) NOT NULL AUTO_INCREMENT,
  `PurchaseId` int(10) NOT NULL,
  `NAME` varchar(255) NOT NULL,
  `BirthDate` varchar(255) NOT NULL,
  `Nationality` varchar(255) NOT NULL,
  `PersonClass` varchar(255) NOT NULL,
  PRIMARY KEY (`PassengersId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `passengers` */

/*Table structure for table `purchase` */

DROP TABLE IF EXISTS `purchase`;

CREATE TABLE `purchase` (
  `PurchaseId` int(10) NOT NULL AUTO_INCREMENT,
  `Username` varchar(100) NOT NULL,
  `TotalPassengers` int(10) NOT NULL,
  `TotalPrice` bigint(50) NOT NULL,
  `StatusPayment` varchar(255) NOT NULL,
  `VirtualAccountOfPayment` varchar(255) NOT NULL,
  PRIMARY KEY (`PurchaseId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `purchase` */

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `Username` varchar(100) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Image` varchar(255) DEFAULT NULL,
  `Phone` varchar(255) DEFAULT NULL,
  `Points` int(20) DEFAULT NULL,
  `TravelsayPay` int(20) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `user` */

insert  into `user`(`ID`,`Username`,`Password`,`Name`,`Image`,`Phone`,`Points`,`TravelsayPay`) values 
(1,'fian1@gmail.com','Fian123@','Fian','https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557216671.5403_tunyra_n.jpg','+6283695765777',0,250000),
(2,'john1@gmail.com','John123@','John','https://i.pinimg.com/736x/29/a8/0b/29a80b9fdd5ff4cfc3eef5476d6740f1.jpg','+6285615764351',0,50000);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
