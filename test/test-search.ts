import AggregationBuilder from "../lib/index.js";
const agg = new AggregationBuilder();

agg
  .searchCompound({ index: "default", minimumShouldMatch: 1 })
  .searchMust(agg.searchEquals({ path: "company_namespace", value: "demosv" }))
  .searchShould(
    agg.searchAutocomplete({
      query: "q",
      path: "external_serial_number",
      tokenOrder: "sequential",
      fuzzy: { maxEdits: 1, prefixLength: 0 },
    })
  )
  .searchShould(
    agg.searchAutocomplete({
      query: "q",
      path: "return_serial_number.formatted",
    })
  )
  .show();

agg.search({
  index: "default",
  compound: {
    must: [
      {
        equals: {
          path: "company_namespace",
          value: "demosv",
        },
      },
    ],
    should: [
      {
        autocomplete: {
          query: "q",
          path: "external_serial_number",
          tokenOrder: "sequential",
          // fuzzy: { maxEdits: 1, prefixLength: 0 } // optional
        },
      },
      {
        autocomplete: {
          query: "q",
          path: "return_serial_number.formatted",
          tokenOrder: "sequential",
          fuzzy: { maxEdits: 1, prefixLength: 0 }, // optional
        },
      },
      {
        autocomplete: {
          query: "q",
          path: "serial_number.formatted",
          tokenOrder: "sequential",
          // fuzzy: { maxEdits: 1, prefixLength: 0 } // optional
        },
      },
    ],
    minimumShouldMatch: 1,
  },
});
