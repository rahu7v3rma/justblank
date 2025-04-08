// @ts-nocheck
import { GoogleAdsApi, enums, services } from "google-ads-api";
import fs from "fs";
import GeotargetModel from "../models/geotarget";

const client = new GoogleAdsApi({
  client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
  client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
  developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
});

const customer = client.Customer({
  customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID!,
  login_customer_id: process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID!,
  refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
});

export const getKeywordIdeas = async (
  keyword: string,
  criteriaId: string,
  pageSize: number = 10
) => {
  const locationIds = [criteriaId];
  const languageId = "1000";

  const keywordSeed = new services.KeywordSeed({ keywords: [keyword] });

  const generateKeywordIdeaResponse =
    await customer.keywordPlanIdeas.generateKeywordIdeas({
      customer_id: customer.credentials.customer_id,
      page_size: pageSize,
      keyword_seed: keywordSeed,
      geo_target_constants: locationIds.map((id) => `geoTargetConstants/${id}`),
      language: `languageConstants/${languageId}`,
      include_adult_keywords: false,
    });

  // {
  //   [1]     close_variants: [],
  //   [1]     keyword_idea_metrics: {
  //   [1]       monthly_search_volumes: [Array],
  //   [1]       competition: 'LOW',
  //   [1]       avg_monthly_searches: '110',
  //   [1]       _avg_monthly_searches: 'avg_monthly_searches',
  //   [1]       competition_index: '0',
  //   [1]       _competition_index: 'competition_index'
  //   [1]     },
  //   [1]     keyword_annotations: { concepts: [] },
  //   [1]     text: 'test my internet speed',
  //   [1]     _text: 'text'
  //   [1]   }

  return generateKeywordIdeaResponse.map((idea) => ({
    keyword: idea.text,
    avgMonthlySearches: idea.keyword_idea_metrics.avg_monthly_searches,
    competition: idea.keyword_idea_metrics.competition,
  }));
};

// export const insertGeotarget = async () => {
//   // await GeotargetModel.deleteMany({});

//   const geoTargetFile = fs.readFileSync(
//     process.cwd() + "/assets/geotargets.csv",
//     "utf8"
//   );

//   const geoTargetLines = geoTargetFile.split("\n");

//   const geoTargetCountries = [];

//   for (const line of geoTargetLines) {
//     let [countryCode, targetType, criteriaId, name, ...canonicalName] =
//       line.split(",");
//     const cleanText = (text: string) =>
//       text.replace("\n", "").replace("\r", "");
//     countryCode = cleanText(countryCode);
//     criteriaId = cleanText(criteriaId);
//     name = cleanText(name);
//     canonicalName = cleanText(canonicalName.join(","));
//     targetType = cleanText(targetType);
//     if (targetType == "Country") {
//       geoTargetCountries.push({
//         countryCode,
//         targetType,
//         criteriaId,
//         name,
//         canonicalName,
//       });
//     }
//   }

//   // await GeotargetModel.insertMany(geoTargetCountries);

//   // console.log("Geotargets inserted", await GeotargetModel.countDocuments());
// };
