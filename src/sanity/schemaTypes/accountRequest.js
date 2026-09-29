import { defineField, defineType } from "sanity";

export const accountRequest = defineType({
  name: "accountRequest",
  title: "Account Request",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "passwordHash",
      title: "Password Hash",
      type: "string",
      hidden: true,
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Approved", value: "approved" },
          { title: "Rejected", value: "rejected" },
        ],
        layout: "radio",
      },
      initialValue: "pending",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "notionLink",
      title: "Notion Link",
      type: "url",
      hidden: ({ document }) => document?.status !== "approved",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.status === "approved" && !value) {
            return "Notion link is required when status is approved";
          }
          return true;
        }),
    }),
    defineField({
      name: "emailSent",
      title: "Email Sent",
      type: "boolean",
      description:
        "Set automatically after the approval email is sent. You do not need to turn this on manually.",
      initialValue: false,
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "email",
      status: "status",
    },
    prepare({ title, subtitle, status }) {
      return {
        title: title || "Untitled",
        subtitle: `${subtitle || ""}${status ? ` · ${status}` : ""}`,
      };
    },
  },
});
