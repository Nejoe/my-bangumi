export interface dayType {
  weekday: {
    cn: string;
    en: string;
    jp: string;
    id: number;
  };
  items: bangumi[];
}
export interface imageType {
  large: string;
  common: string;
  medium: string;
  small: string;
  grid: string;
}
export interface collectionType {
  collect: number;
  doing: number;
  dropped: number;
  on_hold: number;
  wish: number;
}
export interface bangumi {
  air_date: string;
  air_weekday: number;
  collection?: collectionType;
  eps?: number;
  eps_count?: number;
  id: number;
  images: imageType;
  name: string;
  name_cn: string;
  rank?: number;
  rating?: rateType;
  summary: string;
  type: 1 | 2 | 3 | 4 | 6;
  url: string;
}
export interface subject {
  date: string;
  platform: string;
  images: imageType;
  summary: string;
  name: string;
  name_cn: string;
  tags: tag[];
  infobox: info[];
  rating: rateType;
  total_episodes: number;
  collection: collectionType;
  id: number;
  eps: number;
  volumes: number;
  locked: boolean;
  nsfw: boolean;
  type: 1 | 2 | 3 | 4 | 6;
}
export interface tag {
  name: string;
  count: number;
}
export interface info {
  key: string;
  value: string;
}
export enum subjectType {
  all = 0,
  book = 1,
  anime = 2,
  music = 3,
  game = 4,
  null = 5,
  real = 6,
}
export enum subjectIcon {
  all = "mdi-all-inclusive",
  book = "mdi-book-outline",
  anime = "mdi-movie-open-outline",
  music = "mdi-music",
  game = "mdi-controller",
  null = "mdi-alert-circle-outline",
  real = "mdi-television-classic",
}

export interface rateType {
  total: number;
  count: {
    "1": number;
    "2": number;
    "3": number;
    "4": number;
    "5": number;
    "6": number;
    "7": number;
    "8": number;
    "9": number;
    "10": number;
  };
  score: number;
  // 处理半分而加的分数类型
  halfScore?: number;
}
