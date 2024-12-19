"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { TrashIcon } from "@heroicons/react/16/solid";

import { deleteInvoice } from "@/lib/actions/invoices";
import { Button } from "@/components/Button";

type Props = {
  invoiceId: string;
};

export function DeleteInvoice({ invoiceId }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);

    await deleteInvoice(invoiceId);

    router.refresh();
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button aria-label="Delete invoice" variant="outline" className="p-2">
          <TrashIcon className="text-red-700 size-4" />
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="bg-black opacity-70 fixed inset-0" />

        <Dialog.Content className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[90vw] max-w-md max-h-[80vh] p-6 rounded-xl shadow-2xl bg-white">
          <Dialog.Title className="text-xl text-primary font-semibold">Delete invoice</Dialog.Title>

          <Dialog.Description className="mt-2 text-base text-secondary">
					  You&apos;re about to delete this invoice. Are you sure you want to proceed?
				  </Dialog.Description>

          <div className="flex justify-end gap-4 mt-6">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>

            <Button variant="destructive" disabled={isLoading} onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
