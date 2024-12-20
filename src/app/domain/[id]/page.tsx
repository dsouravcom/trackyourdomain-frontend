"use client";

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle } from "lucide-react";
import type { Domain } from "@/app/types";

export default function DomainDetails() {
  const params = useParams();
  
  // Mock data - in real app, fetch based on params.id
  const domain: Domain = {
    id: params.id as string,
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
  };

  return (
    <div className="container mx-auto py-6">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">{domain.name}</CardTitle>
            {domain.status === "up" ? (
              <CheckCircle className="h-6 w-6 text-green-500" />
            ) : (
              <XCircle className="h-6 w-6 text-red-500" />
            )}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Last checked: {new Date(domain.lastChecked).toLocaleString()}
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="whois">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="whois">WHOIS Details</TabsTrigger>
          <TabsTrigger value="ssl">SSL Details</TabsTrigger>
        </TabsList>
        <TabsContent value="whois">
          <Card>
            <CardHeader>
              <CardTitle>WHOIS Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">Registrar</h4>
                <p className="text-sm text-muted-foreground">
                  {domain.whoisDetails.registrar}
                </p>
              </div>
              <div>
                <h4 className="font-medium">Created Date</h4>
                <p className="text-sm text-muted-foreground">
                  {domain.whoisDetails.createdDate}
                </p>
              </div>
              <div>
                <h4 className="font-medium">Expiry Date</h4>
                <p className="text-sm text-muted-foreground">
                  {domain.whoisDetails.expiryDate}
                </p>
              </div>
              <div>
                <h4 className="font-medium">Registrant</h4>
                <p className="text-sm text-muted-foreground">
                  {domain.whoisDetails.registrant}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="ssl">
          <Card>
            <CardHeader>
              <CardTitle>SSL Certificate Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">Issuer</h4>
                <p className="text-sm text-muted-foreground">
                  {domain.sslDetails.issuer}
                </p>
              </div>
              <div>
                <h4 className="font-medium">Valid From</h4>
                <p className="text-sm text-muted-foreground">
                  {domain.sslDetails.validFrom}
                </p>
              </div>
              <div>
                <h4 className="font-medium">Valid To</h4>
                <p className="text-sm text-muted-foreground">
                  {domain.sslDetails.validTo}
                </p>
              </div>
              <div>
                <h4 className="font-medium">Status</h4>
                <p className="text-sm text-muted-foreground">
                  {domain.sslDetails.status}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}