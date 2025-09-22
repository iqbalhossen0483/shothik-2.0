import { useSelector } from "react-redux";

const useWordLimit = (service) => {
  const { user, userLimit } = useSelector((state) => state.auth);

  const freePack = user?.package === "free" || !user?.email;
  const starterPack = user?.package === "starter";
  const premiumPack = user?.package === "premium";

  const defaultLimit = freePack
    ? 180
    : starterPack
    ? 500
    : premiumPack
    ? 1000
    : 180;

  const starter = userLimit?.find(
    (x) => x["type"] === (user?.package || "free")
  );
  const starterLimit = starter?.pricing_features?.find(
    (f) => f["type"] === service
  )?.word_limit;

  return {
    wordLimit: starterLimit || defaultLimit,
  };
};

export default useWordLimit;
