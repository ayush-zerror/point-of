import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

export const structure = (S, context) =>
  S.list()
    .title('Dashboard')
    .items([
      orderableDocumentListDeskItem({
        type: "caseStudy",
        title: "Case Studies",
        S,
        context,
      }),
      S.listItem()
        .title("Account Requests")
        .schemaType("accountRequest")
        .child(
          S.documentTypeList("accountRequest").title("Account Requests")
        ),
    ])
