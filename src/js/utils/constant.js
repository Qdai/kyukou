/* global SITE_URL, APP_VERSION */

const abouts = [
  '休講',
  '補講',
  '連絡',
  '教室変更',
  'その他'
];

const departments = [
  '教育学部',
  '文学部',
  '法学部',
  '理学部'
];

const departmentsEnShort = [
  'edu',
  'lit',
  'law',
  'sci'
];

const eventKeys = [
  'hash',
  'about',
  'link',
  'eventDate',
  'pubDate',
  'period',
  'department',
  'subject',
  'teacher',
  'campus',
  'room',
  'note',
  'raw',
  'tweet.new',
  'tweet.tomorrow'
];

const logNames = [
  'task',
  'twit_new',
  'twit_tomorrow',
  'delete'
];

const siteUrl = SITE_URL;

const version = APP_VERSION;

export {
  abouts,
  departments,
  departmentsEnShort,
  eventKeys,
  logNames,
  siteUrl,
  version
};
