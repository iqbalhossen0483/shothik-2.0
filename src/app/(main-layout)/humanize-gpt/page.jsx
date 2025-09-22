import { humanizeFaq } from "@/_mock/tools/humanizefaq";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import HomeAdvertisement from "@/components/common/HomeAdvertisement";
import ToolsCTA from "@/components/tools/common/ToolsCTA";
import ToolsSepecigFaq from "@/components/tools/common/ToolsSepecigFaq";
import HumanizedContend from "@/components/tools/humanize/HumanizedContend";
import { Container } from "@mui/material";

export async function generateMetadata() {
  return {
    title: "Shothik AI: Humanize AI Text & Bypass Detection - 100% Human Score",
    description:
      "Transform AI text with Shothik AI's Humanize GPT. Get a 100% human score, bypass detection, & create engaging content that sounds human. Try it for free!",
    openGraph: {
      title:
        "Shothik AI: Humanize AI Text & Bypass Detection - 100% Human Score",
      description:
        "Transform AI text with Shothik AI's Humanize GPT. Get a 100% human score, bypass detection, & create engaging content that sounds human. Try it for free!",
      image: "https://www.shothik.ai/moscot.png",
      url: "https://www.shothik.ai/moscot.png",
      type: "website",
      imageWidth: "1200",
      imageHeight: "630",
    },
    twitter: {
      card: "summary_large_image",
      title: "Shothik AI: Humanize AI Text, Avoid Plagiarism",
      description:
        "Transform AI text with Shothik AI! Get a 100% human score, bypass detection, & improve your writing. #AIWriting #HumanizeText",
      image: "URL of your social sharing image",
      site: "@your_twitter_handle",
    },
  };
}

const Humanize = () => {
  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", gap: { md: 7, xs: 5 } }}
    >
      <ErrorBoundary>
        <HumanizedContend />
      </ErrorBoundary>
      <ToolsSepecigFaq
        tag="All you need to know about Humanize GPT feature"
        data={humanizeFaq}
      />
      <ToolsCTA toolType="humanize" />
      <HomeAdvertisement />

      <div hidden>
        <h1>Achieve a 100% Human Score with Shothik AI's Humanize GPT</h1>

        <h2>How Shothik AI's Humanize GPT Works</h2>
        <p>
          Shothik AI's Humanize GPT utilizes advanced algorithms and natural
          language processing (NLP) techniques to transform AI-generated text
          into content that is indistinguishable from human writing. By
          analyzing and understanding the context, style, and nuances of human
          language, Humanize GPT restructures and enhances AI text to achieve a
          natural, engaging, and authentic tone.
        </p>

        <h2>Get 100% Human-Sounding Text Every Time</h2>
        <p>
          With Shothik AI's Humanize GPT, you can consistently produce
          high-quality content that reads as if it were written by a human. This
          ensures that your message resonates with your audience, fosters trust,
          and avoids the pitfalls of robotic or unnatural AI-generated text.
        </p>

        <h2>Is AI-Generated Content Always Detectable?</h2>
        <p>
          While AI content generation tools have become increasingly
          sophisticated, there are still subtle cues and patterns that can be
          detected by AI detectors. Shothik AI's Humanize GPT addresses these
          concerns by refining AI text to mimic human writing patterns, making
          it virtually undetectable by AI detection tools.
        </p>

        <h2>Easy to Use: Transform Your AI Text in Seconds</h2>
        <p>
          Shothik AI's Humanize GPT is designed for simplicity and ease of use.
          With an intuitive interface and seamless integration, you can
          transform your AI text into human-like content in just a few clicks.
        </p>

        <h2>Try Shothik AI's Humanize GPT For Free</h2>
        <p>
          Experience the power of Shothik AI's Humanize GPT and unlock the
          potential of AI-generated content that truly sounds human. Sign up for
          a free trial today and elevate your content to new heights.
        </p>
      </div>
    </Container>
  );
};

export default Humanize;
