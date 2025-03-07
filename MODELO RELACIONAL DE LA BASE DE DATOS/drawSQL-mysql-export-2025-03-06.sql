CREATE TABLE `User`(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` TEXT NOT NULL,
    `email` TEXT NOT NULL
);
ALTER TABLE
    `User` ADD UNIQUE `user_email_unique`(`email`);
CREATE TABLE `Category`(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` TEXT NOT NULL
);
ALTER TABLE
    `Category` ADD UNIQUE `category_name_unique`(`name`);
CREATE TABLE `Movie`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `tittle` TEXT NOT NULL,
    `description` TEXT NULL,
    `relaseDate` DATETIME NOT NULL,
    `categoryId` INT NOT NULL
);
ALTER TABLE
    `Movie` ADD INDEX `movie_categoryid_index`(`categoryId`);
CREATE TABLE `MovieView`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `userId` INT NOT NULL,
    `movieId` INT NOT NULL,
    `viewedAt` DATETIME NOT NULL
);
ALTER TABLE
    `MovieView` ADD INDEX `movieview_userid_index`(`userId`);
ALTER TABLE
    `MovieView` ADD INDEX `movieview_movieid_index`(`movieId`);
ALTER TABLE
    `MovieView` ADD UNIQUE `movieview_userid_unique`(`userId`);
ALTER TABLE
    `MovieView` ADD UNIQUE `movieview_movieid_unique`(`movieId`);
ALTER TABLE
    `MovieView` ADD CONSTRAINT `movieview_movieid_foreign` FOREIGN KEY(`movieId`) REFERENCES `Movie`(`id`);
ALTER TABLE
    `Movie` ADD CONSTRAINT `movie_categoryid_foreign` FOREIGN KEY(`categoryId`) REFERENCES `Category`(`id`);
ALTER TABLE
    `MovieView` ADD CONSTRAINT `movieview_userid_foreign` FOREIGN KEY(`userId`) REFERENCES `User`(`id`);