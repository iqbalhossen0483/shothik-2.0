export const initFacebookPixel = (pixelId) => {
  try {
    if (!pixelId) return;

    window.fbq =
      window.fbq ||
      function () {
        window.fbq.callMethod
          ? window.fbq.callMethod.apply(window.fbq, arguments)
          : window.fbq.queue.push(arguments);
      };

    if (!window.fbq.version) {
      window.fbq.version = "2.0";
      window.fbq.queue = [];
      window.fbq.loaded = true;
    }

    window.fbq("init", pixelId);
    window.fbq("track", "PageView");
  } catch (error) {
    console.error("Error in initFacebookPixel:", error);
  }
};

export const facebookEvent = (action, category, label, value) => {
  try {
    if (typeof window.fbq !== "undefined") {
      window.fbq("trackCustom", action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    } else {
      console.warn("Facebook Pixel not initialized. Unable to track event.");
    }
  } catch (error) {
    console.error("Error in facebookEvent:", error);
  }
};
