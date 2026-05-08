import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Landing Page")
        .child(
          S.document()
            .schemaType("landingPage")
            .documentId("landingPage")
            .title("Landing Page")
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !["landingPage"].includes(listItem.getId()!)
      ),
    ]);
