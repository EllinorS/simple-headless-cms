// Groups of content keys for each page, used by the admin content editor to render
// the right form sections. Each key corresponds to a row in the site_content DB table
// (keyed by the `key` column), following the convention: page_section_field.
// The PAGE_BLOCKS map at the bottom ties a page slug to its block group.

export const GLOBAL_BLOCKS = [
  {
    title: 'Footer',
    keys: ['global_footer_image', 'global_instagram_url', 'global_facebook_url'],
  },
  {
    title: 'Default Session Prices (NZD / person)',
    keys: [
      'global_price_group_adults',
      'global_price_group_kids',
      'global_price_private',
      'global_price_coaching',
    ],
  },
  {
    title: 'Package Prices (NZD total)',
    keys: ['global_price_pack_3', 'global_price_pack_5'],
  },
];

export const HOME_BLOCKS = [
  {
    title: 'Hero',
    keys: [
      'home_hero_title',
      'home_hero_cta_lesson',
      'home_hero_cta_trip',
      'home_hero_image',
      'home_hero_image_alt',
    ],
  },
  {
    title: 'About Coach',
    keys: ['home_coach_title', 'home_coach_bio', 'home_coach_image'],
  },
  {
    title: 'Simple Image',
    keys: ['home_simple_image'],
  },
  {
    title: 'Unique Selling Points',
    keys: [
      'home_usp_main_title',
      'home_usp_1_title',
      'home_usp_1_desc',
      'home_usp_2_title',
      'home_usp_2_desc',
      'home_usp_3_title',
      'home_usp_3_desc',
      'home_usp_4_title',
      'home_usp_4_desc',
    ],
  },
  {
    title: 'Group Lessons',
    keys: [
      'home_lesson_group_title',
      'home_lesson_group_desc',
      'home_lesson_group_b1',
      'home_lesson_group_b2',
      'home_lesson_group_b3',
      'home_lesson_group_image',
    ],
  },
  {
    title: 'Private Lessons',
    keys: [
      'home_lesson_private_title',
      'home_lesson_private_desc',
      'home_lesson_private_b1',
      'home_lesson_private_b2',
      'home_lesson_private_b3',
      'home_lesson_private_image',
    ],
  },
  {
    title: 'Coaching',
    keys: [
      'home_lesson_coaching_title',
      'home_lesson_coaching_desc',
      'home_lesson_coaching_b1',
      'home_lesson_coaching_b2',
      'home_lesson_coaching_b3',
      'home_lesson_coaching_image',
    ],
  },
  {
    title: 'Reviews',
    keys: [
      'home_review_1_name',
      'home_review_1_quote',
      'home_review_2_name',
      'home_review_2_quote',
      'home_review_3_name',
      'home_review_3_quote',
    ],
  },
  {
    title: 'Footer CTA',
    keys: ['home_footer_cta_title', 'home_footer_cta_desc'],
  },
];

export const ABOUT_BLOCKS = [
  {
    title: 'Hero',
    keys: ['about_hero_title', 'about_hero_subtitle', 'about_hero_image', 'about_hero_image_alt'],
  },
  {
    title: 'Meet the Coach',
    keys: [
      'about_coach_title',
      'about_coach_subtitle',
      'about_coach_content',
      'about_coach_image',
      'about_coach_button_text',
      'about_coach_button_url',
    ],
  },
  {
    title: 'Values',
    keys: [
      'about_values_title',
      'about_values_subtitle',
      'about_value_1_title',
      'about_value_1_desc',
      'about_value_2_title',
      'about_value_2_desc',
      'about_value_3_title',
      'about_value_3_desc',
      'about_value_4_title',
      'about_value_4_desc',
    ],
  },
  {
    title: 'Mission',
    keys: [
      'about_mission_title',
      'about_mission_p1',
      'about_mission_p2',
      'about_mission_p3',
      'about_mission_image',
    ],
  },
  {
    title: 'CTA',
    keys: ['about_cta_title', 'about_cta_subtitle'],
  },
];

export const SURF_IN_NZ_BLOCKS = [
  {
    title: 'Hero',
    keys: ['snz_hero_title', 'snz_hero_subtitle', 'snz_hero_image', 'snz_hero_image_alt'],
  },
  {
    title: 'Surf Lessons',
    keys: [
      'snz_lessons_eyebrow',
      'snz_lessons_title',
      'snz_lessons_desc',
      'snz_lessons_b1',
      'snz_lessons_b2',
      'snz_lessons_b3',
      'snz_lessons_b4',
    ],
  },
  {
    title: 'Surf Packages',
    keys: [
      'snz_packages_eyebrow',
      'snz_packages_title',
      'snz_packages_desc',
      'snz_packages_b1',
      'snz_packages_b2',
      'snz_packages_b3',
    ],
  },
  {
    title: 'Custom Surf Trips',
    keys: [
      'snz_trips_eyebrow',
      'snz_trips_title',
      'snz_trips_desc',
      'snz_trips_b1',
      'snz_trips_b2',
      'snz_trips_b3',
    ],
  },
];

export const BOOK_SURF_LESSON_BLOCKS = [
  {
    title: 'Hero',
    keys: ['book_hero_title', 'book_hero_subtitle', 'book_hero_image', 'book_hero_image_alt'],
  },
  {
    title: 'Schedule',
    keys: ['book_schedule_title', 'book_schedule_empty'],
  },
  {
    title: 'Contact Section',
    keys: ['book_contact_title', 'book_contact_desc'],
  },
];

export const FAQ_BLOCKS = [
  {
    title: 'Before your lesson',
    keys: [
      'faq_cat1_title',
      'faq_cat1_item1_q',
      'faq_cat1_item1_a',
      'faq_cat1_item2_q',
      'faq_cat1_item2_a',
      'faq_cat1_item3_q',
      'faq_cat1_item3_a',
      'faq_cat1_item4_q',
      'faq_cat1_item4_a',
      'faq_cat1_item5_q',
      'faq_cat1_item5_a',
    ],
  },
  {
    title: 'The lessons',
    keys: [
      'faq_cat2_title',
      'faq_cat2_item1_q',
      'faq_cat2_item1_a',
      'faq_cat2_item2_q',
      'faq_cat2_item2_a',
      'faq_cat2_item3_q',
      'faq_cat2_item3_a',
      'faq_cat2_item4_q',
      'faq_cat2_item4_a',
      'faq_cat2_item5_q',
      'faq_cat2_item5_a',
    ],
  },
  {
    title: 'Packages & booking',
    keys: [
      'faq_cat3_title',
      'faq_cat3_item1_q',
      'faq_cat3_item1_a',
      'faq_cat3_item2_q',
      'faq_cat3_item2_a',
      'faq_cat3_item3_q',
      'faq_cat3_item3_a',
      'faq_cat3_item4_q',
      'faq_cat3_item4_a',
    ],
  },
  {
    title: 'Cancellation & payment',
    keys: [
      'faq_cat4_title',
      'faq_cat4_item1_q',
      'faq_cat4_item1_a',
      'faq_cat4_item2_q',
      'faq_cat4_item2_a',
      'faq_cat4_item3_q',
      'faq_cat4_item3_a',
    ],
  },
];

export const SURF_TRIP_BLOCKS = [
  {
    title: 'Hero',
    keys: [
      'surf_trip_hero_title',
      'surf_trip_hero_subtitle',
      'surf_trip_hero_image',
      'surf_trip_hero_image_alt',
    ],
  },
  {
    title: 'Region 1 — Raglan',
    keys: [
      'spots_card_1_name',
      'spots_card_1_region',
      'spots_card_1_type',
      'spots_card_1_level',
      'spots_card_1_desc',
      'spots_card_1_image',
    ],
  },
  {
    title: 'Region 2 — Northland',
    keys: [
      'spots_card_2_name',
      'spots_card_2_region',
      'spots_card_2_type',
      'spots_card_2_level',
      'spots_card_2_desc',
      'spots_card_2_image',
    ],
  },
  {
    title: 'Region 3 — Gisborne',
    keys: [
      'spots_card_3_name',
      'spots_card_3_region',
      'spots_card_3_type',
      'spots_card_3_level',
      'spots_card_3_desc',
      'spots_card_3_image',
    ],
  },
  {
    title: 'Region 4 — The Catlins',
    keys: [
      'spots_card_4_name',
      'spots_card_4_region',
      'spots_card_4_type',
      'spots_card_4_level',
      'spots_card_4_desc',
      'spots_card_4_image',
    ],
  },
];

type ContentBlockGroup = { title: string; keys: string[] }[];

export const PAGE_BLOCKS: Record<string, ContentBlockGroup> = {
  global: GLOBAL_BLOCKS,
  home: HOME_BLOCKS,
  about: ABOUT_BLOCKS,
  'book-surf-lesson': BOOK_SURF_LESSON_BLOCKS,
  'surf-in-new-zealand': SURF_IN_NZ_BLOCKS,
  faq: FAQ_BLOCKS,
  'surf-trip': SURF_TRIP_BLOCKS,
};
