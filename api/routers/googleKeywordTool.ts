import { Router } from "express";
import GeotargetModel from "../models/geotarget";
import { getKeywordIdeas } from "../utils/googleAds";
import { GenerateKeywordsRequestSchema } from "../utils/schema";

const GKTRouter = Router();

GKTRouter.get("/creteria-id-list", async (req, res) => {
  const criteriaIdList = await GeotargetModel.find({}).select(
    "criteriaId canonicalName"
  );
  res.status(200).json({
    success: true,
    message: "Criteria ID list fetched successfully",
    data: criteriaIdList,
  });
});

GKTRouter.post("/generate-keywords", async (req, res) => {
  const parsedRequest = GenerateKeywordsRequestSchema.safeParse(req.body);
  if (!parsedRequest.success) {
    const fieldErrors = parsedRequest.error.flatten().fieldErrors;
    const firstErrorMessage = Object.values(fieldErrors)[0][0];
    res.status(400).json({
      success: false,
      message: firstErrorMessage,
      data: fieldErrors,
    });
    return;
  }
  const keywordIdeas = await getKeywordIdeas(
    parsedRequest.data.keyword,
    parsedRequest.data.countryCriteriaId
  );
  res.status(200).json({
    success: true,
    message: "Keywords generated successfully",
    data: keywordIdeas,
  });
});

export default GKTRouter;
