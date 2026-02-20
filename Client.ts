import { createClient } from "@sanity/client";

const sanityClient = createClient({
  projectId: "1wsf3o8r",
  dataset: "production",
  apiVersion: "2026-12-26", // Specify the API version
  useCdn: true, // Set to `true` to use the CDN
});

export default sanityClient;
