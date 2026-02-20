import sanityClient from "@/Client";
import type { Post } from "@/types/type";
import Product from "./Product";

type Props = {
  params: Promise<{ category: string }>;
};

export default async function page({ params }: Props) {
  const { category } = await params;

  console.log("=== CATEGORY PAGE DEBUG ===");
  console.log("1. Category parameter:", category);

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
    { category }, //
  );

  if (!products || products.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Product not found
      </div>
    );
  }

  return (
    <>
      <Product products={products} category={category} />
    </>
  );
}
