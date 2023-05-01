import { FETCH_FEED } from "./types";
import { upworkRSS } from "../rss/upwork";

export const fetchUpworkRSSFeed =  () => async dispatch => {
    const feed = await upworkRSS;
    dispatch ({
        type: FETCH_FEED,
        payload: feed
    })
}


