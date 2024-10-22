// import { Product } from "@/src/types";
import axios from "axios";
import qs from "qs";

const strapiUrl = process.env.EXPO_PUBLIC_API_URL as string;
const strapiAPIKey = process.env.EXPO_PUBLIC_API_KEY as string;

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface BlogItem {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: any;
  cover: Cover;
  author: Author;
  category: any;
  blocks: any[];
  localizations: any[];
}

export interface Cover {
  id: number;
  documentId: string;
  name: string;
  alternativeText: any;
  caption: any;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: any;
  provider: string;
  provider_metadata: ProviderMetadata3;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: any;
}

export interface Formats {
  small: Small;
  thumbnail: Thumbnail;
}

export interface Small {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: any;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
  provider_metadata: ProviderMetadata;
}

export interface ProviderMetadata {
  public_id: string;
  resource_type: string;
}

export interface Thumbnail {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: any;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
  provider_metadata: ProviderMetadata2;
}

export interface ProviderMetadata2 {
  public_id: string;
  resource_type: string;
}

export interface ProviderMetadata3 {
  public_id: string;
  resource_type: string;
}

export interface Author {
  id: number;
  documentId: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: any;
}

export function useBlogPostList() {
  return useQuery<BlogItem[]>({
    queryKey: ["blogs"],

    queryFn: async () => {
      // const query = qs.stringify(
      //   {
      //     populate: {
      //       cover: {
      //         populate: true
      //       },
      //       category: {
      //         populate: true
      //       },
      //       blocks: {
      //         populate: true
      //       },
      //       author: {
      //         populate: true
      //       }
      //     }
      //   },
      //   {
      //     encodeValuesOnly: true // prettify URL
      //   }
      // );

      // const url = `${strapiUrl}/articles?${query}`;
      // console.log(url);
      const response = await axios.get(`${strapiUrl}/articles?populate=*`, {
        headers: {
          Authorization: `Bearer ${strapiAPIKey}`
        }
      });

      // if (error) {
      //   throw new Error(error.message);
      // }
      // make sure to return response.data not response..
      return response.data.data;
    }
  });
}

export function useGetBlogBySlug(slug: string) {
  return useQuery({
    queryKey: ["blogs", slug],

    queryFn: async () => {
      const response = await axios.get(`${strapiUrl}/articles?filters[slug][$eq]=${slug}&populate=*`, {
        headers: {
          Authorization: `Bearer ${strapiAPIKey}`
        }
      });

      // console.log(response.data);
      // if (error) {
      //   throw new Error(error.message);
      // }
      // this does return an array
      return response.data.data[0];
    }
  });
}

export function useGetBlogByDocumentId(documentId: string) {
  return useQuery({
    queryKey: ["blogs", documentId],

    queryFn: async () => {
      // I could override type it returns with .returns() function if I need to
      // const { data, error } = await supabase.from("products").select("*").returns<Product[]>();
      const response = await axios.get(`${strapiUrl}/articles/${documentId}`, {
        headers: {
          Authorization: `Bearer ${strapiAPIKey}`
        }
      });

      console.log(response.data);
      // if (error) {
      //   throw new Error(error.message);
      // }
      return response.data;
    }
  });
}
