"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PlusIcon } from "@heroicons/react/20/solid";

import { type CreateInvoiceState, createInvoice } from "@/lib/actions/invoices";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export function CreateInvoiceForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [errors, setErrors] = useState<CreateInvoiceState["errors"]>(undefined);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await createInvoice(name, String(amount), customerName, customerEmail);

      if (response?.errors) {
        setErrors(response.errors);
      } else {
        toast.success("Invoice created successfully");
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong, please try again");
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4 w-full">
        <Input
          label="Name"
          type="text"
          name="name"
          id="name"
          placeholder="Invoice name"
          required
          aria-required="true"
          errorMessage={errors?.name?.[0]}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          label="Amount"
          type="number"
          name="amount"
          id="amount"
          placeholder="0"
          required
          aria-required="true"
          errorMessage={errors?.amount?.[0]}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <Input
          label="Customer Name"
          type="text"
          name="customerName"
          id="customerName"
          placeholder="Customer name"
          required
          aria-required="true"
          errorMessage={errors?.customerName?.[0]}
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />

        <Input
          label="Customer Email"
          type="email"
          name="customerEmail"
          id="customerEmail"
          placeholder="Customer email"
          required
          aria-required="true"
          errorMessage={errors?.customerEmail?.[0]}
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
        />
      </div>

      <Button type="submit" className="ml-auto">
        <PlusIcon className="size-5" /> Create invoice
      </Button>
    </form>
  );
}
