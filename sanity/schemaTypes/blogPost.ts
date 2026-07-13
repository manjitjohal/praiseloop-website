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
      name: "keyTakeaways",
      title: "Key Takeaways",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
      description: "3–5 short bullets shown in a summary box near the top of the article.",
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
        {
          type: "object",
          name: "statCallout",
          title: "Stat Callout",
          fields: [
            defineField({
              name: "stats",
              title: "Stats",
              type: "array",
              validation: (rule) => rule.min(1).max(4),
              of: [
                {
                  type: "object",
                  name: "stat",
                  fields: [
                    defineField({ name: "value", title: "Value", type: "string", validation: (r) => r.required() }),
                    defineField({ name: "label", title: "Label", type: "string" }),
                    defineField({ name: "source", title: "Source", type: "string" }),
                  ],
                  preview: { select: { title: "value", subtitle: "label" } },
                },
              ],
            }),
            defineField({
              name: "tone",
              title: "Tone",
              type: "string",
              initialValue: "orange",
              options: {
                list: [
                  { title: "Orange", value: "orange" },
                  { title: "Navy", value: "navy" },
                  { title: "Teal", value: "teal" },
                ],
              },
            }),
          ],
          preview: {
            select: { s0: "stats.0.value", s1: "stats.1.value", s2: "stats.2.value" },
            prepare({ s0, s1, s2 }) {
              return { title: "Stat callout", subtitle: [s0, s1, s2].filter(Boolean).join(" · ") };
            },
          },
        },
        {
          type: "object",
          name: "pullQuote",
          title: "Pull Quote",
          fields: [
            defineField({ name: "quote", title: "Quote", type: "text", rows: 3, validation: (r) => r.required() }),
            defineField({ name: "attribution", title: "Attribution", type: "string" }),
          ],
          preview: {
            select: { title: "quote", subtitle: "attribution" },
          },
        },
        {
          type: "object",
          name: "costStack",
          title: "Cost Stack",
          description: "Iceberg-style figure: small 'visible' costs above a waterline, larger 'hidden' costs below.",
          fields: [
            defineField({ name: "heading", title: "Heading", type: "string" }),
            defineField({ name: "visibleTitle", title: "Visible zone title", type: "string" }),
            defineField({ name: "visibleItems", title: "Visible costs", type: "array", of: [{ type: "string" }] }),
            defineField({ name: "hiddenTitle", title: "Hidden zone title", type: "string" }),
            defineField({ name: "hiddenItems", title: "Hidden costs", type: "array", of: [{ type: "string" }] }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
          preview: {
            select: { title: "heading", v: "visibleItems", h: "hiddenItems" },
            prepare({ title, v, h }) {
              return {
                title: title || "Cost stack",
                subtitle: `${(v || []).length} visible · ${(h || []).length} hidden`,
              };
            },
          },
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
