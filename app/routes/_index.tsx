import { json } from "@vercel/remix";
import { useLoaderData } from "@remix-run/react";

export async function loader() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const test = await res.json();
  return json({ test });
}

export default function Index() {
  const { test } = useLoaderData<typeof loader>();
  return <p>{test}</p>;
}
