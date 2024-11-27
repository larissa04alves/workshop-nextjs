import api from "@/api";

export async function GET() {
    const restaurants = await api.list();

    return Response.json(restaurants);
}
