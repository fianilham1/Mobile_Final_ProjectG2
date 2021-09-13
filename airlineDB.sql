/*
SQLyog Community v13.1.7 (64 bit)
MySQL - 5.5.62 : Database - airline
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`airline` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `airline`;

/*Table structure for table `citilank` */

DROP TABLE IF EXISTS `citilank`;

CREATE TABLE `citilank` (
  `FlightID` int(10) NOT NULL AUTO_INCREMENT,
  `AirlineName` varchar(100) NOT NULL,
  `CODE` varchar(100) NOT NULL,
  `FromAirport` varchar(255) NOT NULL,
  `ToAirport` varchar(255) NOT NULL,
  `DepartureDate` date NOT NULL,
  `DepartureDateTime` datetime NOT NULL,
  `ArrivalDateTime` datetime NOT NULL,
  `SeatClass` varchar(255) NOT NULL,
  `NumberBaggageAvailable` int(20) NOT NULL,
  `BaggageData` varchar(255) NOT NULL,
  `NumberSeatAvailable` int(20) NOT NULL,
  `SeatRegularZone` varchar(255) NOT NULL,
  `SeatGreenZone` varchar(255) NOT NULL,
  `SeatSold` varchar(255) NOT NULL,
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
  PRIMARY KEY (`FlightID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `citilank` */

insert  into `citilank`(`FlightID`,`AirlineName`,`CODE`,`FromAirport`,`ToAirport`,`DepartureDate`,`DepartureDateTime`,`ArrivalDateTime`,`SeatClass`,`NumberBaggageAvailable`,`BaggageData`,`NumberSeatAvailable`,`SeatRegularZone`,`SeatGreenZone`,`SeatSold`,`Entertainment`,`Wifi`,`PowerOrUSBPort`,`Meals`,`AircraftType`,`SeatLayout`,`SeatPitch`,`NumberTransit`,`TransitLocation`,`TransitDuration`,`Price`) values 
(1,'Citilank','CL815','Surabaya - SUB','Balikpapan - BPN','2021-09-12','2021-09-12 09:30:00','2021-09-12 11:15:00','Economy',250,'20/25/30',6,'A-1/A-2/B-1/C-2','B-2/C-1','D-1/D-2',1,0,0,0,'Boeing 737-500','3-3','29-inch',0,'','',1450000);

/*Table structure for table `garada` */

DROP TABLE IF EXISTS `garada`;

CREATE TABLE `garada` (
  `FlightID` int(10) NOT NULL AUTO_INCREMENT,
  `AirlineName` varchar(100) NOT NULL,
  `CODE` varchar(100) NOT NULL,
  `FromAirport` varchar(255) NOT NULL,
  `ToAirport` varchar(255) NOT NULL,
  `DepartureDate` date NOT NULL,
  `DepartureDateTime` datetime NOT NULL,
  `ArrivalDateTime` datetime NOT NULL,
  `SeatClass` varchar(255) NOT NULL,
  `NumberBaggageAvailable` int(20) NOT NULL,
  `BaggageData` varchar(255) NOT NULL,
  `NumberSeatAvailable` int(20) NOT NULL,
  `SeatRegularZone` varchar(255) NOT NULL,
  `SeatGreenZone` varchar(255) NOT NULL,
  `SeatSold` varchar(255) NOT NULL,
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
  PRIMARY KEY (`FlightID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `garada` */

insert  into `garada`(`FlightID`,`AirlineName`,`CODE`,`FromAirport`,`ToAirport`,`DepartureDate`,`DepartureDateTime`,`ArrivalDateTime`,`SeatClass`,`NumberBaggageAvailable`,`BaggageData`,`NumberSeatAvailable`,`SeatRegularZone`,`SeatGreenZone`,`SeatSold`,`Entertainment`,`Wifi`,`PowerOrUSBPort`,`Meals`,`AircraftType`,`SeatLayout`,`SeatPitch`,`NumberTransit`,`TransitLocation`,`TransitDuration`,`Price`) values 
(1,'Garada','GA305','Surabaya - SUB','Balikpapan - BPN','2021-09-12','2021-09-12 06:00:00','2021-09-12 08:40:00','Economy',300,'20/25/30/35',6,'A-1/A-2/B-1/C-2','B-2/C-1','D-1/D-2',1,1,0,0,'Boeing 737-800','3-3','31-inch',1,'Jakarta(CKG)','03:40',2000000);

/*Table structure for table `srijaya` */

DROP TABLE IF EXISTS `srijaya`;

CREATE TABLE `srijaya` (
  `FlightID` int(10) NOT NULL AUTO_INCREMENT,
  `AirlineName` varchar(100) NOT NULL,
  `Code` varchar(100) NOT NULL,
  `FromAirport` varchar(255) NOT NULL,
  `ToAirport` varchar(255) NOT NULL,
  `DepartureDate` date NOT NULL,
  `DepartureDateTime` datetime NOT NULL,
  `ArrivalDateTime` datetime NOT NULL,
  `SeatClass` varchar(255) NOT NULL,
  `NumberBaggageAvailable` int(20) NOT NULL,
  `BaggageData` varchar(255) NOT NULL,
  `NumberSeatAvailable` int(20) NOT NULL,
  `SeatRegularZone` varchar(255) NOT NULL,
  `SeatGreenZone` varchar(255) NOT NULL,
  `SeatSold` varchar(255) NOT NULL,
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
  PRIMARY KEY (`FlightID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `srijaya` */

insert  into `srijaya`(`FlightID`,`AirlineName`,`Code`,`FromAirport`,`ToAirport`,`DepartureDate`,`DepartureDateTime`,`ArrivalDateTime`,`SeatClass`,`NumberBaggageAvailable`,`BaggageData`,`NumberSeatAvailable`,`SeatRegularZone`,`SeatGreenZone`,`SeatSold`,`Entertainment`,`Wifi`,`PowerOrUSBPort`,`Meals`,`AircraftType`,`SeatLayout`,`SeatPitch`,`NumberTransit`,`TransitLocation`,`TransitDuration`,`Price`) values 
(1,'Srijaya','SJ555','Balikpapan - BPN','Surabaya - SUB','2021-09-14','2021-09-14 15:15:00','2021-09-14 16:35:00','Economy',220,'20/25',6,'A-1/A-2/B-1/C-2','B-2/C-1','D-1/D-2',1,0,0,0,'Boeing 751-250','3-3','30-inch',0,'','',1500000);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
