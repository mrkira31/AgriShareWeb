import type { NextConfig } from "next";
const config: NextConfig = {
  devIndicators: false,
  agentRules: false,
  images: { qualities: [75, 90] },
};
export default config;
