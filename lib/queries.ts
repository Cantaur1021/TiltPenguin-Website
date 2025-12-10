// lib/queries.ts
import { groq } from "next-sanity";

export const allDevlogsQuery = groq`
  *[_type == "devlog" && status == "published"] 
    | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      project,
      publishedAt,
      coverImage
    }
`;

export const singleDevlogQuery = groq`
  *[_type == "devlog" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    project,
    publishedAt,
    coverImage,
    content
  }
`;