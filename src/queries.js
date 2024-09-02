// src/queries.js
import { gql } from '@apollo/client';

export const GET_ANIME_DATA = gql`
  query GetAnimeData($page: Int, $perPage: Int) {
    trending: Page(page: $page, perPage: $perPage) {
      media(sort: TRENDING_DESC, type: ANIME) {
        id
        title {
          romaji
        }
        coverImage {
          large
        }
        description
        averageScore
        episodes
         genres
         status
      }
    }
    popular: Page(page: $page, perPage: $perPage) {
      media(sort: POPULARITY_DESC, type: ANIME) {
        id
        title {
          romaji
        }
        coverImage {
          large
        }
        description
        averageScore
        episodes
         genres
         status
      }
    }
  }
`;
