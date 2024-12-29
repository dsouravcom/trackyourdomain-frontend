"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAuthApi } from "@/lib/api";
import { CheckCircle, Plus, XCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { Domain } from "./types";

export default function Home() {
  const api = useAuthApi();

  const [domains, setDomains] = useState<Domain[]>([
    {
      id: "1",
      name: "example.com",
      status: "up",
      lastChecked: new Date().toISOString(),
      whoisDetails: {
        registrar: "Example Registrar",
        createdDate: "2020-01-01",
        expiryDate: "2024-01-01",
        registrant: "John Doe",
      },
      sslDetails: {
        issuer: "Let's Encrypt",
        validFrom: "2023-01-01",
        validTo: "2024-01-01",
        status: "Valid",
      },
    },
    {
      id: "2",
      name: "test.com",
      status: "down",
      lastChecked: new Date().toISOString(),
      whoisDetails: {
        registrar: "Test Registrar",
        createdDate: "2021-01-01",
        expiryDate: "2025-01-01",
        registrant: "Jane Doe",
      },
      sslDetails: {
        issuer: "Let's Encrypt",
        validFrom: "2023-01-01",
        validTo: "2024-01-01",
        status: "Valid",
      },
    },
  ]);

  const [newDomain, setNewDomain] = useState("");

  const handleAddDomain = () => {
    if (newDomain) {
      const domain: Domain = {
        id: Math.random().toString(),
        name: newDomain,
        status: Math.random() > 0.5 ? "up" : "down",
        lastChecked: new Date().toISOString(),
        whoisDetails: {
          registrar: "Example Registrar",
          createdDate: "2024-01-01",
          expiryDate: "2025-01-01",
          registrant: "John Doe",
        },
        sslDetails: {
          issuer: "Let's Encrypt",
          validFrom: "2024-01-01",
          validTo: "2025-01-01",
          status: "Valid",
        },
      };
      setDomains([...domains, domain]);
      setNewDomain("");
    }
  };

  const testing = async () => {
    console.log("Testing...");
    console.log(api.getUri({ url: "/domain/protected" }));
    await api.get("/domain/user");
  };

  return (
    <main className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Domains</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Domain
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Domain</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                placeholder="Enter domain name"
                value={newDomain}
                onChange={(e) => setNewDomain(e.target.value)}
              />
              <Button onClick={handleAddDomain}>Add Domain</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <button onClick={testing}>Testing...</button>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {domains.map((domain) => (
          <Link href={`/domain/${domain.id}`} key={domain.id}>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="flex items-center justify-between p-6">
                <span className="font-medium">{domain.name}</span>
                {domain.status === "up" ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
