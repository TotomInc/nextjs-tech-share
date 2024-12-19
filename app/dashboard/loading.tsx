"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/Table";

export default function Loading() {
  return (
    <>
      <Skeleton width={200} height={36} />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Customer Email</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {[0, 1, 2, 3].map((_, i) => (
            <TableRow key={i}>
              <TableCell className="max-w-[64px] overflow-hidden text-ellipsis whitespace-nowrap">
                <Skeleton width={80} height={24} />
              </TableCell>

              <TableCell>
                <Skeleton width={120} height={24} />
              </TableCell>

              <TableCell>
                <Skeleton width={60} height={24} />
              </TableCell>

              <TableCell>
                <Skeleton width={120} height={24} />
              </TableCell>

              <TableCell>
                <Skeleton width={120} height={24} />
              </TableCell>

              <TableCell>
                <Skeleton width={64} height={24} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}