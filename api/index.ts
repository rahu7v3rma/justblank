import { expressConnect } from "./utils/express";
import { mongooseConnect } from "./utils/mongoose";
import { getKeywordIdeas } from "./utils/selenium";
// import { insertGeotarget } from "./utils/googleAds";
mongooseConnect();
expressConnect();

// insertGeotarget();
getKeywordIdeas("us", "test");