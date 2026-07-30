SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `slot_id` int(11) NOT NULL,
  `lesson_id` int(11) NOT NULL,
  `parent_booking_id` int(11) DEFAULT NULL,
  `client_firstname` varchar(255) NOT NULL,
  `client_lastname` varchar(255) NOT NULL,
  `client_email` varchar(255) NOT NULL,
  `client_phone` varchar(50) DEFAULT NULL,
  `participants` int(11) DEFAULT 1,
  `total_price_at_booking` decimal(10,2) DEFAULT NULL,
  `status` enum('PENDING','CONFIRMED','CANCELLED') DEFAULT 'PENDING',
  `cancelled_by` enum('CLIENT','COACH') DEFAULT NULL,
  `cancel_reason` varchar(500) DEFAULT NULL,
  `cancelled_at` datetime DEFAULT NULL,
  `cancel_token` varchar(36) DEFAULT NULL,
  `cancel_token_expires_at` datetime DEFAULT NULL,
  `review_email_sent_at` datetime DEFAULT NULL,
  `group_cancel_token` varchar(36) DEFAULT NULL,
  `balance_token` varchar(36) DEFAULT NULL,
  `sessions_required` int(11) DEFAULT 1,
  `notes` text DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `reminder_email_sent_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `slot_id`, `lesson_id`, `parent_booking_id`, `client_firstname`, `client_lastname`, `client_email`, `client_phone`, `participants`, `total_price_at_booking`, `status`, `cancelled_by`, `cancel_reason`, `cancelled_at`, `cancel_token`, `cancel_token_expires_at`, `review_email_sent_at`, `group_cancel_token`, `balance_token`, `sessions_required`, `notes`, `expires_at`, `created_at`, `updated_at`, `reminder_email_sent_at`) VALUES
(1, 2, 1, NULL, 'Test', 'User', 'test@example.com', '0211234567', 1, 60.00, 'CONFIRMED', NULL, NULL, NULL, '6af517f4-1c28-4e01-a2f4-bce74998eb08', '2026-07-13 10:00:00', '2026-07-20 15:00:00', NULL, NULL, 1, NULL, NULL, '2026-07-14 09:55:28', '2026-07-20 15:00:00', NULL),
(2, 3, 5, NULL, 'Pack', 'Tester', 'pack@example.com', NULL, 1, 160.00, 'CANCELLED', 'CLIENT', NULL, '2026-07-14 09:57:47', NULL, '2026-07-19 10:00:00', NULL, NULL, NULL, 3, NULL, NULL, '2026-07-14 09:56:12', '2026-07-14 09:57:47', NULL),
(3, 6, 5, 2, 'Pack', 'Tester', 'pack@example.com', NULL, 1, NULL, 'CANCELLED', 'CLIENT', NULL, '2026-07-14 09:57:47', NULL, '2026-07-22 10:00:00', NULL, NULL, NULL, 3, NULL, NULL, '2026-07-14 09:56:12', '2026-07-14 09:57:47', NULL),
(4, 5, 5, 2, 'Pack', 'Tester', 'pack@example.com', NULL, 1, NULL, 'CANCELLED', 'CLIENT', NULL, '2026-07-14 09:57:47', NULL, '2026-07-21 10:00:00', NULL, NULL, NULL, 3, NULL, NULL, '2026-07-14 09:56:12', '2026-07-14 09:57:47', NULL),
(5, 2, 5, NULL, 'Mix', 'Type', 'mix@example.com', NULL, 1, 160.00, 'CONFIRMED', NULL, NULL, NULL, '2ca183e6-6aa1-4c4a-b725-e41ea2992a66', '2026-07-13 10:00:00', '2026-07-23 20:00:00', 'c6d84226-a975-4919-92ce-3515eb92c68d', NULL, 3, NULL, NULL, '2026-07-14 09:56:13', '2026-07-23 20:00:00', NULL),
(6, 3, 5, 5, 'Mix', 'Type', 'mix@example.com', NULL, 1, NULL, 'CONFIRMED', NULL, NULL, NULL, 'a8994154-9f10-4878-affd-077a5809411b', '2026-07-19 10:00:00', NULL, NULL, NULL, 3, NULL, NULL, '2026-07-14 09:56:13', '2026-07-14 09:56:13', NULL),
(7, 4, 5, 5, 'Mix', 'Type', 'mix@example.com', NULL, 1, NULL, 'CONFIRMED', NULL, NULL, NULL, '6709a4fc-536c-475e-a4be-f0f7a669cbb0', '2026-07-20 10:00:00', NULL, NULL, NULL, 3, NULL, NULL, '2026-07-14 09:56:13', '2026-07-14 09:56:13', NULL),
(8, 6, 1, NULL, 'First', 'Taker', 'first@example.com', NULL, 1, 60.00, 'CANCELLED', 'CLIENT', NULL, '2026-07-14 09:57:22', NULL, '2026-07-22 10:00:00', NULL, NULL, NULL, 1, NULL, NULL, '2026-07-14 09:57:00', '2026-07-14 09:57:22', NULL),
(9, 3, 1, NULL, 'Urgent', 'Client', 'urgent@example.com', NULL, 1, 60.00, 'CONFIRMED', NULL, NULL, NULL, 'e22d0c06-d177-486b-ac7c-a7c5d79f0f1a', '2026-07-19 10:00:00', '2026-07-22 00:00:00', NULL, NULL, 1, NULL, NULL, '2026-07-14 09:58:10', '2026-07-22 00:00:00', NULL),
(10, 6, 1, NULL, 'test1', 'test1', 'ellinor.st@gmail.com', NULL, 1, 60.00, 'CONFIRMED', NULL, NULL, NULL, '284a8cf8-166e-4c0b-8866-4d4e6ae85d0d', '2026-07-21 22:00:00', '2026-07-25 04:00:00', NULL, NULL, 1, NULL, '2026-07-20 11:08:34', '2026-07-18 13:08:34', '2026-07-25 04:00:00', NULL),
(11, 7, 7, NULL, 'test2', 'ters2', 'ellinor.st@gmail.com', NULL, 1, 160.00, 'CONFIRMED', NULL, NULL, NULL, 'dc7cbaca-7315-4bf4-b800-63ad999fa175', '2026-07-19 02:00:00', '2026-07-26 06:00:00', 'ad5b2450-7608-4a7d-87aa-665f0fa6ea1c', NULL, 3, NULL, '2026-07-20 11:23:33', '2026-07-18 13:23:33', '2026-07-26 06:00:00', NULL),
(12, 11, 7, 11, 'test2', 'ters2', 'ellinor.st@gmail.com', NULL, 1, NULL, 'CONFIRMED', NULL, NULL, NULL, '1be4ac44-0529-465d-8e37-fe668b2ae713', '2026-07-19 23:00:00', NULL, NULL, NULL, 3, NULL, '2026-07-20 11:23:33', '2026-07-18 13:23:33', '2026-07-18 13:24:59', NULL),
(13, 13, 7, 11, 'test2', 'ters2', 'ellinor.st@gmail.com', NULL, 1, NULL, 'CONFIRMED', NULL, NULL, NULL, 'e9f9116f-e528-4448-90d5-0ad7b8a3152e', '2026-07-22 22:00:00', NULL, NULL, NULL, 3, NULL, '2026-07-20 11:23:33', '2026-07-18 13:23:33', '2026-07-18 13:30:06', NULL),
(14, 4, 5, NULL, 'testt', 'est3', 'ellinor.st@gmail.com', NULL, 1, 160.00, 'CONFIRMED', NULL, NULL, NULL, '3f4da2d1-f506-43e5-b9bb-a3772f1faa8d', '2026-07-19 22:00:00', '2026-07-24 01:00:01', 'a1bdb1c9-96cc-4c9e-8619-4651efffa873', NULL, 3, NULL, '2026-07-22 11:13:29', '2026-07-20 13:13:29', '2026-07-24 01:00:01', NULL),
(15, 17, 5, 14, 'testt', 'est3', 'ellinor.st@gmail.com', NULL, 1, NULL, 'CONFIRMED', NULL, NULL, NULL, '56bcc526-6ec7-4f96-a0e0-18d1e94c8e9e', '2026-07-20 02:00:00', NULL, NULL, NULL, 3, NULL, '2026-07-22 11:13:29', '2026-07-20 13:13:29', '2026-07-20 13:15:06', NULL),
(16, 5, 5, 14, 'testt', 'est3', 'ellinor.st@gmail.com', NULL, 1, NULL, 'CONFIRMED', NULL, NULL, NULL, '91570d54-75b9-496e-b70e-6fc0724c7c5d', '2026-07-20 22:00:00', NULL, NULL, NULL, 3, NULL, '2026-07-22 11:13:29', '2026-07-20 13:13:29', '2026-07-20 13:15:06', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `forms`
--

CREATE TABLE `forms` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` enum('CONTACT','SURF_TRIP_REQUEST') NOT NULL,
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `forms`
--

INSERT INTO `forms` (`id`, `name`, `type`, `is_active`) VALUES
(1, 'Surf Trip Request', 'SURF_TRIP_REQUEST', 1);

-- --------------------------------------------------------

--
-- Table structure for table `form_answers`
--

CREATE TABLE `form_answers` (
  `id` int(11) NOT NULL,
  `submission_id` int(11) NOT NULL,
  `field_id` int(11) DEFAULT NULL,
  `value` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `form_answers`
--

INSERT INTO `form_answers` (`id`, `submission_id`, `field_id`, `value`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'INTERMEDIATE', '2026-07-22 12:09:54', '2026-07-22 12:09:54'),
(2, 1, 2, 'ONCE_TWICE_MONTH', '2026-07-22 12:09:54', '2026-07-22 12:09:54'),
(3, 1, 3, 'INTERMEDIATE_WAVES', '2026-07-22 12:09:54', '2026-07-22 12:09:54'),
(4, 1, 4, 'REEF_BREAKS,POINT_BREAKS', '2026-07-22 12:09:54', '2026-07-22 12:09:54'),
(5, 1, 5, 'SHORTBOARD', '2026-07-22 12:09:54', '2026-07-22 12:09:54'),
(6, 1, 6, 'PERFORMANCE', '2026-07-22 12:09:54', '2026-07-22 12:09:54'),
(7, 1, 7, 'MID_COMFORT', '2026-07-22 12:09:54', '2026-07-22 12:09:54'),
(8, 1, 8, 'INTERMEDIATE', '2026-07-22 12:09:54', '2026-07-22 12:09:54'),
(9, 1, 9, 'SOLO', '2026-07-22 12:09:54', '2026-07-22 12:09:54'),
(10, 1, 10, 'PROGRESS,UNCROWDED,BUDGET,SCENIC,CULTURE,COMFORT', '2026-07-22 12:09:54', '2026-07-22 12:09:54'),
(11, 1, 11, '', '2026-07-22 12:09:54', '2026-07-22 12:09:54'),
(12, 1, 12, 'Feel confortable in the sea, but dont like waves that are too big', '2026-07-22 12:09:54', '2026-07-22 12:09:54');

-- --------------------------------------------------------

--
-- Table structure for table `form_fields`
--

CREATE TABLE `form_fields` (
  `id` int(11) NOT NULL,
  `form_id` int(11) NOT NULL,
  `label` varchar(255) NOT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `explanation` text DEFAULT NULL,
  `type` enum('SINGLE','MULTIPLE','RANK','TEXT') NOT NULL,
  `display_type` enum('CARDS','SLIDER','CHECKBOX','RADIO') DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `position` int(11) DEFAULT 0,
  `is_required` tinyint(1) DEFAULT 1,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `form_fields`
--

INSERT INTO `form_fields` (`id`, `form_id`, `label`, `subtitle`, `explanation`, `type`, `display_type`, `image_url`, `is_active`, `position`, `is_required`, `created_at`, `updated_at`) VALUES
(1, 1, 'How would you describe your surfing level?', 'Be honest 😉', 'This helps us find the safest and most fun waves for you. No judgment here!', 'SINGLE', 'SLIDER', NULL, 1, 1, 1, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(2, 1, 'How often do you paddle out?', NULL, NULL, 'SINGLE', 'RADIO', NULL, 1, 2, 1, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(3, 1, 'What type of waves are you most comfortable with?', 'Pick your playground', 'If you are unsure, just select the smallest option. Better safe than sorry!', 'MULTIPLE', 'CARDS', NULL, 1, 3, 1, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(4, 1, 'Have you tackled any of these before?', 'Select all that apply', 'Don\'t worry if you haven\'t! New Zealand has spots for all ocean knowledge levels.', 'MULTIPLE', 'CHECKBOX', NULL, 1, 4, 1, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(5, 1, 'What is your go-to board?', NULL, NULL, 'SINGLE', 'CARDS', NULL, 1, 5, 1, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(6, 1, 'What is the vibe of your ideal trip?', NULL, NULL, 'SINGLE', 'RADIO', NULL, 1, 6, 1, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(7, 1, 'How adventurous are you feeling?', NULL, NULL, 'SINGLE', 'SLIDER', NULL, 1, 7, 1, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(8, 1, 'What size waves are you chasing?', NULL, NULL, 'SINGLE', 'RADIO', NULL, 1, 8, 1, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(9, 1, 'Who\'s coming along for the ride?', 'Select all that apply', NULL, 'MULTIPLE', 'CHECKBOX', NULL, 1, 9, 1, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(10, 1, 'Rank what matters most to you on this trip', 'Drag to reorder', 'Put your top priority at the very top. This is the secret sauce for your custom itinerary.', 'RANK', NULL, NULL, 1, 10, 1, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(11, 1, 'Tell us a quick story: what is your best (or worst!) surf experience so far?', NULL, 'We love a good surf story, and it actually tells us a lot about your relationship with the ocean.', 'TEXT', NULL, NULL, 1, 11, 0, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(12, 1, 'Anything we should know about your confidence level in the ocean?', NULL, 'Total transparency keeps you safe. We\'ve seen it all, from deep water phobias to absolute fish-like comfort.', 'TEXT', NULL, NULL, 1, 12, 1, '2026-07-12 11:34:01', '2026-07-12 11:34:01');

-- --------------------------------------------------------

--
-- Table structure for table `form_field_options`
--

CREATE TABLE `form_field_options` (
  `id` int(11) NOT NULL,
  `field_id` int(11) NOT NULL,
  `label` varchar(500) NOT NULL,
  `value` varchar(500) NOT NULL,
  `feedback` varchar(500) DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `position` int(11) DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `form_field_options`
--

INSERT INTO `form_field_options` (`id`, `field_id`, `label`, `value`, `feedback`, `image_url`, `is_active`, `position`, `created_at`, `updated_at`) VALUES
(1, 1, 'Beginner — learning to paddle, stand up, or catch white-water waves', 'BEGINNER', 'Everyone starts somewhere! We\'ll get you standing up in no time. 🤙', NULL, 1, 1, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(2, 1, 'Lower-intermediate — catching small green waves, working on turns', 'LOWER_INTERMEDIATE', 'The best phase! We\'ll work on your wave reading.', NULL, 1, 2, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(3, 1, 'Intermediate — confident in most beach breaks', 'INTERMEDIATE', 'Awesome, New Zealand has endless beach breaks for you.', NULL, 1, 3, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(4, 1, 'Advanced — comfortable in bigger surf and reef breaks', 'ADVANCED', 'Nice. We know some secret spots you\'ll love.', NULL, 1, 4, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(5, 1, 'Expert — regularly surf powerful waves / barrels', 'EXPERT', 'Charging! Let\'s hunt some real swells.', NULL, 1, 5, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(6, 2, 'First surf trip / rarely surf', 'FIRST_TIME', 'You are going to be hooked.', NULL, 1, 1, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(7, 2, 'A few times a year', 'FEW_TIMES_YEAR', 'Let\'s make this trip count!', NULL, 1, 2, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(8, 2, '1–2 times per month', 'ONCE_TWICE_MONTH', 'Solid rhythm.', NULL, 1, 3, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(9, 2, '1–2 times per week', 'ONCE_TWICE_WEEK', 'A true local somewhere!', NULL, 1, 4, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(10, 2, 'Almost every day', 'ALMOST_DAILY', 'Living the dream.', NULL, 1, 5, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(11, 3, 'Small & mellow (ideal for learning / cruising)', 'SMALL_MELLOW', 'Smooth sailing. 🌊', NULL, 1, 1, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(12, 3, 'Fun and playful beach breaks', 'BEACH_BREAK', 'Perfect for trying new maneuvers.', NULL, 1, 2, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(13, 3, 'Consistent intermediate waves', 'INTERMEDIATE_WAVES', 'We\'ve got plenty of those on the West Coast.', NULL, 1, 3, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(14, 3, 'Powerful waves and bigger swells', 'POWERFUL', 'Hold on tight!', NULL, 1, 4, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(15, 3, 'I\'m flexible — depends on conditions', 'FLEXIBLE', 'The true surfer mindset.', NULL, 1, 5, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(16, 4, 'Rip currents', 'RIP_CURRENTS', NULL, NULL, 1, 1, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(17, 4, 'Reef breaks', 'REEF_BREAKS', NULL, NULL, 1, 2, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(18, 4, 'Point breaks', 'POINT_BREAKS', NULL, NULL, 1, 3, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(19, 4, 'Long paddle outs', 'LONG_PADDLE', 'Get those shoulders ready!', NULL, 1, 4, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(20, 4, 'None of the above / still learning', 'NONE', 'That\'s what we are here for.', NULL, 1, 5, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(21, 5, 'Soft-top / foamie', 'SOFT_TOP', 'Maximum fun, minimum stress.', NULL, 1, 1, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(22, 5, 'Longboard', 'LONGBOARD', 'Classic style.', NULL, 1, 2, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(23, 5, 'Funboard / Mid-length', 'FUNBOARD', 'The ultimate wave catcher.', NULL, 1, 3, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(24, 5, 'Shortboard', 'SHORTBOARD', 'Time to shred.', NULL, 1, 4, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(25, 5, 'Multiple boards depending on conditions', 'MULTIPLE', 'A true quiver builder.', NULL, 1, 5, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(26, 5, 'None of the above (never surfed)', 'NEVER_SURFED', 'We\'ll find the perfect match for you.', NULL, 1, 6, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(27, 6, 'Relaxed & family-friendly', 'FAMILY', NULL, NULL, 1, 1, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(28, 6, 'Surf & chill with friends', 'FRIENDS_CHILL', NULL, NULL, 1, 2, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(29, 6, 'Surf-focused performance trip', 'PERFORMANCE', NULL, NULL, 1, 3, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(30, 6, 'Road-trip adventure & discovery', 'ROAD_TRIP', NULL, NULL, 1, 4, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(31, 6, 'Romantic / couple escape', 'COUPLE', NULL, NULL, 1, 5, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(32, 6, 'Solo traveler social vibe', 'SOLO_SOCIAL', NULL, NULL, 1, 6, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(33, 7, 'Super easy — chill spots, short drives, reliable waves, plenty of downtime', 'COMFORT', 'We know the best cozy spots.', NULL, 1, 1, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(34, 7, 'Easy with a twist — mostly accessible spots with a few detours for better waves', 'MID_COMFORT', 'Easy days, good waves.', NULL, 1, 2, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(35, 7, 'Adventure-driven — regular drives to explore different breaks and conditions', 'ADVENTUROUS', 'We\'ll chase the best waves.', NULL, 1, 3, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(36, 7, 'Full send — long missions, remote spots, flexible plans to chase the best swell', 'ADVENTUROUS_PLUS', 'Off the beaten path we go!', NULL, 1, 4, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(37, 8, '1–2 ft — small & safe', 'SMALL', NULL, NULL, 1, 1, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(38, 8, '2–3 ft — fun & friendly', 'FUN', NULL, NULL, 1, 2, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(39, 8, '3–5 ft — intermediate challenge', 'INTERMEDIATE', NULL, NULL, 1, 3, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(40, 8, '5–7 ft — powerful surf', 'POWERFUL', NULL, NULL, 1, 4, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(41, 8, 'I\'ll follow your guidance', 'GUIDANCE', NULL, NULL, 1, 5, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(42, 9, 'Partner', 'PARTNER', NULL, NULL, 1, 1, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(43, 9, 'Friends group', 'FRIENDS', NULL, NULL, 1, 2, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(44, 9, 'Family with children', 'FAMILY', NULL, NULL, 1, 3, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(45, 9, 'Solo', 'SOLO', NULL, NULL, 1, 4, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(46, 9, 'Other (please specify)', 'OTHER', NULL, NULL, 1, 5, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(47, 10, 'Progressing my surf skills', 'PROGRESS', NULL, NULL, 1, 1, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(48, 10, 'Finding uncrowded surf spots', 'UNCROWDED', NULL, NULL, 1, 2, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(49, 10, 'Scenic road-trip experience', 'SCENIC', NULL, NULL, 1, 3, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(50, 10, 'Local culture & nature', 'CULTURE', NULL, NULL, 1, 4, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(51, 10, 'Comfort & easy logistics', 'COMFORT', NULL, NULL, 1, 5, '2026-07-12 11:34:01', '2026-07-12 11:34:01'),
(52, 10, 'Budget-friendly trip', 'BUDGET', NULL, NULL, 1, 6, '2026-07-12 11:34:01', '2026-07-12 11:34:01');

-- --------------------------------------------------------

--
-- Table structure for table `form_submissions`
--

CREATE TABLE `form_submissions` (
  `id` int(11) NOT NULL,
  `form_id` int(11) NOT NULL,
  `client_firstname` varchar(100) NOT NULL,
  `client_lastname` varchar(100) NOT NULL,
  `client_email` varchar(100) NOT NULL,
  `client_phone` varchar(100) DEFAULT NULL,
  `status` enum('NEW','READ','REPLIED','ARCHIVED') DEFAULT 'NEW',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `form_submissions`
--

INSERT INTO `form_submissions` (`id`, `form_id`, `client_firstname`, `client_lastname`, `client_email`, `client_phone`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'Arnaud', 'Etcheverry', 'arnetcheverry@gmail.com', NULL, 'READ', '2026-07-22 12:09:54', '2026-07-22 12:54:57');

-- --------------------------------------------------------

--
-- Table structure for table `lessons`
--

CREATE TABLE `lessons` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `type` enum('ADULTS','KIDS') NOT NULL DEFAULT 'ADULTS',
  `duration_minutes` int(11) NOT NULL,
  `max_participants` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `deposit_amount` decimal(10,2) NOT NULL,
  `level` enum('ALL','BEGINNER','INTERMEDIATE','ADVANCED') DEFAULT 'ALL',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_package` tinyint(1) NOT NULL DEFAULT 0,
  `sessions_count` int(11) NOT NULL DEFAULT 1,
  `base_lesson_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lessons`
--

INSERT INTO `lessons` (`id`, `title`, `type`, `duration_minutes`, `max_participants`, `price`, `deposit_amount`, `level`, `created_at`, `updated_at`, `is_package`, `sessions_count`, `base_lesson_id`) VALUES
(1, 'Group - Adults', 'ADULTS', 90, 4, 60.00, 60.00, 'ALL', '2026-07-13 12:17:59', '2026-07-13 16:22:19', 0, 1, NULL),
(2, 'Group - Kids', 'KIDS', 60, 4, 60.00, 40.00, 'ALL', '2026-07-13 12:17:59', '2026-07-17 13:40:52', 0, 1, NULL),
(5, '3-Pack — Adults', 'ADULTS', 90, 6, 160.00, 50.00, 'ALL', '2026-07-13 19:10:22', '2026-07-13 19:10:22', 1, 3, 1),
(6, '5-Pack — Adults', 'ADULTS', 90, 6, 250.00, 80.00, 'ALL', '2026-07-13 19:10:22', '2026-07-13 19:10:22', 1, 5, 1),
(7, '3-Pack — Kids', 'KIDS', 60, 6, 160.00, 50.00, 'ALL', '2026-07-13 19:10:22', '2026-07-17 13:40:52', 1, 3, 2),
(8, '5-Pack — Kids', 'KIDS', 60, 6, 250.00, 80.00, 'ALL', '2026-07-13 19:10:22', '2026-07-17 13:40:52', 1, 5, 2);

-- --------------------------------------------------------

--
-- Table structure for table `media`
--

CREATE TABLE `media` (
  `id` int(11) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `url` varchar(500) NOT NULL,
  `mime_type` varchar(100) DEFAULT NULL,
  `size_bytes` int(11) DEFAULT NULL,
  `alt` varchar(255) DEFAULT NULL,
  `uploaded_at` datetime DEFAULT current_timestamp(),
  `cloudinary_public_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `media`
--

INSERT INTO `media` (`id`, `filename`, `url`, `mime_type`, `size_bytes`, `alt`, `uploaded_at`, `cloudinary_public_id`) VALUES
(31, 'surfer-ocean-new-zealand.webp', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371781/alaia-surf/smiellaliohhjewonehe.webp', 'image/webp', 148900, 'Surfer riding a wave in the ocean, New Zealand', '2026-05-21 15:56:22', 'alaia-surf/smiellaliohhjewonehe'),
(32, 'new-zealand-night-sky-roadtrip.webp', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371782/alaia-surf/xd1kbfq78ssesmzjp5vt.webp', 'image/webp', 246934, 'Night sky during a road trip in New Zealand', '2026-05-21 15:56:23', 'alaia-surf/xd1kbfq78ssesmzjp5vt'),
(33, 'chasing-waves-road-trip.webp', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371783/alaia-surf/zgkepdzy0lvnj2u7qpzz.webp', 'image/webp', 169892, 'Chasing waves on a New Zealand road trip', '2026-05-21 15:56:24', 'alaia-surf/zgkepdzy0lvnj2u7qpzz'),
(34, 'surf-aerial-view.webp', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371784/alaia-surf/fq0o281g1kk1dhenvlsv.webp', 'image/webp', 256754, 'Aerial view of a surf break', '2026-05-21 15:56:25', 'alaia-surf/fq0o281g1kk1dhenvlsv'),
(35, 'van-roadtrip-new-zealand.webp', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371785/alaia-surf/kltuby2vrkyzghtjzeot.webp', 'image/webp', 163502, 'Van road trip through New Zealand', '2026-05-21 15:56:26', 'alaia-surf/kltuby2vrkyzghtjzeot'),
(36, 'sunset-ocean-roadtrip-van-new-zealand.webp', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371786/alaia-surf/oechyazulz7pypu1ecj7.webp', 'image/webp', 153012, 'Sunset over the ocean during a van road trip in New Zealand', '2026-05-21 15:56:27', 'alaia-surf/oechyazulz7pypu1ecj7'),
(37, 'surfboards-under-flax.webp', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371787/alaia-surf/esvdj5gkashhayapvujz.webp', 'image/webp', 210158, 'Surfboards resting under flax plants', '2026-05-21 15:56:28', 'alaia-surf/esvdj5gkashhayapvujz'),
(38, 'surf-west-coast-new-zealand.webp', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371788/alaia-surf/eodicbzxomcacqkqfkzp.webp', 'image/webp', 220306, 'Surfing the West Coast of New Zealand', '2026-05-21 15:56:29', 'alaia-surf/eodicbzxomcacqkqfkzp'),
(39, 'surfer-roadtrip-new-zealand.webp', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371789/alaia-surf/w0qabnxvbjmxn6x5aks9.webp', 'image/webp', 93198, 'Surfer on a New Zealand road trip', '2026-05-21 15:56:30', 'alaia-surf/w0qabnxvbjmxn6x5aks9'),
(40, 'roadtrip-ocean-sunset.webp', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371790/alaia-surf/cnzdrzxqkf6uqfksot0z.webp', 'image/webp', 72010, 'Ocean sunset during a road trip', '2026-05-21 15:56:31', 'alaia-surf/cnzdrzxqkf6uqfksot0z'),
(41, 'surf-instructor-paco-new-zealand.webp', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371791/alaia-surf/ct91azvupsopyngfh9e1.webp', 'image/webp', 194048, 'Paco, surf instructor, in New Zealand', '2026-05-21 15:56:31', 'alaia-surf/ct91azvupsopyngfh9e1'),
(42, 'Paco-Goalard-surf-instructor.webp', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371861/alaia-surf/zjfedvfev8dbut3wxrlp.webp', 'image/webp', 162634, 'Paco Goalard, surf instructor', '2026-05-21 15:57:42', 'alaia-surf/zjfedvfev8dbut3wxrlp'),
(44, 'muriwai-beach-in-new-zealand-landscape-web.mp4', 'https://res.cloudinary.com/dz8bupnto/video/upload/v1779372316/alaia-surf/dd3emacx5bcgbixlrtmg.mp4', 'video/mp4', 2923991, NULL, '2026-05-21 16:05:17', 'alaia-surf/dd3emacx5bcgbixlrtmg'),
(45, 'new-zealand-beach-discover-landscape-web.mp4', 'https://res.cloudinary.com/dz8bupnto/video/upload/v1779372317/alaia-surf/iq3kehca43jcks49pyzz.mp4', 'video/mp4', 1240711, NULL, '2026-05-21 16:05:18', 'alaia-surf/iq3kehca43jcks49pyzz'),
(46, 'new-zealand-beach-landscape-web.mp4', 'https://res.cloudinary.com/dz8bupnto/video/upload/v1779372319/alaia-surf/d3v99keh5deqdfws8htv.mp4', 'video/mp4', 1003367, NULL, '2026-05-21 16:05:21', 'alaia-surf/d3v99keh5deqdfws8htv'),
(47, 'new-zealand-ocean-road-landscape-web.mp4', 'https://res.cloudinary.com/dz8bupnto/video/upload/v1779372321/alaia-surf/ykzgpfosfz9hdenzppnx.mp4', 'video/mp4', 2991946, NULL, '2026-05-21 16:05:22', 'alaia-surf/ykzgpfosfz9hdenzppnx'),
(48, 'new-zealand-ocean-road-lanscape-web.mp4', 'https://res.cloudinary.com/dz8bupnto/video/upload/v1779372323/alaia-surf/rcdfwlvb6ufgfgzsyqcy.mp4', 'video/mp4', 1845967, NULL, '2026-05-21 16:05:24', 'alaia-surf/rcdfwlvb6ufgfgzsyqcy'),
(49, 'new-zealand-east-coast-surf-landscape-web.mp4', 'https://res.cloudinary.com/dz8bupnto/video/upload/v1779372324/alaia-surf/yhysodlwfsrdevjsi0by.mp4', 'video/mp4', 796660, NULL, '2026-05-21 16:05:26', 'alaia-surf/yhysodlwfsrdevjsi0by'),
(50, 'raglan-beach-in-new-zealand-landscape-web.mp4', 'https://res.cloudinary.com/dz8bupnto/video/upload/v1779372326/alaia-surf/fzon5shim6aokmiiaevh.mp4', 'video/mp4', 2633018, NULL, '2026-05-21 16:05:28', 'alaia-surf/fzon5shim6aokmiiaevh'),
(51, 'surf-lesson-beginner.jpg', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779373643/alaia-surf/hpo2dem08dmhzagml7j2.jpg', 'image/jpeg', 1130380, 'Surf group lesson for beginners', '2026-05-21 16:27:24', 'alaia-surf/hpo2dem08dmhzagml7j2'),
(52, 'surf-group-lesson-beginner.jpg', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779373644/alaia-surf/uiaussgbgrvytoqgom4q.jpg', 'image/jpeg', 783028, 'Beginner surf lesson', '2026-05-21 16:27:25', 'alaia-surf/uiaussgbgrvytoqgom4q'),
(53, 'Paco-surf-instructor-raglan-web.mp4', 'https://res.cloudinary.com/dz8bupnto/video/upload/v1779375310/alaia-surf/co2aazaouunhxouemvza.mp4', 'video/mp4', 2386907, NULL, '2026-05-21 16:55:11', 'alaia-surf/co2aazaouunhxouemvza'),
(54, 'new-zealand-surf-spot.webp', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779379786/alaia-surf/am2brubss0rr42ejbffm.webp', 'image/webp', 122916, 'New Zealand surf spot', '2026-05-21 18:09:47', 'alaia-surf/am2brubss0rr42ejbffm');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `currency` varchar(3) DEFAULT 'NZD',
  `type` enum('DEPOSIT','BALANCE') NOT NULL,
  `method` enum('STRIPE','ON_SITE','BANK_TRANSFER') NOT NULL DEFAULT 'STRIPE',
  `status` enum('PENDING','PAID','FAILED','REFUNDED') DEFAULT 'PENDING',
  `stripe_payment_intent_id` varchar(255) DEFAULT NULL,
  `stripe_charge_id` varchar(255) DEFAULT NULL,
  `paid_at` datetime DEFAULT NULL,
  `refunded_at` datetime DEFAULT NULL,
  `refund_amount` decimal(10,2) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` enum('SUPER_ADMIN','COACH','ASSISTANT') NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `description`, `created_at`) VALUES
(1, 'SUPER_ADMIN', 'Full access', '2026-04-26 12:39:12'),
(2, 'COACH', 'Surf coach access', '2026-04-26 12:39:12'),
(3, 'ASSISTANT', 'Limited access', '2026-04-26 12:39:12');

-- --------------------------------------------------------

--
-- Table structure for table `site_content`
--

CREATE TABLE `site_content` (
  `id` int(11) NOT NULL,
  `key_name` varchar(255) NOT NULL,
  `value` text DEFAULT NULL,
  `type` enum('TEXT','RICHTEXT','IMAGE_URL','NUMBER') NOT NULL DEFAULT 'TEXT',
  `page` varchar(100) NOT NULL,
  `label` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `site_content`
--

INSERT INTO `site_content` (`id`, `key_name`, `value`, `type`, `page`, `label`, `created_at`, `updated_at`) VALUES
(1, 'home_hero_title', 'Your next adventure starts here', 'TEXT', 'home', 'Hero Title', '2026-04-26 12:39:12', '2026-06-18 12:02:49'),
(2, 'home_hero_cta_lesson', 'Book a lesson', 'TEXT', 'home', 'Hero CTA Lesson', '2026-04-26 12:39:12', '2026-04-26 12:39:12'),
(3, 'home_hero_cta_trip', 'My surf trip', 'TEXT', 'home', 'Hero CTA Trip', '2026-04-26 12:39:12', '2026-04-26 12:39:12'),
(4, 'home_lesson_group_title', 'Group Lessons', 'TEXT', 'home', 'Lesson Group Title', '2026-04-26 12:39:12', '2026-04-26 12:39:12'),
(5, 'home_lesson_group_desc', 'Join a fun and energetic group session designed for adults of all levels. Learn the fundamentals of surfing alongside others.', 'RICHTEXT', 'home', 'Lesson Group Description', '2026-04-26 12:39:12', '2026-04-26 12:39:12'),
(6, 'home_lesson_group_b1', 'Learn to read waves and ocean safety', 'TEXT', 'home', 'Lesson Group Bullet 1', '2026-04-26 12:39:12', '2026-04-26 12:39:12'),
(7, 'home_lesson_group_b2', 'Master the pop-up technique', 'TEXT', 'home', 'Lesson Group Bullet 2', '2026-04-26 12:39:12', '2026-04-26 12:39:12'),
(8, 'home_lesson_group_b3', 'Ride your first waves in a small group', 'TEXT', 'home', 'Lesson Group Bullet 3', '2026-04-26 12:39:12', '2026-04-26 12:39:12'),
(9, 'home_lesson_private_title', 'Private Lessons', 'TEXT', 'home', 'Lesson Private Title', '2026-04-26 12:39:12', '2026-04-26 12:39:12'),
(10, 'home_lesson_private_desc', 'Get personalized one-on-one coaching tailored to your exact skill level. Perfect for rapid progression.', 'RICHTEXT', 'home', 'Lesson Private Description', '2026-04-26 12:39:12', '2026-04-26 12:39:12'),
(11, 'home_lesson_private_b1', '100% focused on your technique', 'TEXT', 'home', 'Lesson Private Bullet 1', '2026-04-26 12:39:12', '2026-04-26 12:39:12'),
(12, 'home_lesson_private_b2', 'Custom location based on your level', 'TEXT', 'home', 'Lesson Private Bullet 2', '2026-04-26 12:39:12', '2026-04-26 12:39:12'),
(13, 'home_lesson_private_b3', 'Flexible scheduling to suit you', 'TEXT', 'home', 'Lesson Private Bullet 3', '2026-04-26 12:39:12', '2026-04-26 12:39:12'),
(14, 'home_usp_main_title', 'Come catch some waves.', 'TEXT', 'home', 'USP Main Title', '2026-04-26 12:39:12', '2026-04-26 12:39:12'),
(15, 'home_usp_1_title', 'Safety', 'TEXT', 'home', 'USP 1 Title', '2026-04-26 12:39:12', '2026-04-26 12:39:12'),
(16, 'home_usp_1_desc', 'Your safety is our top priority. Certified instructors only.', 'TEXT', 'home', 'USP 1 Description', '2026-04-26 12:39:12', '2026-04-26 12:39:12'),
(17, 'home_usp_2_title', 'Progression', 'TEXT', 'home', 'USP 2 Title', '2026-04-26 12:39:12', '2026-04-26 12:39:12'),
(18, 'home_usp_2_desc', 'Structured coaching to ensure you make real progress.', 'TEXT', 'home', 'USP 2 Description', '2026-04-26 12:39:12', '2026-04-26 12:39:12'),
(19, 'home_usp_3_title', 'Fun', 'TEXT', 'home', 'USP 3 Title', '2026-04-26 12:39:12', '2026-04-26 12:39:12'),
(20, 'home_usp_3_desc', 'Surfing is all about smiles and good vibes.', 'TEXT', 'home', 'USP 3 Description', '2026-04-26 12:39:12', '2026-04-26 12:39:12'),
(21, 'home_usp_4_title', 'Small groups', 'TEXT', 'home', 'USP 4 Title', '2026-04-26 12:39:12', '2026-04-26 12:39:12'),
(22, 'home_usp_4_desc', 'Maximum 5 people per coach for better attention.', 'TEXT', 'home', 'USP 4 Description', '2026-04-26 12:39:12', '2026-04-26 12:39:12'),
(23, 'home_coach_title', 'About coach', 'TEXT', 'home', 'Coach Title', '2026-04-26 12:39:12', '2026-05-21 22:57:55'),
(24, 'home_coach_bio', 'Born and raised by the ocean, I have been surfing for over 20 years. After training in France, I moved to NZ to share my passion. My approach is simple: patient, personalized, and always fun.', 'RICHTEXT', 'home', 'Coach Bio', '2026-04-26 12:39:12', '2026-04-26 12:39:12'),
(44, 'home_lesson_group_image', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779373644/alaia-surf/uiaussgbgrvytoqgom4q.jpg', 'IMAGE_URL', 'home', 'Lesson Group Image', '2026-05-15 00:51:44', '2026-05-21 16:58:27'),
(45, 'home_lesson_private_image', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779373643/alaia-surf/hpo2dem08dmhzagml7j2.jpg', 'IMAGE_URL', 'home', 'Lesson Private Image', '2026-05-15 00:51:44', '2026-05-21 16:58:38'),
(46, 'home_lesson_coaching_title', 'Coaching', 'TEXT', 'home', 'Lesson Coaching Title', '2026-05-15 00:51:44', '2026-05-15 00:51:44'),
(47, 'home_lesson_coaching_desc', 'Tailored video analysis and feedback sessions to accelerate your progression wherever you are.', 'RICHTEXT', 'home', 'Lesson Coaching Description', '2026-05-15 00:51:44', '2026-05-15 00:51:44'),
(48, 'home_lesson_coaching_b1', 'Video analysis of your surfing', 'TEXT', 'home', 'Lesson Coaching Bullet 1', '2026-05-15 00:51:44', '2026-05-15 00:51:44'),
(49, 'home_lesson_coaching_b2', 'Personalised feedback report', 'TEXT', 'home', 'Lesson Coaching Bullet 2', '2026-05-15 00:51:44', '2026-05-15 00:51:44'),
(50, 'home_lesson_coaching_b3', 'Remote or in-person sessions', 'TEXT', 'home', 'Lesson Coaching Bullet 3', '2026-05-15 00:51:44', '2026-05-15 00:51:44'),
(51, 'home_lesson_coaching_image', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371789/alaia-surf/w0qabnxvbjmxn6x5aks9.webp', 'IMAGE_URL', 'home', 'Lesson Coaching Image', '2026-05-15 00:51:44', '2026-05-21 16:58:54'),
(52, 'home_hero_image', 'https://res.cloudinary.com/dz8bupnto/video/upload/v1779372326/alaia-surf/fzon5shim6aokmiiaevh.mp4', 'IMAGE_URL', 'home', 'Hero Background Image', '2026-05-15 21:30:34', '2026-06-14 18:33:31'),
(53, 'home_coach_image', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371791/alaia-surf/ct91azvupsopyngfh9e1.webp', 'IMAGE_URL', 'home', 'Coach Image', '2026-05-15 21:30:34', '2026-06-14 18:34:26'),
(54, 'home_simple_image', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371784/alaia-surf/fq0o281g1kk1dhenvlsv.webp', 'IMAGE_URL', 'home', 'Simple Image', '2026-05-15 21:30:34', '2026-05-21 16:58:08'),
(55, 'about_hero_title', 'About ALAIA Surf Coach', 'TEXT', 'about', 'Hero Title', '2026-05-15 21:41:23', '2026-05-15 21:41:23'),
(56, 'about_hero_subtitle', 'Passionate about sharing the art of surfing in New Zealand\'s stunning waters', 'TEXT', 'about', 'Hero Subtitle', '2026-05-15 21:41:23', '2026-05-15 21:41:23'),
(57, 'about_hero_image', 'https://res.cloudinary.com/dz8bupnto/video/upload/v1779375310/alaia-surf/co2aazaouunhxouemvza.mp4', 'IMAGE_URL', 'about', 'Hero Background Image', '2026-05-15 21:41:23', '2026-05-21 16:55:16'),
(58, 'about_coach_title', 'Meet Paco, Your Coach', 'TEXT', 'about', 'Coach Section Title', '2026-05-15 21:41:23', '2026-05-15 21:41:23'),
(59, 'about_coach_subtitle', 'Expert surfer & certified instructor', 'TEXT', 'about', 'Coach Section Subtitle', '2026-05-15 21:41:23', '2026-05-15 21:41:23'),
(60, 'about_coach_content', 'With over 20 years of surfing experience and 8 years as a surf coach, nothing is more rewarding than helping my students progress and truly connect with the ocean. Based in Raglan, New Zealand, I specialize in personalized coaching that adapts to your skill level and goals. Whether you\'re catching your first wave or perfecting your cutback, I\'m here to guide you every step of the way.', 'RICHTEXT', 'about', 'Coach Description', '2026-05-15 21:41:23', '2026-05-15 21:41:23'),
(61, 'about_coach_image', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371861/alaia-surf/zjfedvfev8dbut3wxrlp.webp', 'IMAGE_URL', 'about', 'Coach Photo', '2026-05-15 21:41:23', '2026-05-21 16:57:28'),
(62, 'about_coach_button_text', 'Book a lesson', 'TEXT', 'about', 'Coach Button Text', '2026-05-15 21:41:23', '2026-05-15 21:41:23'),
(63, 'about_coach_button_url', '/book-surf-lesson', 'TEXT', 'about', 'Coach Button URL', '2026-05-15 21:41:23', '2026-05-15 21:41:23'),
(64, 'about_values_title', 'What Makes ALAIA Different', 'TEXT', 'about', 'Values Title', '2026-05-15 21:41:23', '2026-05-15 21:41:23'),
(65, 'about_values_subtitle', 'We believe surfing is more than a sport, it\'s a lifestyle, a connection to nature, and a journey of personal growth.', 'TEXT', 'about', 'Values Subtitle', '2026-05-15 21:41:23', '2026-05-15 21:41:23'),
(66, 'about_value_1_title', 'Safety First', 'TEXT', 'about', 'Value 1 Title', '2026-05-15 21:41:23', '2026-05-15 21:41:23'),
(67, 'about_value_1_desc', 'Certified instructors, proper equipment, and comprehensive ocean safety training for every student.', 'TEXT', 'about', 'Value 1 Description', '2026-05-15 21:41:23', '2026-05-15 21:41:23'),
(68, 'about_value_2_title', 'Personalized', 'TEXT', 'about', 'Value 2 Title', '2026-05-15 21:41:23', '2026-05-15 21:41:23'),
(69, 'about_value_2_desc', 'Every lesson is tailored to your skill level, physical abilities, and personal goals.', 'TEXT', 'about', 'Value 2 Description', '2026-05-15 21:41:23', '2026-05-15 21:41:23'),
(70, 'about_value_3_title', 'Small Groups', 'TEXT', 'about', 'Value 3 Title', '2026-05-15 21:41:23', '2026-05-15 21:41:23'),
(71, 'about_value_3_desc', 'Maximum 4 students per session ensures individual attention and faster progress.', 'TEXT', 'about', 'Value 3 Description', '2026-05-15 21:41:23', '2026-05-15 21:41:23'),
(72, 'about_value_4_title', 'Local Expert', 'TEXT', 'about', 'Value 4 Title', '2026-05-15 21:41:23', '2026-05-15 21:41:23'),
(73, 'about_value_4_desc', 'Deep knowledge of Raglan\'s breaks, tides, and conditions for the perfect surf session.', 'TEXT', 'about', 'Value 4 Description', '2026-05-15 21:41:23', '2026-05-15 21:41:23'),
(74, 'about_mission_title', 'Sharing the Stoke, One Wave at a Time', 'TEXT', 'about', 'Mission Title', '2026-05-15 21:41:23', '2026-05-15 21:41:23'),
(75, 'about_mission_p1', 'At ALAIA Surf Coach, our mission is simple: to help you fall in love with surfing while respecting the ocean and its power. We create a safe, supportive environment where beginners feel confident and intermediate surfers push their limits.', 'RICHTEXT', 'about', 'Mission Paragraph 1', '2026-05-15 21:41:23', '2026-05-15 21:41:23'),
(76, 'about_mission_p2', 'Every lesson is an opportunity to connect with nature, challenge yourself, and experience the pure joy of riding waves. We\'re not just teaching you to surf, we\'re introducing you to a lifestyle that will stay with you forever.', 'RICHTEXT', 'about', 'Mission Paragraph 2', '2026-05-15 21:41:23', '2026-05-15 21:41:23'),
(77, 'about_mission_p3', 'Beyond individual lessons, we organize custom surf trips around New Zealand, taking you to hidden gems and world-class breaks that only locals know about.', 'RICHTEXT', 'about', 'Mission Paragraph 3', '2026-05-15 21:41:23', '2026-05-15 21:41:23'),
(78, 'about_cta_title', 'Ready to Start Your Surf Journey?', 'TEXT', 'about', 'CTA Title', '2026-05-15 21:41:23', '2026-05-15 21:41:23'),
(79, 'about_cta_subtitle', 'Book your first lesson today or plan an unforgettable surf trip across New Zealand', 'TEXT', 'about', 'CTA Subtitle', '2026-05-15 21:41:23', '2026-05-15 21:41:23'),
(80, 'surf_trip_hero_title', 'Plan your custom surf trip', 'TEXT', 'surf-trip', 'Hero Title', '2026-05-17 19:12:23', '2026-05-17 19:12:23'),
(81, 'surf_trip_hero_subtitle', 'Let\'s design the perfect New Zealand surf adventure for you.', 'RICHTEXT', 'surf-trip', 'Hero Subtitle', '2026-05-17 19:12:23', '2026-06-05 14:03:43'),
(89, 'terms_title', 'Terms & Conditions', 'TEXT', 'terms', 'Page Title', '2026-05-19 13:09:36', '2026-05-19 13:09:36'),
(90, 'terms_last_updated', 'May 2026', 'TEXT', 'terms', 'Last Updated', '2026-05-19 13:09:36', '2026-05-19 13:09:36'),
(91, 'terms_body', 'Welcome to ALAIA Surf Coach. By booking a lesson or surf trip with us, you agree to the following terms.\r\n\r\nBookings & Payment\r\nAll bookings are confirmed once payment has been received. Payment is taken on the day of your session unless otherwise agreed.\r\n\r\nCancellations\r\nCancellations made more than 24 hours in advance are eligible for a full reschedule. Cancellations within 24 hours may not be eligible for a reschedule. In the event of extreme weather or unsafe ocean conditions, we reserve the right to reschedule your session at no cost to you.\r\n\r\nHealth & Safety\r\nParticipants are expected to be in reasonable physical health and able to swim at least 50 metres. You must inform your coach of any medical conditions before the session begins. ALAIA Surf Coach reserves the right to refuse participation if a participant is deemed unfit or poses a safety risk.\r\n\r\nLiability\r\nSurfing involves inherent risks. By participating, you acknowledge and accept these risks. ALAIA Surf Coach is not liable for personal injury, loss, or damage arising from participation in our activities, except where required by law.\r\n\r\nCode of Conduct\r\nWe expect all participants to treat fellow surfers, coaches, and the ocean environment with respect. Harassment or disrespectful behaviour will result in immediate removal from the session without refund.\r\n\r\nContact\r\nFor any questions about these terms, please contact us via the contact page on our website.', 'RICHTEXT', 'terms', 'Content', '2026-05-19 13:09:36', '2026-05-19 13:09:36'),
(92, 'privacy_title', 'Privacy Policy', 'TEXT', 'privacy', 'Page Title', '2026-05-19 13:09:46', '2026-05-19 13:09:46'),
(93, 'privacy_last_updated', 'May 2026', 'TEXT', 'privacy', 'Last Updated', '2026-05-19 13:09:46', '2026-05-19 13:09:46'),
(94, 'privacy_body', 'ALAIA Surf Coach is committed to protecting your privacy. This policy explains how we collect, use, and store your personal information.\r\n\r\nInformation We Collect\r\nWhen you book a lesson or submit an enquiry, we collect your name, email address, phone number, and any other information you choose to provide. We do not collect payment card details directly.\r\n\r\nHow We Use Your Information\r\nWe use your information to confirm bookings, send reminders and updates, respond to enquiries, and improve our services. We do not sell or share your personal data with third parties.\r\n\r\nEmail Communications\r\nBy providing your email address, you consent to receiving booking confirmations and service-related emails. You may opt out of marketing communications at any time by contacting us.\r\n\r\nData Storage & Security\r\nYour data is stored securely and retained only as long as necessary for the purposes outlined above. We take reasonable technical measures to protect your information from unauthorised access.\r\n\r\nYour Rights\r\nYou have the right to request access to, correction of, or deletion of your personal data at any time. To exercise these rights, please contact us through the contact page on our website.\r\n\r\nCookies\r\nOur website may use cookies to improve your browsing experience. You can disable cookies in your browser settings at any time.\r\n\r\nChanges to This Policy\r\nWe may update this privacy policy from time to time. The latest version will always be available on this page.', 'RICHTEXT', 'privacy', 'Content', '2026-05-19 13:09:46', '2026-05-19 13:09:46'),
(95, 'snz_hero_title', 'Surf in New Zealand', 'TEXT', 'surf-in-new-zealand', 'Hero Title', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(96, 'snz_hero_subtitle', 'Surf lessons, packages and custom trips. Based in Raglan, New Zealand.', 'TEXT', 'surf-in-new-zealand', 'Hero Subtitle', '2026-05-20 00:00:00', '2026-06-13 18:38:56'),
(97, 'snz_hero_image', 'https://res.cloudinary.com/dz8bupnto/video/upload/v1779372317/alaia-surf/iq3kehca43jcks49pyzz.mp4', 'IMAGE_URL', 'surf-in-new-zealand', 'Hero Background Image', '2026-05-20 00:00:00', '2026-05-21 16:56:16'),
(98, 'snz_lessons_eyebrow', 'Raglan, New Zealand', 'TEXT', 'surf-in-new-zealand', 'Lessons Eyebrow', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(99, 'snz_lessons_title', 'Surf Lessons', 'TEXT', 'surf-in-new-zealand', 'Lessons Title', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(100, 'snz_lessons_desc', 'Group lessons, private sessions and coaching in Raglan for every level, at every stage of your surf journey.', 'RICHTEXT', 'surf-in-new-zealand', 'Lessons Description', '2026-05-20 00:00:00', '2026-06-17 12:32:36'),
(101, 'snz_lessons_b1', 'Small groups of 4 students maximum', 'TEXT', 'surf-in-new-zealand', 'Lessons Bullet 1', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(102, 'snz_lessons_b2', 'Board & wetsuit included', 'TEXT', 'surf-in-new-zealand', 'Lessons Bullet 2', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(103, 'snz_lessons_b3', 'Ocean safety briefing every session', 'TEXT', 'surf-in-new-zealand', 'Lessons Bullet 3', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(104, 'snz_lessons_b4', 'Beginner to intermediate levels welcome', 'TEXT', 'surf-in-new-zealand', 'Lessons Bullet 4', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(105, 'snz_packages_eyebrow', 'More sessions, better value', 'TEXT', 'surf-in-new-zealand', 'Packages Eyebrow', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(106, 'snz_packages_title', 'Surf Packages', 'TEXT', 'surf-in-new-zealand', 'Packages Title', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(107, 'snz_packages_desc', 'Book 3 or 5 sessions and save. Pick your dates one at a time.', 'RICHTEXT', 'surf-in-new-zealand', 'Packages Description', '2026-05-20 00:00:00', '2026-06-17 12:32:46'),
(108, 'snz_packages_b1', 'Single lesson : $60', 'TEXT', 'surf-in-new-zealand', 'Packages Bullet 1', '2026-05-20 00:00:00', '2026-06-17 12:32:55'),
(109, 'snz_packages_b2', '3-lesson package : $160 (save $20)', 'TEXT', 'surf-in-new-zealand', 'Packages Bullet 2', '2026-05-20 00:00:00', '2026-06-17 12:33:00'),
(110, 'snz_packages_b3', '5-lesson package : $250 (save $50)', 'TEXT', 'surf-in-new-zealand', 'Packages Bullet 3', '2026-05-20 00:00:00', '2026-06-17 12:33:09'),
(111, 'snz_trips_eyebrow', 'New Zealand, your way', 'TEXT', 'surf-in-new-zealand', 'Trips Eyebrow', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(112, 'snz_trips_title', 'Custom Surf Trips', 'TEXT', 'surf-in-new-zealand', 'Trips Title', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(113, 'snz_trips_desc', 'We plan the route, read the forecast, and coach you in the water. You just focus on surfing.', 'RICHTEXT', 'surf-in-new-zealand', 'Trips Description', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(114, 'snz_trips_b1', 'Spot selection based on your level & the forecast', 'TEXT', 'surf-in-new-zealand', 'Trips Bullet 1', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(115, 'snz_trips_b2', 'Personalised coaching in the water', 'TEXT', 'surf-in-new-zealand', 'Trips Bullet 2', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(116, 'snz_trips_b3', 'Local knowledge, we know where the crowds aren\'t', 'TEXT', 'surf-in-new-zealand', 'Trips Bullet 3', '2026-05-20 00:00:00', '2026-06-17 12:33:24'),
(117, 'book_hero_title', 'Book a Surf Lesson', 'TEXT', 'book-surf-lesson', 'Hero Title', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(118, 'book_hero_subtitle', 'Raglan, New Zealand', 'TEXT', 'book-surf-lesson', 'Hero Subtitle', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(119, 'book_schedule_title', 'Upcoming Sessions', 'TEXT', 'book-surf-lesson', 'Schedule Title', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(121, 'book_schedule_empty', 'No sessions currently scheduled. Get in touch to arrange a lesson.', 'TEXT', 'book-surf-lesson', 'Empty Schedule Message', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(122, 'book_contact_title', 'Book or Ask a Question', 'TEXT', 'book-surf-lesson', 'Contact Section Title', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(123, 'book_contact_desc', 'Ready to get in the water? Send us a message and we\'ll confirm your session.', 'RICHTEXT', 'book-surf-lesson', 'Contact Section Description', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(124, 'book_hero_image', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371789/alaia-surf/w0qabnxvbjmxn6x5aks9.webp', 'IMAGE_URL', 'book-surf-lesson', 'Hero Image', '2026-05-20 00:00:00', '2026-05-21 17:02:44'),
(125, 'home_review_1_name', 'Test Name', 'TEXT', 'home', 'Review 1 — Name', '2026-05-21 12:31:01', '2026-05-21 12:32:10'),
(126, 'home_review_1_quote', 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed lacinia elit sit amet sagittis commodo. Nullam venenatis id ipsum a mollis. ', 'RICHTEXT', 'home', 'Review 1 — Quote', '2026-05-21 12:31:01', '2026-05-21 12:32:40'),
(127, 'home_review_2_name', 'Test Name 2', 'TEXT', 'home', 'Review 2 — Name', '2026-05-21 12:31:01', '2026-05-21 12:32:47'),
(128, 'home_review_2_quote', 'Cras at lectus ut augue tempus gravida at sit amet erat. Ut id pulvinar metus, sit amet cursus tellus.', 'RICHTEXT', 'home', 'Review 2 — Quote', '2026-05-21 12:31:01', '2026-05-21 12:33:00'),
(129, 'home_review_3_name', 'Test Name 3', 'TEXT', 'home', 'Review 3 — Name', '2026-05-21 12:31:01', '2026-05-21 12:33:06'),
(130, 'home_review_3_quote', 'Phasellus dapibus tortor nunc, at sollicitudin tortor mollis eget. Vivamus felis nisi, semper eu volutpat in, lobortis mollis sapien.', 'RICHTEXT', 'home', 'Review 3 — Quote', '2026-05-21 12:31:01', '2026-05-21 12:33:18'),
(131, 'global_footer_image', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779379786/alaia-surf/am2brubss0rr42ejbffm.webp', 'IMAGE_URL', 'global', 'Footer Background Image', '2026-05-21 17:52:38', '2026-05-21 18:10:00'),
(132, 'global_instagram_url', '', 'TEXT', 'global', 'Instagram URL', '2026-05-21 17:52:38', '2026-05-21 17:52:38'),
(133, 'global_facebook_url', '', 'TEXT', 'global', 'Facebook URL', '2026-05-21 17:52:38', '2026-05-21 17:52:38'),
(142, 'global_price_private', '100', 'NUMBER', 'global', 'Private Lesson (NZD)', '2026-05-21 18:37:00', '2026-05-21 18:37:00'),
(143, 'global_price_coaching', '200', 'NUMBER', 'global', 'Surf Coaching (NZD)', '2026-05-21 18:37:00', '2026-05-21 18:37:54'),
(144, 'global_price_pack_3', '160', 'NUMBER', 'global', '3-Session Package (NZD)', '2026-05-21 18:37:00', '2026-05-21 18:37:00'),
(145, 'global_price_pack_5', '250', 'NUMBER', 'global', '5-Session Package (NZD)', '2026-05-21 18:37:00', '2026-05-21 18:37:00'),
(148, 'about_mission_image', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779373643/alaia-surf/hpo2dem08dmhzagml7j2.jpg', 'IMAGE_URL', 'about', 'Mission Image', '2026-05-21 22:58:38', '2026-05-21 22:58:38'),
(151, 'faq_cat1_title', 'Before your lesson', 'TEXT', 'faq', 'Category 1 Title', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(152, 'faq_cat1_item1_q', 'Do I need to know how to swim?', 'TEXT', 'faq', 'Cat 1 — Q1', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(153, 'faq_cat1_item1_a', 'Yes — you need to be a comfortable swimmer. You don\'t need to be a strong swimmer, but you should be able to swim at least 50 metres unaided and feel at ease in the ocean.', 'TEXT', 'faq', 'Cat 1 — A1', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(154, 'faq_cat1_item2_q', 'What should I bring?', 'TEXT', 'faq', 'Cat 1 — Q2', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(155, 'faq_cat1_item2_a', 'Just yourself and a towel. We provide the surfboard, wetsuit, and all the equipment you need. Bring a change of clothes and a bottle of water for after the session.', 'TEXT', 'faq', 'Cat 1 — A2', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(156, 'faq_cat1_item3_q', 'What should I wear under the wetsuit?', 'TEXT', 'faq', 'Cat 1 — Q3', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(157, 'faq_cat1_item3_a', 'A swimsuit or board shorts under the wetsuit is ideal. Avoid anything with metal zips or buckles as they can be uncomfortable and damage the wetsuit.', 'TEXT', 'faq', 'Cat 1 — A3', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(158, 'faq_cat1_item4_q', 'Is there a minimum age or fitness level?', 'TEXT', 'faq', 'Cat 1 — Q4', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(159, 'faq_cat1_item4_a', 'We welcome surfers aged 8 and up. You don\'t need to be an athlete, but a basic level of fitness helps — you\'ll be paddling and popping up repeatedly. If you have any health concerns, let us know before booking.', 'TEXT', 'faq', 'Cat 1 — A4', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(160, 'faq_cat1_item5_q', 'What if the surf is too big or the conditions are bad?', 'TEXT', 'faq', 'Cat 1 — Q5', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(161, 'faq_cat1_item5_a', 'We monitor conditions closely. If the surf is unsuitable for learning, we\'ll contact you to reschedule. Your safety always comes first — Raglan is known for its variety of breaks so there\'s usually a sheltered option.', 'TEXT', 'faq', 'Cat 1 — A5', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(162, 'faq_cat2_title', 'The lessons', 'TEXT', 'faq', 'Category 2 Title', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(163, 'faq_cat2_item1_q', 'How long is each session?', 'TEXT', 'faq', 'Cat 2 — Q1', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(164, 'faq_cat2_item1_a', 'Each group session runs for 2 hours, including a land-based safety briefing at the start.', 'TEXT', 'faq', 'Cat 2 — A1', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(165, 'faq_cat2_item2_q', 'How many people are in a group lesson?', 'TEXT', 'faq', 'Cat 2 — Q2', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(166, 'faq_cat2_item2_a', 'Maximum 4 students per group. This keeps the coach-to-student ratio low enough that you still get plenty of individual feedback.', 'TEXT', 'faq', 'Cat 2 — A2', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(167, 'faq_cat2_item3_q', 'What level do I need to be?', 'TEXT', 'faq', 'Cat 2 — Q3', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(168, 'faq_cat2_item3_a', 'Group lessons are open to complete beginners through to intermediate surfers. If you\'re more advanced and want targeted coaching, ask us about private coaching sessions.', 'TEXT', 'faq', 'Cat 2 — A3', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(169, 'faq_cat2_item4_q', 'Where do lessons take place?', 'TEXT', 'faq', 'Cat 2 — Q4', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(170, 'faq_cat2_item4_a', 'Most lessons take place at Ngarunui Beach (Raglan\'s main surf beach), which has a consistent, mellow shore break perfect for learning. The exact spot varies with tide and swell conditions on the day.', 'TEXT', 'faq', 'Cat 2 — A4', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(171, 'faq_cat2_item5_q', 'Will I actually stand up on my first lesson?', 'TEXT', 'faq', 'Cat 2 — Q5', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(172, 'faq_cat2_item5_a', 'Most people do — but it\'s not a guarantee. Every session is different and the ocean has its own schedule. What we can guarantee is that you\'ll learn proper technique, ocean awareness, and come away stoked regardless.', 'TEXT', 'faq', 'Cat 2 — A5', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(173, 'faq_cat3_title', 'Packages & booking', 'TEXT', 'faq', 'Category 3 Title', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(174, 'faq_cat3_item1_q', 'How do surf packages work?', 'TEXT', 'faq', 'Cat 3 — Q1', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(175, 'faq_cat3_item1_a', 'Send us a message via the contact form or email to ask about available sessions. We\'ll confirm your slot and any package details directly. No need to choose all your dates upfront — book them one at a time as you go.', 'TEXT', 'faq', 'Cat 3 — A1', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(176, 'faq_cat3_item2_q', 'Do package sessions expire?', 'TEXT', 'faq', 'Cat 3 — Q2', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(177, 'faq_cat3_item2_a', 'No expiry date. Use your sessions whenever suits you. That said, we recommend spacing them within a few weeks for the best progression — muscle memory fades quickly.', 'TEXT', 'faq', 'Cat 3 — A2', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(178, 'faq_cat3_item3_q', 'Can I book for multiple people?', 'TEXT', 'faq', 'Cat 3 — Q3', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(179, 'faq_cat3_item3_a', 'Yes. Just mention the number of participants in your message. For groups larger than 4, contact us directly and we\'ll arrange a private session.', 'TEXT', 'faq', 'Cat 3 — A3', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(180, 'faq_cat3_item4_q', 'How do I book a lesson?', 'TEXT', 'faq', 'Cat 3 — Q4', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(181, 'faq_cat3_item4_a', 'Check the upcoming session dates on the booking page and get in touch via the contact form. We\'ll confirm your session and share all the details by email.', 'TEXT', 'faq', 'Cat 3 — A4', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(182, 'faq_cat4_title', 'Cancellation & payment', 'TEXT', 'faq', 'Category 4 Title', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(183, 'faq_cat4_item1_q', 'How do I cancel a session?', 'TEXT', 'faq', 'Cat 4 — Q1', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(184, 'faq_cat4_item1_a', 'Contact us at least 24 hours before your session to cancel or reschedule. Cancellations made after that point are not eligible for a refund or reschedule.', 'TEXT', 'faq', 'Cat 4 — A1', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(185, 'faq_cat4_item2_q', 'When do I pay?', 'TEXT', 'faq', 'Cat 4 — Q2', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(186, 'faq_cat4_item2_a', 'Payment is collected on the day of your lesson — we don\'t take any payment online. We accept cash and card at the session.', 'TEXT', 'faq', 'Cat 4 — A2', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(187, 'faq_cat4_item3_q', 'What happens if the coach cancels?', 'TEXT', 'faq', 'Cat 4 — Q3', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(188, 'faq_cat4_item3_a', 'If we cancel a session for any reason (weather, emergency), you\'ll be notified by email and offered a full reschedule at no extra cost.', 'TEXT', 'faq', 'Cat 4 — A3', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(189, 'spots_card_1_name', 'Raglan', 'TEXT', 'surf-trip', 'Card 1 Name', '2026-06-05 13:03:57', '2026-06-05 13:42:06'),
(190, 'spots_card_1_region', 'Waikato', 'TEXT', 'surf-trip', 'Card 1 Region', '2026-06-05 13:03:57', '2026-06-05 13:42:06'),
(191, 'spots_card_1_type', 'Point breaks', 'TEXT', 'surf-trip', 'Card 1 Wave Type', '2026-06-05 13:03:57', '2026-06-05 13:42:06'),
(192, 'spots_card_1_level', 'All levels', 'TEXT', 'surf-trip', 'Card 1 Level', '2026-06-05 13:03:57', '2026-06-05 13:42:06'),
(193, 'spots_card_1_desc', 'Home base. World-class left-hand point breaks that cater to every level, from the gentle beach break at Ngarunui to the legendary long walls of Indicators.', 'RICHTEXT', 'surf-trip', 'Card 1 Description', '2026-06-05 13:03:57', '2026-06-05 13:44:11'),
(194, 'spots_card_1_image', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371781/alaia-surf/smiellaliohhjewonehe.webp', 'IMAGE_URL', 'surf-trip', 'Card 1 Image', '2026-06-05 13:03:57', '2026-06-05 13:42:06'),
(195, 'spots_card_2_name', 'Northland', 'TEXT', 'surf-trip', 'Card 2 Name', '2026-06-05 13:03:57', '2026-06-05 13:42:06'),
(196, 'spots_card_2_region', 'Te Tai Tokerau', 'TEXT', 'surf-trip', 'Card 2 Region', '2026-06-05 13:03:57', '2026-06-05 13:42:06'),
(197, 'spots_card_2_type', 'Beach breaks', 'TEXT', 'surf-trip', 'Card 2 Wave Type', '2026-06-05 13:03:57', '2026-06-05 13:42:06'),
(198, 'spots_card_2_level', 'All levels', 'TEXT', 'surf-trip', 'Card 2 Level', '2026-06-05 13:03:57', '2026-06-05 13:42:06'),
(199, 'spots_card_2_desc', 'Warm water, long stretches of uncrowded beach, and consistent swell year-round. Ideal for a relaxed road trip with waves for everyone, from sheltered bays to exposed west coast breaks.', 'RICHTEXT', 'surf-trip', 'Card 2 Description', '2026-06-05 13:03:57', '2026-06-05 13:44:23'),
(200, 'spots_card_2_image', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371789/alaia-surf/w0qabnxvbjmxn6x5aks9.webp', 'IMAGE_URL', 'surf-trip', 'Card 2 Image', '2026-06-05 13:03:57', '2026-06-05 13:55:21'),
(201, 'spots_card_3_name', 'Gisborne', 'TEXT', 'surf-trip', 'Card 3 Name', '2026-06-05 13:03:57', '2026-06-05 13:42:06'),
(202, 'spots_card_3_region', 'East Cape', 'TEXT', 'surf-trip', 'Card 3 Region', '2026-06-05 13:03:57', '2026-06-05 13:42:06'),
(203, 'spots_card_3_type', 'Beach & point breaks', 'TEXT', 'surf-trip', 'Card 3 Wave Type', '2026-06-05 13:03:57', '2026-06-05 13:42:06'),
(204, 'spots_card_3_level', 'Beginner to Intermediate', 'TEXT', 'surf-trip', 'Card 3 Level', '2026-06-05 13:03:57', '2026-06-05 13:42:06'),
(205, 'spots_card_3_desc', 'The first city in the world to see the sunrise. Gisborne catches easterly and southerly swells that bypass the rest of the country, quality waves with almost no crowds. A hidden gem.', 'RICHTEXT', 'surf-trip', 'Card 3 Description', '2026-06-05 13:03:57', '2026-06-05 13:44:35'),
(206, 'spots_card_3_image', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371786/alaia-surf/oechyazulz7pypu1ecj7.webp', 'IMAGE_URL', 'surf-trip', 'Card 3 Image', '2026-06-05 13:03:57', '2026-06-05 13:50:37'),
(207, 'spots_card_4_name', 'The Catlins', 'TEXT', 'surf-trip', 'Card 4 Name', '2026-06-05 13:03:57', '2026-06-05 13:42:06'),
(208, 'spots_card_4_region', 'Southland', 'TEXT', 'surf-trip', 'Card 4 Region', '2026-06-05 13:03:57', '2026-06-05 13:42:06'),
(209, 'spots_card_4_type', 'Beach breaks', 'TEXT', 'surf-trip', 'Card 4 Wave Type', '2026-06-05 13:03:57', '2026-06-05 13:42:06'),
(210, 'spots_card_4_level', 'Intermediate to Advanced', 'TEXT', 'surf-trip', 'Card 4 Level', '2026-06-05 13:03:57', '2026-06-05 13:42:06'),
(211, 'spots_card_4_desc', 'Raw Southern Ocean swell, old-growth rainforest meeting the sea, and complete solitude. The Catlins is New Zealand at its most wild, powerful, dramatic, and utterly unforgettable.', 'RICHTEXT', 'surf-trip', 'Card 4 Description', '2026-06-05 13:03:57', '2026-06-05 13:44:44'),
(212, 'spots_card_4_image', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371783/alaia-surf/zgkepdzy0lvnj2u7qpzz.webp', 'IMAGE_URL', 'surf-trip', 'Card 4 Image', '2026-06-05 13:03:57', '2026-06-05 13:42:06'),
(217, 'surf_trip_hero_image', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371784/alaia-surf/fq0o281g1kk1dhenvlsv.webp', 'IMAGE_URL', 'surf-trip', 'Hero Background Image', '2026-06-05 13:48:04', '2026-06-05 13:50:01'),
(224, 'home_hero_image_alt', 'video over the beach in Raglan Whaingaroa, close up to the mountain Karioi', 'TEXT', 'home', 'Hero Image Alt Text', '2026-06-13 17:01:46', '2026-06-14 18:36:14'),
(225, 'about_hero_image_alt', 'Surf instructor Paco in Raglan, New Zealand', 'TEXT', 'about', 'Hero Image Alt Text', '2026-06-13 17:01:46', '2026-07-18 22:14:44'),
(226, 'snz_hero_image_alt', 'Surfer paddling out in New Zealand', 'TEXT', 'surf-in-new-zealand', 'Hero Image Alt Text', '2026-06-13 17:01:46', '2026-07-18 22:14:44'),
(227, 'book_hero_image_alt', 'Surfer booking a lesson in Raglan', 'TEXT', 'book-surf-lesson', 'Hero Image Alt Text', '2026-06-13 17:01:46', '2026-07-18 22:14:44'),
(228, 'surf_trip_hero_image_alt', 'Van road trip planning in New Zealand', 'TEXT', 'surf-trip', 'Hero Image Alt Text', '2026-06-13 17:01:46', '2026-07-18 22:14:44'),
(229, 'faq_hero_title', 'Frequently Asked Questions', 'TEXT', 'faq', 'Hero Title', '2026-06-15 21:19:31', '2026-06-15 21:19:31'),
(230, 'faq_hero_subtitle', 'Everything you need to know before hitting the water', 'TEXT', 'faq', 'Hero Subtitle', '2026-06-15 21:19:31', '2026-06-15 21:19:31'),
(231, 'faq_hero_image', '/assets/surfboards-under-flax.webp', 'IMAGE_URL', 'faq', 'Hero Image', '2026-06-15 21:19:31', '2026-06-15 21:19:31'),
(232, 'home_hero_subtitle', 'Experience the best surf coaching in Aotearoa New Zealand', 'TEXT', 'home', 'Hero Subtitle', '2026-06-17 12:30:36', '2026-06-17 12:31:02'),
(233, 'surf_lessons_hero_title', 'Surf Lessons in Raglan', 'TEXT', 'surf-lessons', 'Hero Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(234, 'surf_lessons_hero_subtitle', 'Group, private and coaching sessions for every level', 'TEXT', 'surf-lessons', 'Hero Subtitle', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(235, 'surf_lessons_hero_image', '', 'IMAGE_URL', 'surf-lessons', 'Hero Background Image', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(236, 'surf_lessons_hero_image_alt', 'Surfers paddling out in Raglan', 'TEXT', 'surf-lessons', 'Hero Image Alt Text', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(237, 'surf_lessons_group_eyebrow', 'Most popular', 'TEXT', 'surf-lessons', 'Group Eyebrow', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(238, 'surf_lessons_group_title', 'Group Lessons', 'TEXT', 'surf-lessons', 'Group Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(239, 'surf_lessons_group_desc', 'Join a fun, energetic group session designed for all levels. Learn the fundamentals of surfing alongside others in a small, supportive group.', 'RICHTEXT', 'surf-lessons', 'Group Description', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(240, 'surf_lessons_group_b1', 'Learn to read waves and ocean safety', 'TEXT', 'surf-lessons', 'Group Bullet 1', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(241, 'surf_lessons_group_b2', 'Master the pop-up technique', 'TEXT', 'surf-lessons', 'Group Bullet 2', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(242, 'surf_lessons_group_b3', 'Ride your first waves', 'TEXT', 'surf-lessons', 'Group Bullet 3', '2026-07-11 00:00:00', '2026-07-11 14:30:51'),
(243, 'surf_lessons_private_eyebrow', 'One on one', 'TEXT', 'surf-lessons', 'Private Eyebrow', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(244, 'surf_lessons_private_title', 'Private Lessons', 'TEXT', 'surf-lessons', 'Private Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(245, 'surf_lessons_private_desc', 'Get personalised one-on-one coaching tailored to your exact skill level. Perfect for rapid progression.', 'RICHTEXT', 'surf-lessons', 'Private Description', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(246, 'surf_lessons_private_b1', '100% focused on your technique', 'TEXT', 'surf-lessons', 'Private Bullet 1', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(247, 'surf_lessons_private_b2', 'Flexible scheduling', 'TEXT', 'surf-lessons', 'Private Bullet 2', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(248, 'surf_lessons_private_b3', 'Fastest way to progress', 'TEXT', 'surf-lessons', 'Private Bullet 3', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(249, 'surf_lessons_coaching_eyebrow', 'Level up', 'TEXT', 'surf-lessons', 'Coaching Eyebrow', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(250, 'surf_lessons_coaching_title', 'Surf Coaching', 'TEXT', 'surf-lessons', 'Coaching Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(251, 'surf_lessons_coaching_desc', 'Already riding waves? Performance coaching to refine your technique and push your surfing to the next level.', 'RICHTEXT', 'surf-lessons', 'Coaching Description', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(252, 'surf_lessons_coaching_b1', 'Video analysis of your surfing', 'TEXT', 'surf-lessons', 'Coaching Bullet 1', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(253, 'surf_lessons_coaching_b2', 'Advanced manoeuvre technique', 'TEXT', 'surf-lessons', 'Coaching Bullet 2', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(254, 'surf_lessons_coaching_b3', 'Tailored to intermediate/advanced surfers', 'TEXT', 'surf-lessons', 'Coaching Bullet 3', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(255, 'surf_lessons_contact_title', 'Ready to catch your first wave?', 'TEXT', 'surf-lessons', 'Contact Title', '2026-07-11 00:00:00', '2026-07-11 13:32:30'),
(256, 'surf_lessons_contact_desc', 'Book your lesson today and get in the water with a qualified coach.', 'TEXT', 'surf-lessons', 'Contact Description', '2026-07-11 00:00:00', '2026-07-11 13:32:30'),
(257, 'surf_trips_hero_title', 'Custom Surf Trips in New Zealand', 'TEXT', 'new-zealand-surf-trips', 'Hero Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(258, 'surf_trips_hero_subtitle', 'A personalised surf road trip, tailored to your level and goals', 'TEXT', 'new-zealand-surf-trips', 'Hero Subtitle', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(259, 'surf_trips_hero_image', '', 'IMAGE_URL', 'new-zealand-surf-trips', 'Hero Background Image', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(260, 'surf_trips_hero_image_alt', 'Van road trip in New Zealand', 'TEXT', 'new-zealand-surf-trips', 'Hero Image Alt Text', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(261, 'surf_trips_intro_eyebrow', 'New Zealand, your way', 'TEXT', 'new-zealand-surf-trips', 'Intro Eyebrow', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(262, 'surf_trips_intro_title', 'More than a surf trip — a coaching adventure', 'TEXT', 'new-zealand-surf-trips', 'Intro Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(263, 'surf_trips_intro_desc', 'We design a custom itinerary around your level, the swell, and your schedule — then coach you at every stop along the way.', 'RICHTEXT', 'new-zealand-surf-trips', 'Intro Description', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(264, 'surf_trips_included_eyebrow', 'What\'s included', 'TEXT', 'new-zealand-surf-trips', 'Included Eyebrow', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(265, 'surf_trips_included_title', 'Everything you need, nothing you don\'t', 'TEXT', 'new-zealand-surf-trips', 'Included Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(266, 'surf_trips_included_i1', 'Custom itinerary based on your level and goals', 'TEXT', 'new-zealand-surf-trips', 'Included Item 1', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(267, 'surf_trips_included_i2', 'Coaching at every stop', 'TEXT', 'new-zealand-surf-trips', 'Included Item 2', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(268, 'surf_trips_included_i3', 'Local knowledge of the best spots for the day\'s swell', 'TEXT', 'new-zealand-surf-trips', 'Included Item 3', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(269, 'surf_trips_included_i4', 'Board and wetsuit provided', 'TEXT', 'new-zealand-surf-trips', 'Included Item 4', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(270, 'surf_trips_cta_title', 'Ready to chase waves?', 'TEXT', 'new-zealand-surf-trips', 'CTA Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(271, 'surf_trips_cta_desc', 'Tell us about your level and what you\'re looking for, and we\'ll build your custom trip.', 'TEXT', 'new-zealand-surf-trips', 'CTA Description', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(272, 'spots_hero_title', 'Surf Spots in New Zealand', 'TEXT', 'spots', 'Hero Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(273, 'spots_hero_subtitle', '3,000 km of coastline. A wave for every level.', 'TEXT', 'spots', 'Hero Subtitle', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(274, 'spots_hero_image', '', 'IMAGE_URL', 'spots', 'Hero Background Image', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(275, 'spots_hero_image_alt', 'Aerial view of a surf break in New Zealand', 'TEXT', 'spots', 'Hero Image Alt Text', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(276, 'spots_intro_eyebrow', 'Aotearoa New Zealand', 'TEXT', 'spots', 'Intro Eyebrow', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(277, 'spots_intro_title', 'A region-by-region guide', 'TEXT', 'spots', 'Intro Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(278, 'spots_intro_desc', 'From the world-famous point breaks of Raglan to the powerful reefs of Taranaki and the warm beaches of Northland — find your wave.', 'RICHTEXT', 'spots', 'Intro Description', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(279, 'spots_region_1_image', '', 'IMAGE_URL', 'spots', 'Region 1 Photo', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(280, 'spots_region_2_image', '', 'IMAGE_URL', 'spots', 'Region 2 Photo', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(281, 'spots_region_3_image', '', 'IMAGE_URL', 'spots', 'Region 3 Photo', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(282, 'spots_region_4_image', '', 'IMAGE_URL', 'spots', 'Region 4 Photo', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(283, 'spots_cta_title', 'Ready to discover New Zealand by surf?', 'TEXT', 'spots', 'CTA Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(284, 'spots_cta_desc', 'Book a lesson in Raglan or plan a custom surf trip across the whole country.', 'TEXT', 'spots', 'CTA Description', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(285, 'surf_packages_hero_title', 'Surf Lesson Packages', 'TEXT', 'surf-packages', 'Hero Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(286, 'surf_packages_hero_subtitle', 'Book more sessions, save more, progress faster', 'TEXT', 'surf-packages', 'Hero Subtitle', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(287, 'surf_packages_hero_image', '', 'IMAGE_URL', 'surf-packages', 'Hero Background Image', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(288, 'surf_packages_hero_image_alt', 'Surfers paddling in Raglan, New Zealand', 'TEXT', 'surf-packages', 'Hero Image Alt Text', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(289, 'surf_packages_why_title', 'Why a package works better', 'TEXT', 'surf-packages', 'Why Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(290, 'surf_packages_why_desc', 'Real progression takes repetition. A package keeps you coming back and builds momentum.', 'TEXT', 'surf-packages', 'Why Description', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(291, 'surf_packages_why_1_title', 'Faster progression', 'TEXT', 'surf-packages', 'Why 1 Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(292, 'surf_packages_why_1_desc', 'Repetition builds muscle memory — 3 or 5 sessions gets you there quicker than one-offs.', 'TEXT', 'surf-packages', 'Why 1 Description', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(293, 'surf_packages_why_2_title', 'Better value', 'TEXT', 'surf-packages', 'Why 2 Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(294, 'surf_packages_why_2_desc', 'Save per session compared to booking lessons one at a time.', 'TEXT', 'surf-packages', 'Why 2 Description', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(295, 'surf_packages_why_3_title', 'Flexible scheduling', 'TEXT', 'surf-packages', 'Why 3 Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(296, 'surf_packages_why_3_desc', 'Use your sessions whenever suits, no fixed weekly slot required.', 'TEXT', 'surf-packages', 'Why 3 Description', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(297, 'surf_packages_incl_title', 'What\'s included in every session', 'TEXT', 'surf-packages', 'Included Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(298, 'surf_packages_incl_desc', 'No hidden extras — everything you need is provided.', 'TEXT', 'surf-packages', 'Included Description', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(299, 'surf_packages_incl_i1', 'Board and wetsuit provided', 'TEXT', 'surf-packages', 'Included Item 1', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(300, 'surf_packages_incl_i2', 'Small group sizes, max 4 per coach', 'TEXT', 'surf-packages', 'Included Item 2', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(301, 'surf_packages_incl_i3', 'Qualified, experienced surf coach', 'TEXT', 'surf-packages', 'Included Item 3', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(302, 'surf_packages_incl_i4', 'Flexible booking, reschedule any time', 'TEXT', 'surf-packages', 'Included Item 4', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(303, 'surf_lessons_spots_title', 'Where your lesson takes place', 'TEXT', 'surf-lessons', 'Spots Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(304, 'surf_lessons_spots_desc', 'Lessons run at whichever beach has the best conditions on the day.', 'TEXT', 'surf-lessons', 'Spots Description', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(305, 'surf_lessons_spot_1_name', 'Ngarunui Beach', 'TEXT', 'surf-lessons', 'Spot 1 Name', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(306, 'surf_lessons_spot_1_level', 'Beginner', 'TEXT', 'surf-lessons', 'Spot 1 Level', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(307, 'surf_lessons_spot_1_type', 'Beach break', 'TEXT', 'surf-lessons', 'Spot 1 Wave Type', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(308, 'surf_lessons_spot_1_desc', 'Beach break, gentle whitewash. ideal for first-timers.', 'TEXT', 'surf-lessons', 'Spot 1 Description', '2026-07-11 00:00:00', '2026-07-11 14:32:05'),
(309, 'surf_lessons_spot_2_name', 'Ruapuke', 'TEXT', 'surf-lessons', 'Spot 2 Name', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(310, 'surf_lessons_spot_2_level', 'All levels', 'TEXT', 'surf-lessons', 'Spot 2 Level', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(311, 'surf_lessons_spot_2_type', 'Beach break', 'TEXT', 'surf-lessons', 'Spot 2 Wave Type', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(312, 'surf_lessons_spot_2_desc', 'A quieter alternative with consistent banks for all levels.', 'TEXT', 'surf-lessons', 'Spot 2 Description', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(313, 'surf_trips_feat_1_title', 'Local knowledge', 'TEXT', 'new-zealand-surf-trips', 'Feature 1 Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(314, 'surf_trips_feat_1_sub', 'Years of coaching every break on this coastline', 'TEXT', 'new-zealand-surf-trips', 'Feature 1 Subtitle', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(315, 'surf_trips_feat_2_title', 'Swell-chasing', 'TEXT', 'new-zealand-surf-trips', 'Feature 2 Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(316, 'surf_trips_feat_2_sub', 'The itinerary follows the forecast, not a fixed route', 'TEXT', 'new-zealand-surf-trips', 'Feature 2 Subtitle', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(317, 'surf_trips_feat_3_title', 'All levels', 'TEXT', 'new-zealand-surf-trips', 'Feature 3 Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(318, 'surf_trips_feat_3_sub', 'From first waves to performance coaching', 'TEXT', 'new-zealand-surf-trips', 'Feature 3 Subtitle', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(319, 'surf_trips_feat_4_title', 'Small groups', 'TEXT', 'new-zealand-surf-trips', 'Feature 4 Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(320, 'surf_trips_feat_4_sub', 'More time in the water, less time waiting around', 'TEXT', 'new-zealand-surf-trips', 'Feature 4 Subtitle', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(321, 'surf_trips_dest_title', 'Where we surf', 'TEXT', 'new-zealand-surf-trips', 'Destinations Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(322, 'surf_trips_dest_desc', 'A sample of the coastline your trip could cover, depending on the swell.', 'TEXT', 'new-zealand-surf-trips', 'Destinations Description', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(331, 'surf_trips_how_title', 'How it works', 'TEXT', 'new-zealand-surf-trips', 'How It Works Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00');
INSERT INTO `site_content` (`id`, `key_name`, `value`, `type`, `page`, `label`, `created_at`, `updated_at`) VALUES
(332, 'surf_trips_how_desc', 'From a quick chat to hitting the road, here\'s how your custom trip comes together.', 'TEXT', 'new-zealand-surf-trips', 'How It Works Description', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(333, 'surf_trips_step_1_title', 'Tell us about yourself', 'TEXT', 'new-zealand-surf-trips', 'Step 1 Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(334, 'surf_trips_step_1_desc', 'Your level, your dates, and what you want to get out of the trip.', 'TEXT', 'new-zealand-surf-trips', 'Step 1 Description', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(335, 'surf_trips_step_2_title', 'We design your trip', 'TEXT', 'new-zealand-surf-trips', 'Step 2 Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(336, 'surf_trips_step_2_desc', 'A custom itinerary built around the swell forecast and your goals.', 'TEXT', 'new-zealand-surf-trips', 'Step 2 Description', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(337, 'surf_trips_step_3_title', 'Hit the road', 'TEXT', 'new-zealand-surf-trips', 'Step 3 Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(338, 'surf_trips_step_3_desc', 'We coach you at every stop, chasing the best waves for your level.', 'TEXT', 'new-zealand-surf-trips', 'Step 3 Description', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(375, 'surf_trips_dest_1_image', '', 'IMAGE_URL', 'new-zealand-surf-trips', 'Destination 1 Image', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(376, 'surf_trips_dest_2_image', '', 'IMAGE_URL', 'new-zealand-surf-trips', 'Destination 2 Image', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(377, 'surf_trips_dest_3_image', '', 'IMAGE_URL', 'new-zealand-surf-trips', 'Destination 3 Image', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(378, 'surf_trips_dest_4_image', '', 'IMAGE_URL', 'new-zealand-surf-trips', 'Destination 4 Image', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(379, 'surf_packages_pricing_eyebrow', 'Simple pricing', 'TEXT', 'surf-packages', 'Pricing Eyebrow', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(380, 'surf_packages_pricing_title', 'Choose your package', 'TEXT', 'surf-packages', 'Pricing Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(381, 'surf_packages_pricing_desc', 'One-off, or save more with a package. All sessions include board, wetsuit, and coaching.', 'TEXT', 'surf-packages', 'Pricing Description', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(382, 'surf_packages_pkg_1_desc', 'Try it out with a single group lesson.', 'TEXT', 'surf-packages', 'Package 1 Description', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(383, 'surf_packages_pkg_3_desc', 'Our most popular option — enough sessions to see real progress.', 'TEXT', 'surf-packages', 'Package 3 Description', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(384, 'surf_packages_pkg_5_desc', 'Best value for committed progression over multiple weeks.', 'TEXT', 'surf-packages', 'Package 5 Description', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(385, 'surf_packages_incl_i5', 'Photos and video of your sessions', 'TEXT', 'surf-packages', 'Included Item 5', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(386, 'surf_packages_incl_i6', 'Local surf report and tide advice', 'TEXT', 'surf-packages', 'Included Item 6', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(387, 'surf_packages_faq_1_q', 'Do packages expire?', 'TEXT', 'surf-packages', 'FAQ 1 Question', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(388, 'surf_packages_faq_1_a', 'No, use your sessions whenever suits you.', 'TEXT', 'surf-packages', 'FAQ 1 Answer', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(389, 'surf_packages_faq_2_q', 'Can I share a package?', 'TEXT', 'surf-packages', 'FAQ 2 Question', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(390, 'surf_packages_faq_2_a', 'Packages are per person, but ask us about group bookings.', 'TEXT', 'surf-packages', 'FAQ 2 Answer', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(391, 'surf_packages_faq_3_q', 'What if the surf is flat?', 'TEXT', 'surf-packages', 'FAQ 3 Question', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(392, 'surf_packages_faq_3_a', 'We reschedule around the forecast at no extra cost.', 'TEXT', 'surf-packages', 'FAQ 3 Answer', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(393, 'global_pkg_1_badge', 'Try it out', 'TEXT', 'global', 'Package 1 Badge', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(394, 'global_pkg_3_badge', 'Most popular', 'TEXT', 'global', 'Package 3 Badge', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(395, 'global_pkg_5_badge', 'Best value', 'TEXT', 'global', 'Package 5 Badge', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(396, 'spots_region_1_name', 'Raglan', 'TEXT', 'spots', 'Region 1 Name', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(397, 'spots_region_1_intro', 'Home base — world-class left-hand point breaks, ideal for all levels.', 'TEXT', 'spots', 'Region 1 Intro', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(398, 'spots_region_1_cta_label', 'Book a lesson in Raglan', 'TEXT', 'spots', 'Region 1 CTA Label', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(399, 'spots_region_1_cta_href', '/book-surf-lesson', 'TEXT', 'spots', 'Region 1 CTA Link', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(400, 'spots_region_1_spot_1_image', '', 'IMAGE_URL', 'spots', 'Region 1 Spot 1 Image', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(401, 'spots_region_1_spot_2_image', '', 'IMAGE_URL', 'spots', 'Region 1 Spot 2 Image', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(402, 'spots_region_1_spot_3_image', '', 'IMAGE_URL', 'spots', 'Region 1 Spot 3 Image', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(403, 'spots_region_1_spot_4_image', '', 'IMAGE_URL', 'spots', 'Region 1 Spot 4 Image', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(404, 'spots_region_2_name', 'Taranaki', 'TEXT', 'spots', 'Region 2 Name', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(405, 'spots_region_2_intro', 'Reef and beach breaks around the mountain, with waves for every swell direction.', 'TEXT', 'spots', 'Region 2 Intro', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(406, 'spots_region_2_cta_label', 'Plan a custom surf trip', 'TEXT', 'spots', 'Region 2 CTA Label', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(407, 'spots_region_2_cta_href', '/new-zealand-surf-trips', 'TEXT', 'spots', 'Region 2 CTA Link', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(408, 'spots_region_2_spot_1_image', '', 'IMAGE_URL', 'spots', 'Region 2 Spot 1 Image', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(409, 'spots_region_2_spot_2_image', '', 'IMAGE_URL', 'spots', 'Region 2 Spot 2 Image', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(410, 'spots_region_2_spot_3_image', '', 'IMAGE_URL', 'spots', 'Region 2 Spot 3 Image', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(411, 'spots_region_2_spot_4_image', '', 'IMAGE_URL', 'spots', 'Region 2 Spot 4 Image', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(412, 'spots_region_3_name', 'Gisborne', 'TEXT', 'spots', 'Region 3 Name', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(413, 'spots_region_3_intro', 'Consistent beach breaks and warmer water on the East Coast.', 'TEXT', 'spots', 'Region 3 Intro', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(414, 'spots_region_3_cta_label', 'Plan a custom surf trip', 'TEXT', 'spots', 'Region 3 CTA Label', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(415, 'spots_region_3_cta_href', '/new-zealand-surf-trips', 'TEXT', 'spots', 'Region 3 CTA Link', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(416, 'spots_region_3_spot_1_image', '', 'IMAGE_URL', 'spots', 'Region 3 Spot 1 Image', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(417, 'spots_region_3_spot_2_image', '', 'IMAGE_URL', 'spots', 'Region 3 Spot 2 Image', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(418, 'spots_region_3_spot_3_image', '', 'IMAGE_URL', 'spots', 'Region 3 Spot 3 Image', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(419, 'spots_region_3_spot_4_image', '', 'IMAGE_URL', 'spots', 'Region 3 Spot 4 Image', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(420, 'spots_region_4_name', 'Wellington & Kapiti', 'TEXT', 'spots', 'Region 4 Name', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(421, 'spots_region_4_intro', 'Exposed beach breaks and reefs, best when the wind lines up.', 'TEXT', 'spots', 'Region 4 Intro', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(422, 'spots_region_4_cta_label', 'Plan a custom surf trip', 'TEXT', 'spots', 'Region 4 CTA Label', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(423, 'spots_region_4_cta_href', '/new-zealand-surf-trips', 'TEXT', 'spots', 'Region 4 CTA Link', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(424, 'spots_region_4_spot_1_image', '', 'IMAGE_URL', 'spots', 'Region 4 Spot 1 Image', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(425, 'spots_region_4_spot_2_image', '', 'IMAGE_URL', 'spots', 'Region 4 Spot 2 Image', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(426, 'spots_region_4_spot_3_image', '', 'IMAGE_URL', 'spots', 'Region 4 Spot 3 Image', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(427, 'spots_region_4_spot_4_image', '', 'IMAGE_URL', 'spots', 'Region 4 Spot 4 Image', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(428, 'spots_region_5_name', 'Northland', 'TEXT', 'spots', 'Region 5 Name', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(429, 'spots_region_5_intro', 'Warmer water and uncrowded beach breaks up north.', 'TEXT', 'spots', 'Region 5 Intro', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(430, 'spots_region_5_cta_label', 'Plan a custom surf trip', 'TEXT', 'spots', 'Region 5 CTA Label', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(431, 'spots_region_5_cta_href', '/new-zealand-surf-trips', 'TEXT', 'spots', 'Region 5 CTA Link', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(432, 'spots_region_5_spot_1_image', '', 'IMAGE_URL', 'spots', 'Region 5 Spot 1 Image', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(433, 'spots_region_5_spot_2_image', '', 'IMAGE_URL', 'spots', 'Region 5 Spot 2 Image', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(434, 'spots_region_5_spot_3_image', '', 'IMAGE_URL', 'spots', 'Region 5 Spot 3 Image', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(435, 'spots_region_5_spot_4_image', '', 'IMAGE_URL', 'spots', 'Region 5 Spot 4 Image', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
(436, 'surf_trip_card_1_title', '5 minutes', 'TEXT', 'surf-trip', 'Card 1 Title', '2026-07-12 12:04:32', '2026-07-12 12:04:32'),
(437, 'surf_trip_card_1_desc', 'Quick and easy to complete', 'TEXT', 'surf-trip', 'Card 1 Description', '2026-07-12 12:04:32', '2026-07-12 12:04:32'),
(438, 'surf_trip_card_2_title', '12 questions', 'TEXT', 'surf-trip', 'Card 2 Title', '2026-07-12 12:04:32', '2026-07-12 12:04:32'),
(439, 'surf_trip_card_2_desc', 'About your level and preferences', 'TEXT', 'surf-trip', 'Card 2 Description', '2026-07-12 12:04:32', '2026-07-12 12:04:32'),
(440, 'surf_trip_card_3_title', 'Custom trip', 'TEXT', 'surf-trip', 'Card 3 Title', '2026-07-12 12:04:32', '2026-07-12 12:04:32'),
(441, 'surf_trip_card_3_desc', 'Tailored just for you', 'TEXT', 'surf-trip', 'Card 3 Description', '2026-07-12 12:04:32', '2026-07-12 12:04:32'),
(442, 'surf_trip_cta', 'Start the quiz →', 'TEXT', 'surf-trip', 'CTA Button Text', '2026-07-12 12:04:32', '2026-07-12 12:04:32'),
(443, 'booking_bank_name', 'ANZ Bank New Zealand', 'TEXT', 'book-surf-lesson', 'Bank Name', '2026-07-18 12:55:25', '2026-07-18 12:55:25'),
(444, 'booking_bank_account_name', 'ALAIA Surf Coach', 'TEXT', 'book-surf-lesson', 'Account Name', '2026-07-18 12:55:25', '2026-07-18 12:55:25'),
(445, 'booking_bank_account_number', '12-3456-7890123-00', 'TEXT', 'book-surf-lesson', 'Account Number', '2026-07-18 12:55:25', '2026-07-18 12:55:25'),
(446, 'booking_payment_note', 'Please use your booking reference number as the transfer particulars so we can match your payment.', 'TEXT', 'book-surf-lesson', 'Payment Note', '2026-07-18 12:55:25', '2026-07-18 12:55:25'),
(447, 'snz_seasons_eyebrow', 'Plan your trip', 'TEXT', 'surf-in-new-zealand', 'Seasons Eyebrow', '2026-07-18 22:41:23', '2026-07-18 22:41:23'),
(448, 'snz_seasons_title', 'Best Time to Surf in New Zealand', 'TEXT', 'surf-in-new-zealand', 'Seasons Title', '2026-07-18 22:41:23', '2026-07-18 22:41:23'),
(449, 'snz_seasons_intro', 'New Zealand picks up swell from almost every direction year-round — but the \"best\" season really depends on which coast you\'re facing. The West Coast fires hardest in winter, the East Coast comes alive during cyclone season (summer into early autumn), and the South Island runs on its own rhythm, driven by the Roaring Forties. Here\'s a general guide before you book.', 'RICHTEXT', 'surf-in-new-zealand', 'Seasons Intro', '2026-07-18 22:41:23', '2026-07-18 22:41:23'),
(450, 'snz_season_summer_title', 'Summer', 'TEXT', 'surf-in-new-zealand', 'Season Summer Title', '2026-07-18 22:41:23', '2026-07-18 22:41:23'),
(451, 'snz_season_summer_desc', 'The easiest season to get in the water nationwide — warmest water of the year (up to 21°C in the north), and generally the calmest window for beginners on most coasts. The East Coast starts picking up its cyclone-season swell.', 'RICHTEXT', 'surf-in-new-zealand', 'Season Summer Description', '2026-07-18 22:41:23', '2026-07-18 22:41:23'),
(452, 'snz_season_autumn_title', 'Autumn', 'TEXT', 'surf-in-new-zealand', 'Season Autumn Title', '2026-07-18 22:41:23', '2026-07-18 22:41:23'),
(453, 'snz_season_autumn_desc', 'A genuine all-rounder — the West Coast\'s swell window begins building, the East Coast\'s cyclone season is tapering off, and the South Island is still firing. Widely considered one of the most consistent stretches of the year.', 'RICHTEXT', 'surf-in-new-zealand', 'Season Autumn Description', '2026-07-18 22:41:23', '2026-07-18 22:41:23'),
(454, 'snz_season_winter_title', 'Winter', 'TEXT', 'surf-in-new-zealand', 'Season Winter Title', '2026-07-18 22:41:23', '2026-07-18 22:41:23'),
(455, 'snz_season_winter_desc', 'Peak season on the West Coast, powered by the Roaring Forties — the biggest, most powerful swells of the year. Water is coldest (12–15°C North Island, 8–10°C South Island), so a thicker wetsuit is essential. Best suited to intermediate and advanced surfers.', 'RICHTEXT', 'surf-in-new-zealand', 'Season Winter Description', '2026-07-18 22:41:23', '2026-07-18 22:41:23'),
(456, 'snz_season_spring_title', 'Spring', 'TEXT', 'surf-in-new-zealand', 'Season Spring Title', '2026-07-18 22:41:23', '2026-07-18 22:41:23'),
(457, 'snz_season_spring_desc', 'A transitional season — the East Coast is waking back up ahead of summer, while the South Island stays in its strong window (running through to April). Variable conditions, often quieter lineups.', 'RICHTEXT', 'surf-in-new-zealand', 'Season Spring Description', '2026-07-18 22:41:23', '2026-07-18 22:41:23'),
(458, 'snz_seasons_coast_title', 'West Coast or East Coast?', 'TEXT', 'surf-in-new-zealand', 'Seasons Coast Title', '2026-07-18 22:43:40', '2026-07-18 22:43:40'),
(459, 'snz_seasons_coast_text', 'The West Coast (Raglan, Piha, Taranaki) holds the more powerful, consistent swell — better suited to intermediate and advanced surfers, or beginners taking lessons in sheltered spots. The East Coast tends to be gentler and more beginner-friendly outside cyclone season, with warmer water for longer. The South Island rewards those chasing bigger, colder, less crowded waves.', 'RICHTEXT', 'surf-in-new-zealand', 'Seasons Coast Text', '2026-07-18 22:43:40', '2026-07-18 22:43:40'),
(460, 'snz_seasons_coast_image', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371788/alaia-surf/eodicbzxomcacqkqfkzp.webp', 'IMAGE_URL', 'surf-in-new-zealand', 'Seasons Coast Image', '2026-07-18 22:46:36', '2026-07-18 22:46:36'),
(461, 'snz_seasons_coast_image_alt', 'Surfing the West Coast of New Zealand', 'TEXT', 'surf-in-new-zealand', 'Seasons Coast Image Alt', '2026-07-18 22:46:36', '2026-07-18 22:46:36'),
(462, 'global_google_review_url', '', 'TEXT', 'global', 'Google Review Link', '2026-07-20 14:35:04', '2026-07-20 14:35:04'),
(463, 'global_tripadvisor_review_url', '', 'TEXT', 'global', 'TripAdvisor Review Link', '2026-07-20 14:35:04', '2026-07-20 14:35:04'),
(464, 'global_banner_enabled', 'true', 'TEXT', 'global', 'Banner Enabled (true/false)', '2026-07-23 21:22:53', '2026-07-23 21:26:33'),
(465, 'global_banner_text', 'Your announcement here test', 'TEXT', 'global', 'Banner Text', '2026-07-23 21:22:53', '2026-07-23 21:26:39'),
(466, 'global_banner_color', '#8b1e1e', 'TEXT', 'global', 'Banner Background Color (hex)', '2026-07-23 21:22:53', '2026-07-23 21:26:57');

-- --------------------------------------------------------

--
-- Table structure for table `time_slots`
--

CREATE TABLE `time_slots` (
  `id` int(11) NOT NULL,
  `lesson_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `duration_minutes` int(11) NOT NULL,
  `max_participants` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `deposit_amount` decimal(10,2) NOT NULL,
  `is_cancelled` tinyint(1) DEFAULT 0,
  `cancel_reason` varchar(500) DEFAULT NULL,
  `cancelled_at` datetime DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `reset_token` varchar(64) DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `reset_token_expires_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cancel_token` (`cancel_token`),
  ADD UNIQUE KEY `group_cancel_token` (`group_cancel_token`),
  ADD UNIQUE KEY `balance_token` (`balance_token`),
  ADD KEY `parent_booking_id` (`parent_booking_id`),
  ADD KEY `idx_slot` (`slot_id`),
  ADD KEY `idx_slot_status` (`slot_id`,`status`),
  ADD KEY `idx_email` (`client_email`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_group_cancel` (`group_cancel_token`),
  ADD KEY `idx_lesson` (`lesson_id`);

--
-- Indexes for table `forms`
--
ALTER TABLE `forms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `form_answers`
--
ALTER TABLE `form_answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `submission_id` (`submission_id`),
  ADD KEY `field_id` (`field_id`);

--
-- Indexes for table `form_fields`
--
ALTER TABLE `form_fields`
  ADD PRIMARY KEY (`id`),
  ADD KEY `form_id` (`form_id`);

--
-- Indexes for table `form_field_options`
--
ALTER TABLE `form_field_options`
  ADD PRIMARY KEY (`id`),
  ADD KEY `field_id` (`field_id`);

--
-- Indexes for table `form_submissions`
--
ALTER TABLE `form_submissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `form_id` (`form_id`);

--
-- Indexes for table `lessons`
--
ALTER TABLE `lessons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `base_lesson_id` (`base_lesson_id`);

--
-- Indexes for table `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `stripe_payment_intent_id` (`stripe_payment_intent_id`),
  ADD KEY `idx_booking` (`booking_id`),
  ADD KEY `idx_stripe_intent` (`stripe_payment_intent_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `site_content`
--
ALTER TABLE `site_content`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `key_name` (`key_name`),
  ADD KEY `idx_site_content_page` (`page`);

--
-- Indexes for table `time_slots`
--
ALTER TABLE `time_slots`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_slot` (`lesson_id`,`date`,`time`),
  ADD KEY `idx_date_time` (`date`,`time`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `role_id` (`role_id`),
  ADD KEY `idx_users_reset_token` (`reset_token`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `forms`
--
ALTER TABLE `forms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `form_answers`
--
ALTER TABLE `form_answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `form_fields`
--
ALTER TABLE `form_fields`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `form_field_options`
--
ALTER TABLE `form_field_options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `form_submissions`
--
ALTER TABLE `form_submissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `lessons`
--
ALTER TABLE `lessons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `media`
--
ALTER TABLE `media`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `site_content`
--
ALTER TABLE `site_content`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=467;

--
-- AUTO_INCREMENT for table `time_slots`
--
ALTER TABLE `time_slots`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`slot_id`) REFERENCES `time_slots` (`id`),
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`parent_booking_id`) REFERENCES `bookings` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `bookings_ibfk_3` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`);

--
-- Constraints for table `form_answers`
--
ALTER TABLE `form_answers`
  ADD CONSTRAINT `form_answers_ibfk_1` FOREIGN KEY (`submission_id`) REFERENCES `form_submissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `form_answers_ibfk_2` FOREIGN KEY (`field_id`) REFERENCES `form_fields` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `form_fields`
--
ALTER TABLE `form_fields`
  ADD CONSTRAINT `form_fields_ibfk_1` FOREIGN KEY (`form_id`) REFERENCES `forms` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `form_field_options`
--
ALTER TABLE `form_field_options`
  ADD CONSTRAINT `form_field_options_ibfk_1` FOREIGN KEY (`field_id`) REFERENCES `form_fields` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `form_submissions`
--
ALTER TABLE `form_submissions`
  ADD CONSTRAINT `form_submissions_ibfk_1` FOREIGN KEY (`form_id`) REFERENCES `forms` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `lessons`
--
ALTER TABLE `lessons`
  ADD CONSTRAINT `lessons_ibfk_1` FOREIGN KEY (`base_lesson_id`) REFERENCES `lessons` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `time_slots`
--
ALTER TABLE `time_slots`
  ADD CONSTRAINT `time_slots_ibfk_1` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
