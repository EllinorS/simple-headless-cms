SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--

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
(31, 'surfer-ocean-new-zealand.webp', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371781/alaia-surf/smiellaliohhjewonehe.webp', 'image/webp', 148900, NULL, '2026-05-21 15:56:22', 'alaia-surf/smiellaliohhjewonehe'),
(32, 'new-zealand-night-sky-roadtrip.webp', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371782/alaia-surf/xd1kbfq78ssesmzjp5vt.webp', 'image/webp', 246934, NULL, '2026-05-21 15:56:23', 'alaia-surf/xd1kbfq78ssesmzjp5vt'),
(33, 'chasing-waves-road-trip.webp', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371783/alaia-surf/zgkepdzy0lvnj2u7qpzz.webp', 'image/webp', 169892, NULL, '2026-05-21 15:56:24', 'alaia-surf/zgkepdzy0lvnj2u7qpzz'),
(34, 'surf-aerial-view.webp', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371784/alaia-surf/fq0o281g1kk1dhenvlsv.webp', 'image/webp', 256754, NULL, '2026-05-21 15:56:25', 'alaia-surf/fq0o281g1kk1dhenvlsv'),
(35, 'van-roadtrip-new-zealand.webp', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371785/alaia-surf/kltuby2vrkyzghtjzeot.webp', 'image/webp', 163502, NULL, '2026-05-21 15:56:26', 'alaia-surf/kltuby2vrkyzghtjzeot'),
(36, 'sunset-ocean-roadtrip-van-new-zealand.webp', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371786/alaia-surf/oechyazulz7pypu1ecj7.webp', 'image/webp', 153012, NULL, '2026-05-21 15:56:27', 'alaia-surf/oechyazulz7pypu1ecj7'),
(37, 'surfboards-under-flax.webp', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371787/alaia-surf/esvdj5gkashhayapvujz.webp', 'image/webp', 210158, NULL, '2026-05-21 15:56:28', 'alaia-surf/esvdj5gkashhayapvujz'),
(38, 'surf-west-coast-new-zealand.webp', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371788/alaia-surf/eodicbzxomcacqkqfkzp.webp', 'image/webp', 220306, NULL, '2026-05-21 15:56:29', 'alaia-surf/eodicbzxomcacqkqfkzp'),
(39, 'surfer-roadtrip-new-zealand.webp', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371789/alaia-surf/w0qabnxvbjmxn6x5aks9.webp', 'image/webp', 93198, NULL, '2026-05-21 15:56:30', 'alaia-surf/w0qabnxvbjmxn6x5aks9'),
(40, 'roadtrip-ocean-sunset.webp', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371790/alaia-surf/cnzdrzxqkf6uqfksot0z.webp', 'image/webp', 72010, NULL, '2026-05-21 15:56:31', 'alaia-surf/cnzdrzxqkf6uqfksot0z'),
(41, 'surf-instructor-paco-new-zealand.webp', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371791/alaia-surf/ct91azvupsopyngfh9e1.webp', 'image/webp', 194048, NULL, '2026-05-21 15:56:31', 'alaia-surf/ct91azvupsopyngfh9e1'),
(42, 'Paco-Goalard-surf-instructor.webp', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371861/alaia-surf/zjfedvfev8dbut3wxrlp.webp', 'image/webp', 162634, NULL, '2026-05-21 15:57:42', 'alaia-surf/zjfedvfev8dbut3wxrlp'),
(44, 'muriwai-beach-in-new-zealand-landscape-web.mp4', 'https://res.cloudinary.com/dz8bupnto/video/upload/v1779372316/alaia-surf/dd3emacx5bcgbixlrtmg.mp4', 'video/mp4', 2923991, NULL, '2026-05-21 16:05:17', 'alaia-surf/dd3emacx5bcgbixlrtmg'),
(45, 'new-zealand-beach-discover-landscape-web.mp4', 'https://res.cloudinary.com/dz8bupnto/video/upload/v1779372317/alaia-surf/iq3kehca43jcks49pyzz.mp4', 'video/mp4', 1240711, NULL, '2026-05-21 16:05:18', 'alaia-surf/iq3kehca43jcks49pyzz'),
(46, 'new-zealand-beach-landscape-web.mp4', 'https://res.cloudinary.com/dz8bupnto/video/upload/v1779372319/alaia-surf/d3v99keh5deqdfws8htv.mp4', 'video/mp4', 1003367, NULL, '2026-05-21 16:05:21', 'alaia-surf/d3v99keh5deqdfws8htv'),
(47, 'new-zealand-ocean-road-landscape-web.mp4', 'https://res.cloudinary.com/dz8bupnto/video/upload/v1779372321/alaia-surf/ykzgpfosfz9hdenzppnx.mp4', 'video/mp4', 2991946, NULL, '2026-05-21 16:05:22', 'alaia-surf/ykzgpfosfz9hdenzppnx'),
(48, 'new-zealand-ocean-road-lanscape-web.mp4', 'https://res.cloudinary.com/dz8bupnto/video/upload/v1779372323/alaia-surf/rcdfwlvb6ufgfgzsyqcy.mp4', 'video/mp4', 1845967, NULL, '2026-05-21 16:05:24', 'alaia-surf/rcdfwlvb6ufgfgzsyqcy'),
(49, 'new-zealand-east-coast-surf-landscape-web.mp4', 'https://res.cloudinary.com/dz8bupnto/video/upload/v1779372324/alaia-surf/yhysodlwfsrdevjsi0by.mp4', 'video/mp4', 796660, NULL, '2026-05-21 16:05:26', 'alaia-surf/yhysodlwfsrdevjsi0by'),
(50, 'raglan-beach-in-new-zealand-landscape-web.mp4', 'https://res.cloudinary.com/dz8bupnto/video/upload/v1779372326/alaia-surf/fzon5shim6aokmiiaevh.mp4', 'video/mp4', 2633018, NULL, '2026-05-21 16:05:28', 'alaia-surf/fzon5shim6aokmiiaevh'),
(51, 'surf-lesson-beginner.jpg', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779373643/alaia-surf/hpo2dem08dmhzagml7j2.jpg', 'image/jpeg', 1130380, NULL, '2026-05-21 16:27:24', 'alaia-surf/hpo2dem08dmhzagml7j2'),
(52, 'surf-group-lesson-beginner.jpg', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779373644/alaia-surf/uiaussgbgrvytoqgom4q.jpg', 'image/jpeg', 783028, NULL, '2026-05-21 16:27:25', 'alaia-surf/uiaussgbgrvytoqgom4q'),
(53, 'Paco-surf-instructor-raglan-web.mp4', 'https://res.cloudinary.com/dz8bupnto/video/upload/v1779375310/alaia-surf/co2aazaouunhxouemvza.mp4', 'video/mp4', 2386907, NULL, '2026-05-21 16:55:11', 'alaia-surf/co2aazaouunhxouemvza'),
(54, 'new-zealand-surf-spot.webp', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779379786/alaia-surf/am2brubss0rr42ejbffm.webp', 'image/webp', 122916, NULL, '2026-05-21 18:09:47', 'alaia-surf/am2brubss0rr42ejbffm');

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
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `time` varchar(10) NOT NULL,
  `type` varchar(50) NOT NULL,
  `duration` varchar(10) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `price` decimal(10,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(1, 'home_hero_title', 'Your next adventure starts here', 'TEXT', 'home', 'Hero Title', '2026-04-26 12:39:12', '2026-05-21 23:42:36'),
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
(52, 'home_hero_image', 'https://res.cloudinary.com/dz8bupnto/video/upload/v1779372326/alaia-surf/fzon5shim6aokmiiaevh.mp4', 'IMAGE_URL', 'home', 'Hero Background Image', '2026-05-15 21:30:34', '2026-05-21 16:31:14'),
(53, 'home_coach_image', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371791/alaia-surf/ct91azvupsopyngfh9e1.webp', 'IMAGE_URL', 'home', 'Coach Image', '2026-05-15 21:30:34', '2026-05-21 16:57:56'),
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
(81, 'surf_trip_hero_subtitle', 'Tell us about your experience and what you\'re looking for. We\'ll design the perfect New Zealand surf adventure for you.', 'RICHTEXT', 'surf-trip', 'Hero Subtitle', '2026-05-17 19:12:23', '2026-05-17 19:12:23'),
(89, 'terms_title', 'Terms & Conditions', 'TEXT', 'terms', 'Page Title', '2026-05-19 13:09:36', '2026-05-19 13:09:36'),
(90, 'terms_last_updated', 'May 2026', 'TEXT', 'terms', 'Last Updated', '2026-05-19 13:09:36', '2026-05-19 13:09:36'),
(91, 'terms_body', 'Welcome to ALAIA Surf Coach. By booking a lesson or surf trip with us, you agree to the following terms.\r\n\r\nBookings & Payment\r\nAll bookings are confirmed once payment has been received. Payment is taken on the day of your session unless otherwise agreed.\r\n\r\nCancellations\r\nCancellations made more than 24 hours in advance are eligible for a full reschedule. Cancellations within 24 hours may not be eligible for a reschedule. In the event of extreme weather or unsafe ocean conditions, we reserve the right to reschedule your session at no cost to you.\r\n\r\nHealth & Safety\r\nParticipants are expected to be in reasonable physical health and able to swim at least 50 metres. You must inform your coach of any medical conditions before the session begins. ALAIA Surf Coach reserves the right to refuse participation if a participant is deemed unfit or poses a safety risk.\r\n\r\nLiability\r\nSurfing involves inherent risks. By participating, you acknowledge and accept these risks. ALAIA Surf Coach is not liable for personal injury, loss, or damage arising from participation in our activities, except where required by law.\r\n\r\nCode of Conduct\r\nWe expect all participants to treat fellow surfers, coaches, and the ocean environment with respect. Harassment or disrespectful behaviour will result in immediate removal from the session without refund.\r\n\r\nContact\r\nFor any questions about these terms, please contact us via the contact page on our website.', 'RICHTEXT', 'terms', 'Content', '2026-05-19 13:09:36', '2026-05-19 13:09:36'),
(92, 'privacy_title', 'Privacy Policy', 'TEXT', 'privacy', 'Page Title', '2026-05-19 13:09:46', '2026-05-19 13:09:46'),
(93, 'privacy_last_updated', 'May 2026', 'TEXT', 'privacy', 'Last Updated', '2026-05-19 13:09:46', '2026-05-19 13:09:46'),
(94, 'privacy_body', 'ALAIA Surf Coach is committed to protecting your privacy. This policy explains how we collect, use, and store your personal information.\r\n\r\nInformation We Collect\r\nWhen you book a lesson or submit an enquiry, we collect your name, email address, phone number, and any other information you choose to provide. We do not collect payment card details directly.\r\n\r\nHow We Use Your Information\r\nWe use your information to confirm bookings, send reminders and updates, respond to enquiries, and improve our services. We do not sell or share your personal data with third parties.\r\n\r\nEmail Communications\r\nBy providing your email address, you consent to receiving booking confirmations and service-related emails. You may opt out of marketing communications at any time by contacting us.\r\n\r\nData Storage & Security\r\nYour data is stored securely and retained only as long as necessary for the purposes outlined above. We take reasonable technical measures to protect your information from unauthorised access.\r\n\r\nYour Rights\r\nYou have the right to request access to, correction of, or deletion of your personal data at any time. To exercise these rights, please contact us through the contact page on our website.\r\n\r\nCookies\r\nOur website may use cookies to improve your browsing experience. You can disable cookies in your browser settings at any time.\r\n\r\nChanges to This Policy\r\nWe may update this privacy policy from time to time. The latest version will always be available on this page.', 'RICHTEXT', 'privacy', 'Content', '2026-05-19 13:09:46', '2026-05-19 13:09:46'),
(95, 'snz_hero_title', 'Surf in New Zealand', 'TEXT', 'surf-in-new-zealand', 'Hero Title', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(96, 'snz_hero_subtitle', 'Surf lessons, packages and custom trips — based in Raglan, New Zealand.', 'TEXT', 'surf-in-new-zealand', 'Hero Subtitle', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(97, 'snz_hero_image', 'https://res.cloudinary.com/dz8bupnto/video/upload/v1779372317/alaia-surf/iq3kehca43jcks49pyzz.mp4', 'IMAGE_URL', 'surf-in-new-zealand', 'Hero Background Image', '2026-05-20 00:00:00', '2026-05-21 16:56:16'),
(98, 'snz_lessons_eyebrow', 'Raglan, New Zealand', 'TEXT', 'surf-in-new-zealand', 'Lessons Eyebrow', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(99, 'snz_lessons_title', 'Surf Lessons', 'TEXT', 'surf-in-new-zealand', 'Lessons Title', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(100, 'snz_lessons_desc', 'Group lessons, private sessions and coaching in Raglan — for every level, at every stage of your surf journey.', 'RICHTEXT', 'surf-in-new-zealand', 'Lessons Description', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(101, 'snz_lessons_b1', 'Small groups of 4 students maximum', 'TEXT', 'surf-in-new-zealand', 'Lessons Bullet 1', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(102, 'snz_lessons_b2', 'Board & wetsuit included', 'TEXT', 'surf-in-new-zealand', 'Lessons Bullet 2', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(103, 'snz_lessons_b3', 'Ocean safety briefing every session', 'TEXT', 'surf-in-new-zealand', 'Lessons Bullet 3', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(104, 'snz_lessons_b4', 'Beginner to intermediate levels welcome', 'TEXT', 'surf-in-new-zealand', 'Lessons Bullet 4', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(105, 'snz_packages_eyebrow', 'More sessions, better value', 'TEXT', 'surf-in-new-zealand', 'Packages Eyebrow', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(106, 'snz_packages_title', 'Surf Packages', 'TEXT', 'surf-in-new-zealand', 'Packages Title', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(107, 'snz_packages_desc', 'Book 3 or 5 sessions and save. Pick your dates one at a time — no expiry date.', 'RICHTEXT', 'surf-in-new-zealand', 'Packages Description', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(108, 'snz_packages_b1', 'Single lesson — $60', 'TEXT', 'surf-in-new-zealand', 'Packages Bullet 1', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(109, 'snz_packages_b2', '3-lesson package — $160 (save $20)', 'TEXT', 'surf-in-new-zealand', 'Packages Bullet 2', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(110, 'snz_packages_b3', '5-lesson package — $250 (save $50)', 'TEXT', 'surf-in-new-zealand', 'Packages Bullet 3', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(111, 'snz_trips_eyebrow', 'New Zealand, your way', 'TEXT', 'surf-in-new-zealand', 'Trips Eyebrow', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(112, 'snz_trips_title', 'Custom Surf Trips', 'TEXT', 'surf-in-new-zealand', 'Trips Title', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(113, 'snz_trips_desc', 'We plan the route, read the forecast, and coach you in the water. You just focus on surfing.', 'RICHTEXT', 'surf-in-new-zealand', 'Trips Description', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(114, 'snz_trips_b1', 'Spot selection based on your level & the forecast', 'TEXT', 'surf-in-new-zealand', 'Trips Bullet 1', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(115, 'snz_trips_b2', 'Personalised coaching in the water', 'TEXT', 'surf-in-new-zealand', 'Trips Bullet 2', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(116, 'snz_trips_b3', 'Local knowledge — we know where the crowds aren\'t', 'TEXT', 'surf-in-new-zealand', 'Trips Bullet 3', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
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
(140, 'global_price_group_adults', '60', 'NUMBER', 'global', 'Group Lesson Adults (NZD)', '2026-05-21 18:37:00', '2026-05-21 18:37:00'),
(141, 'global_price_group_kids', '40', 'NUMBER', 'global', 'Group Lesson Kids (NZD)', '2026-05-21 18:37:00', '2026-05-21 18:37:59'),
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
(188, 'faq_cat4_item3_a', 'If we cancel a session for any reason (weather, emergency), you\'ll be notified by email and offered a full reschedule at no extra cost.', 'TEXT', 'faq', 'Cat 4 — A3', '2026-05-27 09:53:03', '2026-05-27 09:53:03');

INSERT INTO `site_content` (`key_name`, `value`, `type`, `page`, `label`, `created_at`, `updated_at`) VALUES
('surf_trip_hero_image', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371781/alaia-surf/smiellaliohhjewonehe.webp', 'IMAGE_URL', 'surf-trip', 'Hero Background Image', '2026-06-05 00:00:00', '2026-06-05 00:00:00'),
('spots_card_1_name', 'Raglan', 'TEXT', 'surf-trip', 'Card 1 Name', '2026-06-05 00:00:00', '2026-06-05 00:00:00'),
('spots_card_1_region', 'Waikato', 'TEXT', 'surf-trip', 'Card 1 Region', '2026-06-05 00:00:00', '2026-06-05 00:00:00'),
('spots_card_1_type', 'Point breaks', 'TEXT', 'surf-trip', 'Card 1 Wave Type', '2026-06-05 00:00:00', '2026-06-05 00:00:00'),
('spots_card_1_level', 'All levels', 'TEXT', 'surf-trip', 'Card 1 Level', '2026-06-05 00:00:00', '2026-06-05 00:00:00'),
('spots_card_1_desc', 'Home base. World-class left-hand point breaks that cater to every level — from the gentle beach break at Ngarunui to the legendary long walls of Manu Bay.', 'RICHTEXT', 'surf-trip', 'Card 1 Description', '2026-06-05 00:00:00', '2026-06-05 00:00:00'),
('spots_card_1_image', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371781/alaia-surf/smiellaliohhjewonehe.webp', 'IMAGE_URL', 'surf-trip', 'Card 1 Image', '2026-06-05 00:00:00', '2026-06-05 00:00:00'),
('spots_card_2_name', 'Northland', 'TEXT', 'surf-trip', 'Card 2 Name', '2026-06-05 00:00:00', '2026-06-05 00:00:00'),
('spots_card_2_region', 'Te Tai Tokerau', 'TEXT', 'surf-trip', 'Card 2 Region', '2026-06-05 00:00:00', '2026-06-05 00:00:00'),
('spots_card_2_type', 'Beach breaks', 'TEXT', 'surf-trip', 'Card 2 Wave Type', '2026-06-05 00:00:00', '2026-06-05 00:00:00'),
('spots_card_2_level', 'All levels', 'TEXT', 'surf-trip', 'Card 2 Level', '2026-06-05 00:00:00', '2026-06-05 00:00:00'),
('spots_card_2_desc', 'Warm water, long stretches of uncrowded beach, and consistent swell year-round. Ideal for a relaxed road trip with waves for everyone — from sheltered bays to exposed west coast breaks.', 'RICHTEXT', 'surf-trip', 'Card 2 Description', '2026-06-05 00:00:00', '2026-06-05 00:00:00'),
('spots_card_2_image', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371788/alaia-surf/eodicbzxomcacqkqfkzp.webp', 'IMAGE_URL', 'surf-trip', 'Card 2 Image', '2026-06-05 00:00:00', '2026-06-05 00:00:00'),
('spots_card_3_name', 'Gisborne', 'TEXT', 'surf-trip', 'Card 3 Name', '2026-06-05 00:00:00', '2026-06-05 00:00:00'),
('spots_card_3_region', 'East Cape', 'TEXT', 'surf-trip', 'Card 3 Region', '2026-06-05 00:00:00', '2026-06-05 00:00:00'),
('spots_card_3_type', 'Beach & point breaks', 'TEXT', 'surf-trip', 'Card 3 Wave Type', '2026-06-05 00:00:00', '2026-06-05 00:00:00'),
('spots_card_3_level', 'Beginner to Intermediate', 'TEXT', 'surf-trip', 'Card 3 Level', '2026-06-05 00:00:00', '2026-06-05 00:00:00'),
('spots_card_3_desc', 'The first city in the world to see the sunrise. Gisborne catches easterly and southerly swells that bypass the rest of the country — quality waves with almost no crowds. A hidden gem.', 'RICHTEXT', 'surf-trip', 'Card 3 Description', '2026-06-05 00:00:00', '2026-06-05 00:00:00'),
('spots_card_3_image', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779379786/alaia-surf/am2brubss0rr42ejbffm.webp', 'IMAGE_URL', 'surf-trip', 'Card 3 Image', '2026-06-05 00:00:00', '2026-06-05 00:00:00'),
('spots_card_4_name', 'The Catlins', 'TEXT', 'surf-trip', 'Card 4 Name', '2026-06-05 00:00:00', '2026-06-05 00:00:00'),
('spots_card_4_region', 'Southland', 'TEXT', 'surf-trip', 'Card 4 Region', '2026-06-05 00:00:00', '2026-06-05 00:00:00'),
('spots_card_4_type', 'Beach breaks', 'TEXT', 'surf-trip', 'Card 4 Wave Type', '2026-06-05 00:00:00', '2026-06-05 00:00:00'),
('spots_card_4_level', 'Intermediate to Advanced', 'TEXT', 'surf-trip', 'Card 4 Level', '2026-06-05 00:00:00', '2026-06-05 00:00:00'),
('spots_card_4_desc', 'Raw Southern Ocean swell, old-growth rainforest meeting the sea, and complete solitude. The Catlins is New Zealand at its most wild — powerful, dramatic, and utterly unforgettable.', 'RICHTEXT', 'surf-trip', 'Card 4 Description', '2026-06-05 00:00:00', '2026-06-05 00:00:00'),
('spots_card_4_image', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371783/alaia-surf/zgkepdzy0lvnj2u7qpzz.webp', 'IMAGE_URL', 'surf-trip', 'Card 4 Image', '2026-06-05 00:00:00', '2026-06-05 00:00:00');

INSERT INTO `site_content` (`key_name`, `value`, `type`, `page`, `label`, `created_at`, `updated_at`) VALUES
('surf_lessons_hero_title', 'Surf Lessons in Raglan', 'TEXT', 'surf-lessons', 'Hero Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_lessons_hero_subtitle', 'Group, private and coaching sessions for every level', 'TEXT', 'surf-lessons', 'Hero Subtitle', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_lessons_hero_image', '', 'IMAGE_URL', 'surf-lessons', 'Hero Background Image', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_lessons_hero_image_alt', 'Surfers paddling out in Raglan', 'TEXT', 'surf-lessons', 'Hero Image Alt Text', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_lessons_group_eyebrow', 'Most popular', 'TEXT', 'surf-lessons', 'Group Eyebrow', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_lessons_group_title', 'Group Lessons', 'TEXT', 'surf-lessons', 'Group Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_lessons_group_desc', 'Join a fun, energetic group session designed for all levels. Learn the fundamentals of surfing alongside others in a small, supportive group.', 'RICHTEXT', 'surf-lessons', 'Group Description', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_lessons_group_b1', 'Learn to read waves and ocean safety', 'TEXT', 'surf-lessons', 'Group Bullet 1', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_lessons_group_b2', 'Master the pop-up technique', 'TEXT', 'surf-lessons', 'Group Bullet 2', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_lessons_group_b3', 'Ride your first waves in a small group', 'TEXT', 'surf-lessons', 'Group Bullet 3', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_lessons_private_eyebrow', 'One on one', 'TEXT', 'surf-lessons', 'Private Eyebrow', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_lessons_private_title', 'Private Lessons', 'TEXT', 'surf-lessons', 'Private Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_lessons_private_desc', 'Get personalised one-on-one coaching tailored to your exact skill level. Perfect for rapid progression.', 'RICHTEXT', 'surf-lessons', 'Private Description', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_lessons_private_b1', '100% focused on your technique', 'TEXT', 'surf-lessons', 'Private Bullet 1', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_lessons_private_b2', 'Flexible scheduling', 'TEXT', 'surf-lessons', 'Private Bullet 2', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_lessons_private_b3', 'Fastest way to progress', 'TEXT', 'surf-lessons', 'Private Bullet 3', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_lessons_coaching_eyebrow', 'Level up', 'TEXT', 'surf-lessons', 'Coaching Eyebrow', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_lessons_coaching_title', 'Surf Coaching', 'TEXT', 'surf-lessons', 'Coaching Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_lessons_coaching_desc', 'Already riding waves? Performance coaching to refine your technique and push your surfing to the next level.', 'RICHTEXT', 'surf-lessons', 'Coaching Description', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_lessons_coaching_b1', 'Video analysis of your surfing', 'TEXT', 'surf-lessons', 'Coaching Bullet 1', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_lessons_coaching_b2', 'Advanced manoeuvre technique', 'TEXT', 'surf-lessons', 'Coaching Bullet 2', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_lessons_coaching_b3', 'Tailored to intermediate/advanced surfers', 'TEXT', 'surf-lessons', 'Coaching Bullet 3', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_lessons_spots_title', 'Where your lesson takes place', 'TEXT', 'surf-lessons', 'Spots Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_lessons_spots_desc', 'Lessons run at whichever beach has the best conditions on the day.', 'TEXT', 'surf-lessons', 'Spots Description', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_lessons_spot_1_name', 'Ngarunui Beach', 'TEXT', 'surf-lessons', 'Spot 1 Name', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_lessons_spot_1_level', 'Beginner', 'TEXT', 'surf-lessons', 'Spot 1 Level', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_lessons_spot_1_type', 'Beach break', 'TEXT', 'surf-lessons', 'Spot 1 Wave Type', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_lessons_spot_1_desc', 'Patrolled beach break, gentle whitewash — ideal for first-timers.', 'TEXT', 'surf-lessons', 'Spot 1 Description', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_lessons_spot_2_name', 'Ruapuke', 'TEXT', 'surf-lessons', 'Spot 2 Name', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_lessons_spot_2_level', 'All levels', 'TEXT', 'surf-lessons', 'Spot 2 Level', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_lessons_spot_2_type', 'Beach break', 'TEXT', 'surf-lessons', 'Spot 2 Wave Type', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_lessons_spot_2_desc', 'A quieter alternative with consistent banks for all levels.', 'TEXT', 'surf-lessons', 'Spot 2 Description', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_lessons_contact_title', 'Ready to catch your first wave?', 'TEXT', 'surf-lessons', 'Final CTA Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_lessons_contact_desc', 'Book your lesson today and get in the water with a qualified coach.', 'TEXT', 'surf-lessons', 'Final CTA Description', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_trips_hero_title', 'Custom Surf Trips in New Zealand', 'TEXT', 'new-zealand-surf-trips', 'Hero Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_trips_hero_subtitle', 'A personalised surf road trip, tailored to your level and goals', 'TEXT', 'new-zealand-surf-trips', 'Hero Subtitle', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_trips_hero_image', '', 'IMAGE_URL', 'new-zealand-surf-trips', 'Hero Background Image', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_trips_hero_image_alt', 'Van road trip in New Zealand', 'TEXT', 'new-zealand-surf-trips', 'Hero Image Alt Text', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_trips_intro_eyebrow', 'New Zealand, your way', 'TEXT', 'new-zealand-surf-trips', 'Intro Eyebrow', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_trips_intro_title', 'More than a surf trip — a coaching adventure', 'TEXT', 'new-zealand-surf-trips', 'Intro Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_trips_intro_desc', 'We design a custom itinerary around your level, the swell, and your schedule — then coach you at every stop along the way.', 'RICHTEXT', 'new-zealand-surf-trips', 'Intro Description', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_trips_how_title', 'How it works', 'TEXT', 'new-zealand-surf-trips', 'How It Works Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_trips_how_desc', 'From a quick chat to hitting the road, here''s how your custom trip comes together.', 'TEXT', 'new-zealand-surf-trips', 'How It Works Description', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_trips_step_1_title', 'Tell us about yourself', 'TEXT', 'new-zealand-surf-trips', 'Step 1 Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_trips_step_1_desc', 'Your level, your dates, and what you want to get out of the trip.', 'TEXT', 'new-zealand-surf-trips', 'Step 1 Description', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_trips_step_2_title', 'We design your trip', 'TEXT', 'new-zealand-surf-trips', 'Step 2 Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_trips_step_2_desc', 'A custom itinerary built around the swell forecast and your goals.', 'TEXT', 'new-zealand-surf-trips', 'Step 2 Description', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_trips_step_3_title', 'Hit the road', 'TEXT', 'new-zealand-surf-trips', 'Step 3 Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_trips_step_3_desc', 'We coach you at every stop, chasing the best waves for your level.', 'TEXT', 'new-zealand-surf-trips', 'Step 3 Description', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_trips_included_eyebrow', 'What''s included', 'TEXT', 'new-zealand-surf-trips', 'Included Eyebrow', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_trips_included_title', 'Everything you need, nothing you don''t', 'TEXT', 'new-zealand-surf-trips', 'Included Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_trips_included_i1', 'Custom itinerary based on your level and goals', 'TEXT', 'new-zealand-surf-trips', 'Included Item 1', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_trips_included_i2', 'Coaching at every stop', 'TEXT', 'new-zealand-surf-trips', 'Included Item 2', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_trips_included_i3', 'Local knowledge of the best spots for the day''s swell', 'TEXT', 'new-zealand-surf-trips', 'Included Item 3', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_trips_included_i4', 'Board and wetsuit provided', 'TEXT', 'new-zealand-surf-trips', 'Included Item 4', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_trips_feat_1_title', 'Local knowledge', 'TEXT', 'new-zealand-surf-trips', 'Feature 1 Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_trips_feat_1_sub', 'Years of coaching every break on this coastline', 'TEXT', 'new-zealand-surf-trips', 'Feature 1 Subtitle', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_trips_feat_2_title', 'Swell-chasing', 'TEXT', 'new-zealand-surf-trips', 'Feature 2 Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_trips_feat_2_sub', 'The itinerary follows the forecast, not a fixed route', 'TEXT', 'new-zealand-surf-trips', 'Feature 2 Subtitle', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_trips_feat_3_title', 'All levels', 'TEXT', 'new-zealand-surf-trips', 'Feature 3 Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_trips_feat_3_sub', 'From first waves to performance coaching', 'TEXT', 'new-zealand-surf-trips', 'Feature 3 Subtitle', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_trips_feat_4_title', 'Small groups', 'TEXT', 'new-zealand-surf-trips', 'Feature 4 Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_trips_feat_4_sub', 'More time in the water, less time waiting around', 'TEXT', 'new-zealand-surf-trips', 'Feature 4 Subtitle', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_trips_dest_title', 'Where we surf', 'TEXT', 'new-zealand-surf-trips', 'Destinations Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_trips_dest_desc', 'A sample of the coastline your trip could cover, depending on the swell.', 'TEXT', 'new-zealand-surf-trips', 'Destinations Description', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_trips_dest_1_image', '', 'IMAGE_URL', 'new-zealand-surf-trips', 'Destination 1 Image', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_trips_dest_2_image', '', 'IMAGE_URL', 'new-zealand-surf-trips', 'Destination 2 Image', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_trips_dest_3_image', '', 'IMAGE_URL', 'new-zealand-surf-trips', 'Destination 3 Image', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_trips_dest_4_image', '', 'IMAGE_URL', 'new-zealand-surf-trips', 'Destination 4 Image', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_trips_cta_title', 'Ready to chase waves?', 'TEXT', 'new-zealand-surf-trips', 'CTA Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_trips_cta_desc', 'Tell us about your level and what you''re looking for, and we''ll build your custom trip.', 'TEXT', 'new-zealand-surf-trips', 'CTA Description', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('spots_hero_title', 'Surf Spots in New Zealand', 'TEXT', 'spots', 'Hero Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('spots_hero_subtitle', '3,000 km of coastline. A wave for every level.', 'TEXT', 'spots', 'Hero Subtitle', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('spots_hero_image', '', 'IMAGE_URL', 'spots', 'Hero Background Image', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('spots_hero_image_alt', 'Aerial view of a surf break in New Zealand', 'TEXT', 'spots', 'Hero Image Alt Text', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('spots_intro_eyebrow', 'Aotearoa New Zealand', 'TEXT', 'spots', 'Intro Eyebrow', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('spots_intro_title', 'A region-by-region guide', 'TEXT', 'spots', 'Intro Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('spots_intro_desc', 'From the world-famous point breaks of Raglan to the powerful reefs of Taranaki and the warm beaches of Northland — find your wave.', 'RICHTEXT', 'spots', 'Intro Description', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('spots_region_1_image', '', 'IMAGE_URL', 'spots', 'Region 1 Photo', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('spots_region_2_image', '', 'IMAGE_URL', 'spots', 'Region 2 Photo', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('spots_region_3_image', '', 'IMAGE_URL', 'spots', 'Region 3 Photo', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('spots_region_4_image', '', 'IMAGE_URL', 'spots', 'Region 4 Photo', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('spots_cta_title', 'Ready to discover New Zealand by surf?', 'TEXT', 'spots', 'CTA Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('spots_cta_desc', 'Book a lesson in Raglan or plan a custom surf trip across the whole country.', 'TEXT', 'spots', 'CTA Description', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_packages_hero_title', 'Surf Lesson Packages', 'TEXT', 'surf-packages', 'Hero Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_packages_hero_subtitle', 'Book more sessions, save more, progress faster', 'TEXT', 'surf-packages', 'Hero Subtitle', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_packages_hero_image', '', 'IMAGE_URL', 'surf-packages', 'Hero Background Image', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_packages_hero_image_alt', 'Surfers paddling in Raglan, New Zealand', 'TEXT', 'surf-packages', 'Hero Image Alt Text', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_packages_why_title', 'Why a package works better', 'TEXT', 'surf-packages', 'Why Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_packages_why_desc', 'Real progression takes repetition. A package keeps you coming back and builds momentum.', 'TEXT', 'surf-packages', 'Why Description', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_packages_why_1_title', 'Faster progression', 'TEXT', 'surf-packages', 'Why 1 Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_packages_why_1_desc', 'Repetition builds muscle memory — 3 or 5 sessions gets you there quicker than one-offs.', 'TEXT', 'surf-packages', 'Why 1 Description', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_packages_why_2_title', 'Better value', 'TEXT', 'surf-packages', 'Why 2 Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_packages_why_2_desc', 'Save per session compared to booking lessons one at a time.', 'TEXT', 'surf-packages', 'Why 2 Description', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_packages_why_3_title', 'Flexible scheduling', 'TEXT', 'surf-packages', 'Why 3 Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_packages_why_3_desc', 'Use your sessions whenever suits, no fixed weekly slot required.', 'TEXT', 'surf-packages', 'Why 3 Description', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_packages_incl_title', 'What''s included in every session', 'TEXT', 'surf-packages', 'Included Title', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_packages_incl_desc', 'No hidden extras — everything you need is provided.', 'TEXT', 'surf-packages', 'Included Description', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_packages_incl_i1', 'Board and wetsuit provided', 'TEXT', 'surf-packages', 'Included Item 1', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_packages_incl_i2', 'Small group sizes, max 4 per coach', 'TEXT', 'surf-packages', 'Included Item 2', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_packages_incl_i3', 'Qualified, experienced surf coach', 'TEXT', 'surf-packages', 'Included Item 3', '2026-07-11 00:00:00', '2026-07-11 00:00:00'),
('surf_packages_incl_i4', 'Flexible booking, reschedule any time', 'TEXT', 'surf-packages', 'Included Item 4', '2026-07-11 00:00:00', '2026-07-11 00:00:00');

-- --------------------------------------------------------

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
  `is_active` tinyint(1) DEFAULT 1,
  `last_login` datetime DEFAULT NULL,
  `reset_token_expires_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `role_id`, `email`, `password`, `first_name`, `last_name`, `reset_token`, `is_active`, `last_login`, `reset_token_expires_at`, `created_at`, `updated_at`) VALUES
(2, 1, 'ellinor.st@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$hulgVMQbc5b18YB7xfu4eA$ASJY++vEoNF5FbBwIyPTBV6ZcFSGcmn6w7fvGpEBPKs', 'Admin', 'ALAIA', 'cfb3601b-8fb3-4a40-a43c-2340fae7215a', 1, '2026-05-29 10:42:16', '2026-05-26 21:13:44', '2026-05-13 14:17:06', '2026-05-29 10:42:16');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `site_content`
--
ALTER TABLE `site_content`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `key_name` (`key_name`),
  ADD KEY `idx_site_content_page` (`page`);

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
-- AUTO_INCREMENT for table `media`
--
ALTER TABLE `media`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `site_content`
--
ALTER TABLE `site_content`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=189;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
