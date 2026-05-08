import { defineQuery } from "next-sanity";

export const LANDING_PAGE_QUERY = defineQuery(
  `*[_type == "landingPage"][0]{
    title,
    hero {
      badge,
      heading,
      subheading,
      primaryCta,
      secondaryCta,
      stats[] { value, label }
    },
    features[] {
      title,
      description,
      icon
    },
    howItWorks[] {
      step,
      title,
      description
    },
    pricing {
      heading,
      subheading,
      plans[] {
        name,
        price,
        period,
        description,
        features[],
        cta,
        highlighted
      }
    },
    faq[] {
      question,
      answer
    },
    cta {
      heading,
      subheading,
      buttonText
    }
  }`
);

export const BLOG_POSTS_QUERY = defineQuery(
  `*[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    featuredImage,
    category
  }`
);

export const BLOG_POST_BY_SLUG_QUERY = defineQuery(
  `*[_type == "blogPost" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    excerpt,
    body,
    publishedAt,
    featuredImage,
    category,
    seoTitle,
    seoDescription
  }`
);
