CREATE TABLE `space` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`description` text,
	`ownerId` text NOT NULL,
	FOREIGN KEY (`ownerId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
