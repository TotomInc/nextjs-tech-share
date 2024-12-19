"use client";

import { useState } from "react";

import { type SignupState, signup } from "@/lib/actions/signup";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<SignupState["errors"]>(undefined);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    const response = await signup(name, email, password);

    if (response.errors) {
      setErrors(response.errors);
    }

    setIsLoading(false);
  }

  return (
    <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
      <Input
        label="Name"
        type="text"
        name="name"
        id="name"
        placeholder="John Doe"
        required
        errorMessage={errors?.name?.[0]}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        label="Email"
        type="email"
        name="email"
        id="email"
        placeholder="john@mon-entreprise.fr"
        required
        errorMessage={errors?.email?.[0]}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      
      <Input
        label="Password"
        type="password"
        name="password"
        id="password"
        required
        errorMessage={errors?.password?.[0]}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button type="submit" className="w-full" disabled={isLoading}>
        Create account
      </Button>
    </form>
  )
}