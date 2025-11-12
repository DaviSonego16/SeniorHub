export interface KitsuAnimeResponse {
  data: KitsuAnimeData[];
  meta?: Record<string, any>;
  links?: Record<string, string>;
}

export interface KitsuAnimeData {
  id: string;
  type: 'anime';
  links: {
    self: string;
  };
  attributes: {
    createdAt: string;
    updatedAt: string;
    slug: string;
    synopsis: string;
    description?: string;
    coverImageTopOffset?: number;
    titles: {
      en?: string;
      en_jp?: string;
      ja_jp?: string;
      [key: string]: string | undefined;
    };
    canonicalTitle: string;
    abbreviatedTitles?: string[];
    averageRating?: string;
    ratingFrequencies?: Record<string, string>;
    userCount?: number;
    favoritesCount?: number;
    startDate?: string;
    endDate?: string;
    nextRelease?: string | null;
    popularityRank?: number;
    ratingRank?: number;
    ageRating?: 'G' | 'PG' | 'R' | 'R18';
    ageRatingGuide?: string;
    subtype?: 'ONA' | 'OVA' | 'TV' | 'movie' | 'music' | 'special';
    status?: 'current' | 'finished' | 'tba' | 'unreleased' | 'upcoming';
    tba?: string | null;
    posterImage?: KitsuImage;
    coverImage?: KitsuImage;
    episodeCount?: number;
    episodeLength?: number;
    totalLength?: number;
    youtubeVideoId?: string;
    showType?: 'ONA' | 'OVA' | 'TV' | 'movie' | 'music' | 'special';
    nsfw?: boolean;
  };
  relationships: {
    [key: string]: {
      links: {
        self: string;
        related?: string;
      };
    };
  };
}

export interface KitsuImage {
  tiny: string;
  small?: string;
  medium?: string;
  large?: string;
  original: string;
  meta?: {
    dimensions: {
      [size: string]: {
        width: number;
        height: number;
      };
    };
  };
}
