export interface KitsuAnimeResponse {
  data: KitsuAnimeItem[];
  meta?: {
    count?: number;
  };
  links?: {
    first?: string;
    next?: string;
    last?: string;
  };
}

export interface KitsuAnimeItem {
  id: string;
  type: string;
  attributes: KitsuAnimeAttributes;
}

export interface KitsuAnimeAttributes {
  canonicalTitle: string;
  synopsis?: string;
  averageRating?: string;
  startDate?: string;
  endDate?: string;
  subtype?: string;
  ageRatingGuide?: string;

  posterImage?: {
    tiny?: string;
    small?: string;
    medium?: string;
    large?: string;
    original?: string;
    [key: string]: unknown;
  };

  episodeCount?: number;
  episodeLength?: number;
  totalLength?: number;

  youtubeVideoId?: string;

  status?: string; // current, finished, etc.

  [key: string]: unknown;
}
