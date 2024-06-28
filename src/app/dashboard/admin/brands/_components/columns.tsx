"use client";

import { Brand } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { BadgeCheck, BadgeMinus } from "lucide-react";
import Image from "next/image";

import CellActions from "./cell-actions";

export const columns: ColumnDef<Brand>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      return (
        <div className="relative h-fit overflow-hidden ">
          <Image
            src={row.original.image}
            alt="image"
            width={100}
            height={100}
            className="w-30 h-20 object-contain px-2 rounded-md shadow-2xl dark:bg-gray-400"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <span className="font-extrabold text-lg capitalize">
          {row.original.name}
        </span>
      );
    },
  },
  {
    accessorKey: "url",
    header: "URL",
    cell: ({ row }) => {
      return <span>/{row.original.url}</span>;
    },
  },
  {
    accessorKey: "featured",
    header: "Featured",
    cell: ({ row }) => {
      return (
        <span className="text-muted-foreground">
          {row.original.featured ? (
            <BadgeCheck className="stroke-green-500" />
          ) : (
            <BadgeMinus className="stroke-red-400" />
          )}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const rowData = row.original;

      return <CellActions rowData={rowData} />;
    },
  },
];
