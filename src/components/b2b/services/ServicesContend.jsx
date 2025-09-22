"use client";
import { Stack } from "@mui/material";
import { useSearchParams } from "next/navigation";
import React from "react";
import { features } from "../../../_mock/b2b/features";
import { FeaturesSection } from "../FeaturesSection";
import { HeroSection } from "./HeroSection";
import { ProjectSection } from "./ProjectSection";

const ServicesContend = () => {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const data = features.filter((item) => item.slug !== slug).slice(0, 2);
  data.push({
    image: "url('/b2b/see-more.png')",
  });

  return (
    <Stack spacing={5}>
      <HeroSection slug={slug} />
      <ProjectSection slug={slug} />
      <FeaturesSection features={data} title='Other Services' />
    </Stack>
  );
};

export default ServicesContend;
