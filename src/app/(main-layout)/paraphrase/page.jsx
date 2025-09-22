import { Container } from "@mui/material";
import { paraphraseFaq } from "../../../_mock/tools/paraphrasefaq";
import HomeAdvertisement from "../../../components/common/HomeAdvertisement";
import ToolsCTA from "../../../components/tools/common/ToolsCTA";
import ToolsSepecigFaq from "../../../components/tools/common/ToolsSepecigFaq";
import ParaphraseContend from "../../../components/tools/paraphrase/ParaphraseContend";

export async function generateMetadata() {
  return {
    title:
      "Shothik AI: Paraphrase & Humanize AI Text - Bypass Detection, No Sign-Up",
    description:
      "Paraphrase AI text with Shothik AI's free tool. Bypass AI detection, humanize content, and get a 100% human score. Try our advanced paraphraser now, no sign-up!",
    metadataBase: new URL("https://www.shothik.ai"),
    openGraph: {
      title: "Shothik AI: Instantly Paraphrase & Humanize AI Text - No Sign-Up",
      description:
        "Paraphrase AI text with Shothik AI's free tool. Bypass AI detection, humanize content, and get a 100% human score. Try our advanced paraphraser now, no sign-up required!",
      url: "https://www.shothik.ai/paraphrase/",
      images: [
        {
          url: "https://www.shothik.ai/moscot.png",
          width: "1200",
          height: "630",
          alt: "Shothik AI",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Shothik AI: Humanize AI Text & Bypass Detection",
      description:
        "Use our free AI Paraphraser to rewrite & humanize AI text, bypass detectors & get a 100% human score! No Sign-Up. Try now! #AIWriting #Paraphrasing",
      site: "@shothikai",
      creator: "@shothikai",
    },
  };
}

const Paraphrase = () => {
  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", gap: { md: 12, xs: 10 } }}
    >
      <ParaphraseContend />
      <ToolsSepecigFaq
        tag='All you need to know about Paraphrase feature'
        data={paraphraseFaq}
      />
      <ToolsCTA toolType='paraphrase' />
      <HomeAdvertisement />
      <div hidden>
        <h1>Instantly Paraphrase & Humanize AI Text with Shothik AI</h1>
        <h2>Get Original, Plagiarism-Free Content in Seconds</h2>
        <h2>Bypass AI Detectors and Improve Your Writing</h2>
        <h2>How to Humanize AI Text for 100% Human Score</h2>
        <h2>Unique AI Paraphrasing that Maintains Original Meaning</h2>
      </div>
    </Container>
  );
};

export default Paraphrase;
