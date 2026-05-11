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
    ])
