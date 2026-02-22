import sanityClient from "@/Client";
import type { Post } from "@/types/type";
import Product from "./Product";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface categoryProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({
  params,
}: categoryProps): Promise<Metadata> {
  const { category } = await params;

  const query = `*[_type == "post" && $category in category[]->type]{
    title,
    description,
    mainImage{
    asset->{url}
    }
  }`;
  const categoryData = await sanityClient.fetch<Post[]>(query, {
    category: category,
  });

  return {
    title: `${categoryData?.[0]?.title || category} - Luvra`,
    description: `Shop ${categoryData?.[0]?.description || category} products at Luvra - premium quality at the best price.`,
    icons: categoryData?.[0]?.mainImage?.asset?.url || "",
    openGraph: {
      title: categoryData?.[0]?.title || "Product",
      description:
        categoryData?.[0]?.description ||
        `Shop ${categoryData?.[0]?.title} - premium quality at the best price. Order now and get fast delivery.`,
      images: [
        {
          url: categoryData?.[0]?.mainImage?.asset?.url || "",
          width: 800,
          height: 600,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: categoryData?.[0]?.title || "Product",
      description:
        categoryData?.[0]?.description ||
        `Shop ${categoryData?.[0]?.title} - premium quality at the best price. Order now and get fast delivery.`,
      images: [
        {
          url: categoryData?.[0]?.mainImage?.asset?.url || "",
          width: 800,
          height: 600,
        },
      ],
    },
  };
}

export default async function page({ params }: categoryProps) {
  const { category } = await params;

  // Try the query
  const products = await sanityClient.fetch<Post[]>(
    `*[_type == "post" && $category in category[]->type]{
      _id,
      slug{
      current
      },
      title,
      description,
      price{
       amount,
      currency
      },
      mainImage {
      asset -> {
        _id, 
        url
      }, 
      alt
    }, 
      category[]->{
        title,
        type
      }
    }`,
    { category },
  );

  if (!products || products.length === 0) {
    notFound();
  }

  return (
    <>
      <Product products={products} category={category} />
    </>
  );
}
