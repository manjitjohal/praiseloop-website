import { defineField, defineType } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "taxonomy", title: "Content Strategy" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt / Standfirst",
      type: "text",
      rows: 3,
      group: "content",
      description: "One or two sentences shown on cards and under the title.",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      group: "content",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      group: "content",
      options: { hotspot: true },
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      group: "content",
    }),

    /* ── Content strategy (maps to the SEO content list) ── */
    defineField({
      name: "contentType",
      title: "Content Type",
      type: "string",
      group: "taxonomy",
      description: "The role this page plays in the SEO architecture.",
      options: {
        list: [
          { title: "Pillar", value: "pillar" },
          { title: "Cluster", value: "cluster" },
          { title: "Comparison", value: "comparison" },
          { title: "Glossary / Definition", value: "glossary" },
          { title: "Feeder", value: "feeder" },
          { title: "Localization POV", value: "pov" },
          { title: "AEO Page", value: "aeo" },
        ],
      },
    }),
    defineField({
      name: "territory",
      title: "Territory",
      type: "string",
      group: "taxonomy",
      description: "Topic territory. Drives the category label shown to readers.",
      options: {
        list: [
          { title: "T1 — Performance & Retention", value: "t1" },
          { title: "T2 — Category & Comparison", value: "t2" },
          { title: "T3 — Localization", value: "t3" },
          { title: "Feeder / On-ramp", value: "feeder" },
        ],
      },
    }),
    defineField({
      name: "pillar",
      title: "Links up to (Pillar)",
      type: "reference",
      group: "taxonomy",
      to: [{ type: "blogPost" }],
      options: { filter: 'contentType == "pillar"' },
      description:
        "For clusters, comparisons and feeders: the pillar this page supports. Powers the on-page series links.",
      hidden: ({ parent }) => parent?.contentType === "pillar",
    }),
    defineField({
      name: "contentId",
      title: "Content ID",
      type: "string",
      group: "taxonomy",
      description: 'Optional. Maps to the content list, e.g. "P1", "C2", "CMP1".',
    }),
    defineField({
      name: "targetKeyword",
      title: "Target Keyword / Cluster",
      type: "string",
      group: "taxonomy",
    }),
    defineField({
      name: "searchIntent",
      title: "Search Intent",
      type: "string",
      group: "taxonomy",
    }),
    defineField({
      name: "wave",
      title: "Priority Wave",
      type: "string",
      group: "taxonomy",
      options: {
        list: [
          { title: "Wave 1", value: "wave-1" },
          { title: "Wave 2", value: "wave-2" },
          { title: "Wave 3", value: "wave-3" },
          { title: "Wave 4", value: "wave-4" },
          { title: "Wave 5", value: "wave-5" },
        ],
      },
    }),

    /* ── SEO ── */
    defineField({ name: "seoTitle", title: "SEO Title", type: "string", group: "seo" }),
    defineField({ name: "seoDescription", title: "SEO Description", type: "text", rows: 2, group: "seo" }),
  ],
  orderings: [
    {
      title: "Published Date, New",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      contentType: "contentType",
      territory: "territory",
      contentId: "contentId",
      media: "featuredImage",
    },
    prepare({ title, contentType, territory, contentId, media }) {
      const bits = [contentId, contentType, territory].filter(Boolean);
      return {
        title,
        subtitle: bits.join(" · ") || "Unclassified",
        media,
      };
    },
  },
});
