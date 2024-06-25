"use client";

import { getEntryById } from "@/utils/api";
import { Sys } from "@/utils/type/contentful";
import { Metadata } from "next";
import useSWR from "swr";

interface ReferenceBlockFields {
  description: string;
  linkButton: {
    text: string;
    url: string;
  };
  title: string;
}

interface ReferenceBlock {
  metadata: Metadata;
  sys: Sys;
  fields: ReferenceBlockFields;
}

interface TypeServiceData {
  fields: {
    headline: string;
    referenceBlocks: ReferenceBlock[];
  };
  sys: Sys;
}

export default function TestApi() {
  const { data, error, isLoading } = useSWR(
    "section-services",
    () => {
      const entryId = process.env.CONTENTFUL_SERVICES_ENTRY_ID;
      if (!entryId) {
        console.error("MISSING .ENV");
        return null;
      }
      return getEntryById<TypeServiceData>({
        id: entryId,
        selectField: ["fields"],
      }).then((entry) => entry);
    },
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  console.log(data);
  return <></>;
}
