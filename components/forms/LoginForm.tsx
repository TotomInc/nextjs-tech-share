"use client";

import { useState } from "react";

import { type LoginState, login } from "@/lib/actions/login";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginState["errors"]>(undefined);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    const response = await login(email, password);

    if (response.errors) {
      setErrors(response.errors);
    }

    setIsLoading(false);
  }

  return (
    <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
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
        Login
      </Button>

      {errors?.globalError ? (
        <p className="text-red-700 text-sm font-medium">{errors.globalError}</p>
      ) : null}
    </form>
  );
}