import Link from "next/link";
import { redirect } from "next/navigation";


export const dynamic = "force-dynamic";
import api from "@/api";
import { cookies } from "next/headers"
import RestaurantCard from "@/components/RestaurantCard";

// import SearchBox from "@/components/search-box";

export default async function Home({ searchParams }: { searchParams: Promise<{ q: string }> }) {
  const { q } = await searchParams;
  const restaurants = await api.search(q);
  const cookieStore = await cookies();
  console.log(cookieStore.get('nome'));

  async function searchAction(formData: FormData) {
    'use server'

    redirect(`/?q=${formData.get('query')}`);
  }

  return (

    <section>
      <form action={searchAction} className=" inline-flex gap-2 mb-4">
        <input defaultValue={q || ''} className="px-2 text-black" name="query" />
        <button type="submit" className="p-2 bg-white/20">Buscar</button>
      </form>
      {/* <SearchBox /> */}
      <section className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">

        {restaurants.map((restaurant) => (
          <Link key={restaurant.id} href={`/${restaurant.id}`}>
            <RestaurantCard restaurant={restaurant} />
          </Link>
        ))}
      </section>
    </section>
  );
}