import Details from "./Details";
import sanityClient from "@/Client";
import type { Post } from "@/types/type";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface detailsProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateMetadata({
  params,
}: detailsProps): Promise<Metadata> {
  const { slug } = await params;
  const product = `*[_type == "post" && slug.current == $slug][0]{
    title,
    description,
    mainImage{
    asset->{url}
    }
  }`;

  const productData = await sanityClient.fetch<Post>(product, { slug });

  return {
    title: productData?.title || "Product",
    description:
      productData?.description ||
      `Shop ${productData?.title} - premium quality at the best price. Order now and get fast delivery.`,
    icons: productData?.mainImage?.asset?.url || "",
    openGraph: {
      title: productData?.title || "Product",
      description:
        productData?.description ||
        `Shop ${productData?.title} - premium quality at the best price. Order now and get fast delivery.`,
      images: [
        {
          url: productData?.mainImage?.asset?.url || "",
          width: 800,
          height: 600,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: productData?.title || "Product",
      description:
        productData?.description ||
        `Shop ${productData?.title} - premium quality at the best price. Order now and get fast delivery.`,
      images: [
        {
          url: productData?.mainImage?.asset?.url || "",
          width: 800,
          height: 600,
        },
      ],
    },
  };
}

export default async function page({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { slug } = await params;

  const product = `*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      description,
      price{
        amount,
        currency
      },
      category[]-> {
      title, type},
      mainImage {
        asset -> {
          _id, 
          url
        }, 
        alt
      }
    }`;

  const productData = await sanityClient.fetch<Post>(product, { slug });

  if (!productData) {
    notFound();
  }

  return <Details productData={productData} />;
}
