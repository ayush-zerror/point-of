import { defineField, defineType } from "sanity";
import ApprovalEmailInfo from "../components/ApprovalEmailInfo";

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
      name: "approvalEmailInfo",
      title: "Approval email",
      type: "string",
      readOnly: true,
      components: { input: ApprovalEmailInfo },
    }),
    defineField({
      name: "emailSent",
      title: "Email Sent",
      type: "boolean",
      hidden: true,
      initialValue: false,
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "email",
      status: "status",
      emailSent: "emailSent",
    },
    prepare({ title, subtitle, status, emailSent }) {
      const bits = [subtitle, status];
      if (status === "approved") {
        bits.push(emailSent ? "email sent" : "email pending");
      }
      return {
        title: title || "Untitled",
        subtitle: bits.filter(Boolean).join(" · "),
      };
    },
  },
});
