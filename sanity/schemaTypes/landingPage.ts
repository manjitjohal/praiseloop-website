import { defineField, defineType } from "sanity";

export const landingPage = defineType({
  name: "landingPage",
  title: "Landing Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      readOnly: true,
      initialValue: "Landing Page",
    }),
    defineField({
      name: "hero",
      title: "Hero Section",
      type: "object",
      fields: [
        defineField({ name: "badge", title: "Badge Text", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "subheading", title: "Subheading", type: "text" }),
        defineField({ name: "primaryCta", title: "Primary CTA Text", type: "string" }),
        defineField({ name: "secondaryCta", title: "Secondary CTA Text", type: "string" }),
        defineField({
          name: "stats",
          title: "Stats",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "value", title: "Value", type: "string" }),
                defineField({ name: "label", title: "Label", type: "string" }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text" }),
            defineField({ name: "icon", title: "Icon Name (Lucide)", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "howItWorks",
      title: "How It Works Steps",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "step", title: "Step Number", type: "number" }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text" }),
          ],
        },
      ],
    }),
    defineField({
      name: "pricing",
      title: "Pricing Section",
      type: "object",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "subheading", title: "Subheading", type: "text" }),
        defineField({
          name: "plans",
          title: "Plans",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "name", title: "Plan Name", type: "string" }),
                defineField({ name: "price", title: "Price", type: "string" }),
                defineField({ name: "period", title: "Period", type: "string" }),
                defineField({ name: "description", title: "Description", type: "text" }),
                defineField({ name: "features", title: "Features", type: "array", of: [{ type: "string" }] }),
                defineField({ name: "cta", title: "CTA Text", type: "string" }),
                defineField({ name: "highlighted", title: "Highlighted?", type: "boolean" }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "faq",
      title: "FAQ",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "question", title: "Question", type: "string" }),
            defineField({ name: "answer", title: "Answer", type: "text" }),
          ],
        },
      ],
    }),
    defineField({
      name: "cta",
      title: "CTA Section",
      type: "object",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "subheading", title: "Subheading", type: "text" }),
        defineField({ name: "buttonText", title: "Button Text", type: "string" }),
      ],
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
