-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 04, 2021 at 06:45 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--
CREATE DATABASE IF NOT EXISTS `test` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `test`;

-- --------------------------------------------------------

--
-- Table structure for table `approvedloans`
--

DROP TABLE IF EXISTS `approvedloans`;
CREATE TABLE `approvedloans` (
  `loanId` bigint(20) NOT NULL,
  `loanCategory` text NOT NULL,
  `loanDurationMonth` int(11) NOT NULL,
  `loanInterest` int(11) NOT NULL,
  `loanAmount` bigint(20) NOT NULL,
  `proofName` text NOT NULL,
  `proofId` text NOT NULL,
  `cibilScore` text NOT NULL,
  `userId` text NOT NULL,
  `dateOfApply` timestamp NOT NULL DEFAULT current_timestamp(),
  `dateOfApproval` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` text NOT NULL,
  `pendingAmount` bigint(20) NOT NULL,
  `pendingDuration` bigint(20) NOT NULL,
  `approvedBy` text NOT NULL,
  `approvedFlag` char(1) NOT NULL DEFAULT 'N',
  `loanStatus` varchar(10) NOT NULL DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `approvedloans`
--

INSERT INTO `approvedloans` (`loanId`, `loanCategory`, `loanDurationMonth`, `loanInterest`, `loanAmount`, `proofName`, `proofId`, `cibilScore`, `userId`, `dateOfApply`, `dateOfApproval`, `status`, `pendingAmount`, `pendingDuration`, `approvedBy`, `approvedFlag`, `loanStatus`) VALUES
(1418685, 'Personal Loan', 3, 2, 3000000, 'Pan', 'zz17261', '123', 'admin@user.com', '2021-03-03 18:00:19', '2021-03-03 17:59:47', 'Rejected', 0, 0, '', 'N', 'Pending'),
(2689380, 'Home Loan', 6, 3, 5000000, 'Voter', 'zz17261', '12312', 'admin@user.com', '2021-03-03 23:06:42', '2021-03-03 23:06:42', 'Approved', 5150000, 6, 'admin@manager.com', 'Y', 'Pending'),
(9917159, 'Home Loan', 6, 3, 1400000, 'License', '123', '12321', 'admin@user.com', '2021-03-03 22:26:07', '2021-03-03 22:26:07', 'Approved', 1442000, 6, 'admin@manager.com', 'Y', 'Pending'),
(17750972, 'Vehicle Loan', 6, 3, 1000000, 'Voter', '12', '123', 'admin@user.com', '2021-03-03 12:34:39', '2021-03-03 18:04:39', 'Pending', 0, 0, '', 'N', 'Pending'),
(23761067, 'Vehicle Loan', 3, 2, 1000000, 'Voter', 'zz17261', '1231', 'admin@user.com', '2021-03-03 12:44:30', '2021-03-03 18:14:30', 'Pending', 0, 0, '', 'N', 'Pending'),
(24350836, 'Home Loan', 6, 3, 1000000, '123', '213', '123', 'admin@user.com', '2021-03-03 12:50:44', '2021-03-04 03:58:21', 'Rejected', 0, 0, '', 'N', 'Pending'),
(30629344, 'Home Loan', 6, 3, 1000000, 'Voter', 'asfd', '123', 'admin@user.com', '2021-03-03 13:18:08', '2021-03-03 18:48:08', 'Pending', 0, 0, '', 'N', 'Pending'),
(30845761, 'Personal Loan', 6, 3, 1000000, 'asfd', 'safd', '12312', 'admin@user.com', '2021-03-03 12:46:56', '2021-03-04 03:58:08', 'Rejected', 0, 0, '', 'N', 'Pending'),
(32119172, 'Personal Loan', 6, 3, 1000000, '123', '123', '123', 'admin@user.com', '2021-03-03 13:16:33', '2021-03-03 18:46:33', 'Pending', 0, 0, '', 'N', 'Pending'),
(35272433, 'Vehicle Loan', 3, 2, 1000000, 'Voter', 'zz17261', '12', 'admin@user.com', '2021-03-03 18:54:29', '2021-03-03 12:33:33', 'Approved', 1020000, 3, 'admin@manager.com', 'Y', 'Pending'),
(38740353, 'Home Loan', 6, 3, 1000000, '123', '213', '123', 'admin@user.com', '2021-03-03 12:50:14', '2021-03-03 18:20:14', 'Pending', 0, 0, '', 'N', 'Pending'),
(48374062, 'Vehicle Loan', 6, 3, 1000000, 'Voter', '12312', '213', 'admin@user.com', '2021-03-03 13:12:26', '2021-03-03 18:42:26', 'Pending', 0, 0, '', 'N', 'Pending'),
(50020568, 'Vehicle Loan', 3, 2, 1000000, 'Voter', 'zz17261', '123', 'admin@user.com', '2021-03-03 13:08:41', '2021-03-03 18:38:41', 'Pending', 0, 0, '', 'N', 'Pending'),
(50504710, 'Personal Loan', 3, 2, 4000000, 'Pan', 'zz17261', '123', 'admin@user.com', '2021-03-03 18:03:15', '2021-03-04 03:27:20', 'Rejected', 0, 0, 'admin@manager.com', 'N', 'Pending'),
(54900012, 'Home Loan', 6, 3, 1000000, 'Voter', 'zz17261', '23123', 'admin@user.com', '2021-03-03 12:38:16', '2021-03-03 18:08:16', 'Pending', 0, 0, '', 'N', 'Pending'),
(54937363, 'Home Loan', 3, 2, 1000000, '123', '123', '123', 'admin@user.com', '2021-03-04 13:13:54', '2021-03-04 04:03:41', 'Rejected', 0, 0, 'admin@manager.com', 'N', 'Pending'),
(62100860, 'Personal Loan', 3, 2, 1000000, 'kn12', '12', '123', 'admin@user.com', '2021-03-03 12:45:07', '2021-03-03 18:15:07', 'Pending', 0, 0, '', 'N', 'Pending'),
(63721065, 'Vehicle Loan', 12, 4, 1000000, 'Voter', 'zz17261', '123', 'admin@user.com', '2021-03-03 12:41:06', '2021-03-04 03:39:19', 'Rejected', 0, 0, '', 'N', 'Pending'),
(67942792, 'Home Loan', 6, 3, 1000000, 'asfd', 'asfd', '12321', 'admin@user.com', '2021-03-03 13:10:55', '2021-03-03 18:40:55', 'Pending', 0, 0, '', 'N', 'Pending'),
(74438767, 'Personal Loan', 3, 2, 2000000, 'Pan', 'zz17261', '123', 'admin@user.com', '2021-03-03 17:54:53', '2021-03-03 12:24:30', 'Approved', 2040000, 3, 'admin@manager.com', 'Y', 'Pending'),
(77767364, 'Personal Loan', 6, 3, 1000000, 'Voter', 'zz17261', '1231', 'admin@user.com', '2021-03-03 17:48:01', '2021-03-03 11:54:41', 'Approved', 1030000, 6, 'admin@manager.com', 'Y', 'Pending'),
(80938316, 'Home Loan', 12, 4, 1200000, 'Voter', 'zz17261', '123', 'admin@user.com', '2021-03-03 22:24:52', '2021-03-04 03:54:52', 'Pending', 0, 0, '', 'N', 'Pending'),
(83223459, 'Personal Loan', 6, 3, 1000000, 'Voter', '123', '123', 'admin@user.com', '2021-03-03 13:17:09', '2021-03-04 03:39:27', 'Rejected', 0, 0, '', 'N', 'Pending'),
(88132518, 'Personal Loan', 6, 3, 12312323, 'Voter', '22', '2123', 'admin@user.com', '2021-03-03 17:57:24', '2021-03-04 03:27:16', 'Rejected', 0, 0, 'admin@manager.com', 'N', 'Pending'),
(98558887, 'Home Loan', 6, 3, 1000000, 'Voter', 'zz17261', '', 'admin@user.com', '2021-03-03 12:55:33', '2021-03-04 03:39:23', 'Rejected', 0, 0, '', 'N', 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `name` text NOT NULL,
  `userId` text NOT NULL,
  `password` text NOT NULL,
  `address` text NOT NULL,
  `mobile` text NOT NULL,
  `branchName` text NOT NULL,
  `role` varchar(10) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`name`, `userId`, `password`, `address`, `mobile`, `branchName`, `role`) VALUES
('kalai chelvan', 'admin@manager.com', 'admin', 'cuddalore', '9874563212', 'sbi - trp', 'manager'),
('kalai chelvan', 'admin@user.com', 'admin', 'cuddalore', '9874563212', '', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `approvedloans`
--
ALTER TABLE `approvedloans`
  ADD PRIMARY KEY (`loanId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userId`(50));
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
