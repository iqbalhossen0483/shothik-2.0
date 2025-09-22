import { useEffect, useState } from "react";

const useYoutubeSubscriber = () => {
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleSubscribe = () => {
    const channelUrl = `https://www.youtube.com/channel/${process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID}`;
    window.open(channelUrl, "_blank", "noopener,noreferrer");
  };

  const getSubscriberCount = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/channels?part=statistics&id=${process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw { message: "Failed to fetch subscriber count" };
      }

      const data = await response.json();
      if (data.items && data.items[0]) {
        const count = parseInt(data.items[0].statistics.subscriberCount, 10);
        setSubscriberCount(count || 0);
      }
    } catch (error) {
      console.error("Error fetching subscriber count:", error);
      setSubscriberCount(0);
    } finally {
      setLoading(false);
    }
  };

  const formatSubscriberCount = (count) => {
    if (!count) return "0";

    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  useEffect(() => {
    getSubscriberCount();
    const interval = setInterval(getSubscriberCount, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  return {
    subscriberCount,
    loading,
    handleSubscribe,
    formatSubscriberCount,
  };
};

export default useYoutubeSubscriber;
