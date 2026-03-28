"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type IconDetails = {
  id: number;
  name: string;
  slug: string;
  free_svg: boolean;
  created: string;
  author: {
    name: string;
    slug: string;
    id: number;
  };
  style: {
    name: string;
    id: number;
  };
  family: {
    name: string;
    id: number;
    total: number;
  };
  thumbnails: Array<{
    url: string;
    width: number;
    height: number;
  }>;
  tags: Array<{
    name: string;
    slug: string;
  }>;
};

type DetailsResponse = {
  data: IconDetails;
  error: string;
};

export default function IconDetailsPage() {
  const params = useParams();
  const id = params.id;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [icon, setIcon] = useState<IconDetails | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Missing icon id.");
      setLoading(false);
      return;
    }

    async function loadIcon() {
      try {
        const response = await fetch(`/api/icons/${id}`);
        const payload = (await response.json());

        if (!response.ok || !payload?.data) {
          setError(payload?.error ?? "Failed to fetch icon details.");
          setIcon(null);
          return;
        }

        setIcon(payload.data);
      } catch {
        setError("Something went wrong while fetching icon details.");
        setIcon(null);
      } finally {
        setLoading(false);
      }
    }

    loadIcon();
  }, [id]);

  if (loading) {
    return (
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-6 py-10">
        <p className="text-sm">Loading icon details...</p>
      </main>
    );
  }

  if (error || !icon) {
    return (
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-6 py-10">
        <p className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error ?? "Failed to fetch icon details."}
        </p>
        <Link href="/" className="text-sm font-medium underline underline-offset-4">
          Back to Search
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-6 py-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">{icon.name}</h1>
        <Link href="/" className="font-medium underline underline-offset-4">
            Back to Search
          </Link>
      </header>

      <div className="grid gap-6 rounded-xl border border-white p-4 md:grid-cols-2">
        <div>
          <div className="rounded-lg border border-white bg-zinc-50">
           
            <img
            src={icon.thumbnails[0].url}
            alt={icon.name}
            className="h-full w-full"
            />
            
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <p><span className="font-semibold">ID:</span> {id}</p>
          <p><span className="font-semibold">Name:</span> {icon.name}</p>
          <p><span className="font-semibold">Slug:</span> {icon.slug}</p>
          <p><span className="font-semibold">Author:</span> {icon.author?.name}</p>
          <p><span className="font-semibold">Style:</span> {icon.style?.name}</p>
          <p><span className="font-semibold">Family:</span> {icon.family?.name}</p>
          <p><span className="font-semibold">Free SVG:</span> {icon.free_svg ? "yes" : "no"}</p>
          <p><span className="font-semibold">Created:</span> {icon.created}</p>
          <p>
            <span className="font-semibold">Tags:</span>{" "}
            {icon.tags?.map((tag:any) => tag.name).filter(Boolean).join(", ")}
          </p>
        </div>
      </div>

    </main>
  );
}
