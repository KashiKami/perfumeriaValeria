-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.1.37-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win32
-- HeidiSQL Versión:             10.0.0.5460
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para perfumeriavaleria
CREATE DATABASE IF NOT EXISTS `perfumeriavaleria` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `perfumeriavaleria`;

-- Volcando estructura para tabla perfumeriavaleria.productoproveedor
CREATE TABLE IF NOT EXISTS `productoproveedor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codeBar` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `amount` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_productoProveedor_productoinventario` (`codeBar`),
  KEY `FK_productoproveedor_user` (`email`),
  CONSTRAINT `FK_productoProveedor_productoinventario` FOREIGN KEY (`codeBar`) REFERENCES `productoinventario` (`codeBar`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_productoproveedor_user` FOREIGN KEY (`email`) REFERENCES `user` (`email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
