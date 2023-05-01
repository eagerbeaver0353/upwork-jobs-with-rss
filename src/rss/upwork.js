import XMLParser from "rss-parser";

let ParseXML = new XMLParser();
const MY_CORS_PROXY = "https://stormy-reef-80719.herokuapp.com/";
const REY_UPWORK_FEED = "https://www.upwork.com/ab/feed/topics/rss?securityToken=123d50f1f70d8c0eadc8a979e4d040edb78d0cb725790b7db03efad1d69a552926c06b2f642b293c5177aa4e7760863b24609b51710bfacdfb3d16df085829fc&userUid=763550953807126528&orgUid=1328438630798860289&sort=local_jobs_on_top";

export const upworkRSS = ParseXML.parseURL(MY_CORS_PROXY + REY_UPWORK_FEED);







