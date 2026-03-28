"use client";

import Link from "next/link";
import { useState } from "react";

type IconItem = {
  id: number;
  name: string;
  thumbnails: Array<{
    url: string;
    width: number;
    height: number;
  }>;
  author: {
    name: string;
  };
  style: {
    name: string;
  };
  family: {
    name: string;
  };
};

export default function Home() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<IconItem[] | null>(null);

  async function handleSubmit(event: any) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/icons/search?term=${query}&page=${page}&per_page=${perPage}`
      );
      console.log("Fetch completed with status:", response);
      const payload = await response.json();

      if (!response.ok) {
        setResult(null);
        setError(payload.error ?? "Failed to fetch icons.");
        return;
      }

      setResult(payload);
    } catch {
      setError("Something went wrong while fetching icons.");
      setResult(null);
    } finally {
      setLoading(false);
    }
  }


  return (
    <main className="mx-auto flex max-w-5xl w-full flex-1 flex-col gap-6 px-6 py-10">
      {loading ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div>
            <p className="text-lg font-semibold text-white">Searching icons...</p>
          </div>
        </div>
      ) : null}

      <header>
        <h1 className="text-3xl font-semibold">Freepik Icons Search</h1>
      </header>

      <form
        onSubmit={handleSubmit}
        className="grid gap-4 rounded-xl border border-white p-4 "
      >
        <label className="grid gap-1">
          <span className="text-sm font-medium">Search</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="rounded-md border border-white bg-transparent px-3 py-2"
            placeholder="Enter icon name you want to find"
          />
        </label>

        <div className="flex flex-wrap items-end gap-4">

          <label className="grid gap-1">
            <span className="text-sm font-medium">Page</span>
            <input
              type="number"
              value={page}
              onChange={(event) => setPage(Number(event.target.value) || 1)}
              className="w-24 rounded-md border border-white bg-transparent px-3 py-2 "
            />
          </label>

          <label className="grid gap-1">
            <span className="text-sm font-medium">Per page</span>
            <input
              type="number"
              value={perPage}
              onChange={(event) => setPerPage(Number(event.target.value) || 12)}
              className="w-24 rounded-md border border-white bg-transparent px-3 py-2 "
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-white px-4 py-2 text-black cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>

      {error ? (
        <p className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800 ">
          {error}
        </p>
      ) : null}

      {result ? (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {result.map((icon) => (
              <div
                key={icon.id}
                className="rounded-xl border border-white p-4"
              >
                <Link href={`/icons/${icon.id}`}>
                  <div className="overflow-hidden rounded-lg border border-white bg-white ">
                      <img
                        src={icon.thumbnails?.[0]?.url}
                        alt={"Icon"}
                        className="h-full w-full"
                      />
                  </div>
                  <h2 className="mt-3 text-sm font-semibold">
                    {icon.name}
                  </h2>
                </Link>
                <p className="mt-1 text-xs text-white">
                    ID: {icon.id}
                </p>
                <p className="mt-1 text-sm text-white">
                  Author: {icon?.author?.name}
                </p>
                <div className="mt-3 flex gap-2">
                  <Link
                    href={`/icons/${icon.id}`}
                    className="rounded-md border border-white px-3 py-1.5 text-xs font-medium"
                  >
                    Open Details Page
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </main>
  );
}
