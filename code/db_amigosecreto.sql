-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema amigosecretold
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema amigosecretold
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `amigosecretold` DEFAULT CHARACTER SET utf8mb4 ;
USE `amigosecretold` ;

-- -----------------------------------------------------
-- Table `amigosecretold`.`groups`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `amigosecretold`.`groups` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `groupname` VARCHAR(45) NOT NULL,
  `firstcandy` VARCHAR(45) NOT NULL,
  `secondcandy` VARCHAR(45) NOT NULL,
  `finalmeeting` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 13
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `amigosecretold`.`members`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `amigosecretold`.`members` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `lastname` VARCHAR(100) NOT NULL,
  `idcard` VARCHAR(45) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `like` VARCHAR(200) NOT NULL,
  `dislike` VARCHAR(200) NOT NULL,
  `alergies` VARCHAR(200) NOT NULL,
  `rol` TINYINT(10) NOT NULL,
  `id_member` INT(11) NULL DEFAULT NULL,
  `id_groups` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `idcard_UNIQUE` (`idcard` ASC) VISIBLE,
  UNIQUE INDEX `id_member_UNIQUE` (`id_member` ASC) VISIBLE,
  INDEX `id_groups_idx` (`id_groups` ASC) VISIBLE,
  CONSTRAINT `id_groups`
    FOREIGN KEY (`id_groups`)
    REFERENCES `amigosecretold`.`groups` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 25
DEFAULT CHARACTER SET = utf8mb4;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
