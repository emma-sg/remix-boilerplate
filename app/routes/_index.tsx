import type { MetaFunction, LoaderFunctionArgs } from "@vercel/remix";
import { json } from "@vercel/remix";
import { useLoaderData } from "@remix-run/react";

import { stringify } from "qs";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

async function testSlow(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(resolve, 100, "foo");
  });
}

export async function loader({ request }: LoaderFunctionArgs) {
  return json({
    test: await testSlow(),
    testUrl: stringify({ a: 1, b: 2, c: { d: 3, e: [4, 5] } }),
  });
}

export default function Index() {
  const { test, testUrl } = useLoaderData<typeof loader>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <p>{test}</p>
      <p>{testUrl}</p>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
