import { facebookEvent } from "./fbconfig";
import { googleEvent } from "./googleConfiq";

export const trackEvent = (action, category, label, value) => {
  console.log("trackEvent", action, category, label, value);
  facebookEvent(action, category, label, value);
  googleEvent(action, category, label, value);
};
