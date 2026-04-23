import { defineField, defineType } from "sanity";

const required = (Rule, label = "This field") => Rule.required().error(`${label} is required`);

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => required(Rule, "Slug"),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => required(Rule, "Title"),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: (Rule) => required(Rule, "Location"),
    }),
    defineField({
      name: "gist",
      title: "Gist",
      type: "string",
      validation: (Rule) => required(Rule, "Gist"),
    }),

    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) =>
        required(Rule, "Services")
          .min(1)
          .error("Services is required (add at least 1)"),
    }),
    defineField({
      name: "filtersServices",
      title: "Filters - Services",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) =>
        required(Rule, "Filters - Services")
          .min(1)
          .error("Filters - Services is required (add at least 1)"),
    }),
    defineField({
      name: "filtersIndustry",
      title: "Filters - Industry",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) =>
        required(Rule, "Filters - Industry")
          .min(1)
          .error("Filters - Industry is required (add at least 1)"),
    }),
    defineField({
      name: "filtersYear",
      title: "Filters - Year",
      type: "string",
      validation: (Rule) => required(Rule, "Filters - Year"),
    }),

    defineField({
      name: "about",
      title: "About",
      type: "text",
      rows: 5,
      validation: (Rule) => required(Rule, "About"),
    }),

    defineField({
      name: "challenge",
      title: "Challenge",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          validation: (Rule) => required(Rule, "Challenge title"),
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 4,
          validation: (Rule) => required(Rule, "Challenge description"),
        }),
      ],
      validation: (Rule) => required(Rule, "Challenge"),
    }),

    defineField({
      name: "creativeConcept",
      title: "Creative concept",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          validation: (Rule) => required(Rule, "Creative concept title"),
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 4,
          validation: (Rule) => required(Rule, "Creative concept description"),
        }),
      ],
      validation: (Rule) => required(Rule, "Creative concept"),
    }),

    defineField({
      name: "behanceLink",
      title: "Behance link",
      type: "url",
      validation: (Rule) => required(Rule, "Behance link").uri({ scheme: ["http", "https"] }),
    }),

    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => required(Rule, "Cover image"),
    }),

    defineField({
      name: "fullViewAssets",
      title: "Full view assets",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
      validation: (Rule) =>
        required(Rule, "Full view assets")
          .min(4)
          .max(6)
          .error("Upload min 4 and max 6 images"),
    }),

    defineField({
      name: "overviewAssets",
      title: "Overview assets",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
      validation: (Rule) =>
        required(Rule, "Overview assets")
          .min(4)
          .max(6)
          .error("Upload min 4 and max 6 images"),
    }),

    defineField({
      name: "microanimation",
      title: "Micro video (MP4, max 2MB)",
      type: "file",
      options: { accept: "video/mp4" },
      validation: (Rule) =>
        required(Rule, "Micro video").custom((value) => {
          const size = value?.asset?._ref ? value?.asset?.size : value?.asset?.size;
          // size may not be available until asset is persisted; skip hard-fail when missing.
          if (!value?.asset) return "Micro video is required";
          const bytes = value.asset?.size;
          if (typeof bytes !== "number") return true;
          return bytes <= 2 * 1024 * 1024 || "Video must be <= 2MB";
        }),
    }),

    defineField({
      name: "meta",
      title: "Meta",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Meta title",
          type: "string",
          validation: (Rule) => required(Rule, "Meta title"),
        }),
        defineField({
          name: "description",
          title: "Meta description",
          type: "string",
          validation: (Rule) => required(Rule, "Meta description"),
        }),
        defineField({
          name: "keywords",
          title: "Meta keywords",
          type: "array",
          of: [{ type: "string" }],
          validation: (Rule) =>
            required(Rule, "Meta keywords")
              .min(1)
              .error("Meta keywords is required (add at least 1)"),
        }),
      ],
      validation: (Rule) => required(Rule, "Meta"),
    }),
  ],
});

