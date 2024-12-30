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
import { useEffect, useState } from "react";
import type { Domain } from "./types";

export default function Home() {
  const api = useAuthApi();

  const [domains, setDomains] = useState<Domain[]>([]);
  const [newDomain, setNewDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true); // Start with true
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const { data } = await api.get("/domain");
        setDomains(data);
      } catch (error) {
        console.log(error);
        alert("Error fetching domains");
      } finally {
        setInitialLoading(false);
      }
    };

    fetchDomains();
  }, [loading]);

  const handleAddDomain = async () => {
    try {
      setLoading(true);
      await api.post("/domain", { domainName: newDomain });
      setOpen(false);
    } catch (error) {
      console.log(error);
      alert("Error adding domain");
    } finally {
      setLoading(false);
      setNewDomain("");
    }
  };

  if (initialLoading) {
    return (
      <main className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Domains</h1>
        </div>
        <p className="text-center text-gray-500">Loading...</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Domains</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setOpen(true)}>
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
              <Button disabled={loading} onClick={handleAddDomain}>
                {loading ? "Adding..." : "Add Domain"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {domains.length > 0 ? (
          domains.map((domain) => (
            <Link href={`/domain/${domain.id}`} key={domain.id}>
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="flex items-center justify-between p-6">
                  <span className="font-medium">{domain.url}</span>
                  {domain.status ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">No domains found</p>
        )}
      </div>
    </main>
  );
}