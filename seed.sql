
-- ---
-- Table 'Reviews'
-- Schema - Public
-- ---

DROP TABLE IF EXISTS public.reviews;

CREATE TABLE IF NOT EXISTS public.reviews
(
    review_id serial NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 ),
    product_id integer NOT NULL,
    rating integer,
    date timestamp with time zone,
    summary character varying(60),
    body character varying(1000),
    recommend boolean,
    reported boolean,
    reviewer_name character varying(60),
    reviewer_email character varying(60),
    response character varying(1000),
    helpfulness integer,
    PRIMARY KEY (review_id)
);




CREATE TABLE IF NOT EXISTS public.reviews
(
    review_id serial NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 ),
    product_id integer NOT NULL,
    rating integer,
    date timestamp with time zone,
    summary character varying(60),
    body character varying(1000),
    recommend boolean,
    reported boolean,
    reviewer_name character varying(60),
    reviewer_email character varying(60),
    response character varying(1000),
    helpfulness integer,
    PRIMARY KEY (review_id)
);

-- ---
-- Table 'Characteristics'
--
-- ---

DROP TABLE IF EXISTS `Characteristics`;

CREATE TABLE `Characteristics` (
  `id` INTEGER NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `product_id` INTEGER NOT NULL,
  `characteristic_types_id` INTEGER NOT NULL,
  `avg_rating` DECIMAL NULL DEFAULT NULL,
  `total_ratings` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY (`product_id`)
);

-- ---
-- Table 'ratings'
--
-- ---

DROP TABLE IF EXISTS `ratings`;

CREATE TABLE `ratings` (
  `product_id` INTEGER NOT NULL DEFAULT NULL,
  `1stars` INTEGER NULL DEFAULT NULL,
  `2stars` INTEGER NULL DEFAULT NULL,
  `3stars` INTEGER NULL DEFAULT NULL,
  `4stars` INTEGER NULL DEFAULT NULL,
  `5stars` INTEGER NULL DEFAULT NULL,
  `recommended_true` INTEGER NULL DEFAULT NULL,
  `recommended_false` INTEGER NULL DEFAULT NULL,
  UNIQUE KEY (`product_id`)
);

-- ---
-- Table 'characteristic_types'
-- One for each of the 6 characteristic types
-- ---

DROP TABLE IF EXISTS `characteristic_types`;

CREATE TABLE `characteristic_types` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`id`)
) COMMENT 'One for each of the 6 characteristic types';

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `Characteristics` ADD FOREIGN KEY (characteristic_types_id) REFERENCES `characteristic_types` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Reviews` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Characteristics` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `ratings` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `characteristic_types` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Reviews` (`review_id`,`product_id`,`rating`,`summary`,`recommend`,`response`,`body`,`date`,`reviewer_name`,`helpfulness`,`photos`) VALUES
-- ('','','','','','','','','','','');
-- INSERT INTO `Characteristics` (`id`,`product_id`,`characteristic_types_id`,`avg_rating`,`total_ratings`) VALUES
-- ('','','','','');
-- INSERT INTO `ratings` (`product_id`,`1stars`,`2stars`,`3stars`,`4stars`,`5stars`,`recommended_true`,`recommended_false`) VALUES
-- ('','','','','','','','');
-- INSERT INTO `characteristic_types` (`id`,`name`) VALUES
-- ('','');