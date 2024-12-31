"use client";

import type { Domain } from "@/app/types/index";
import LastCheckedTime from "@/components/LastCheckedTime";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuthApi } from "@/lib/api";
import {
  Building,
  Calendar,
  CheckCircle,
  ExternalLink,
  Globe,
  Lock,
  Monitor,
  RotateCw,
  Server,
  Shield,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DomainInfoPage() {
  const api = useAuthApi();

  const [previewState, setPreviewState] = useState({
    loading: true,
    error: false,
  });
  const [domainInfo, setDomainInfo] = useState<Domain>();
  const [loading, setLoading] = useState(false);
  const [timezone, setTimezone] = useState("");
  const [isRotating, setIsRotating] = useState(false);

  const { id } = useParams();

  const fetchDomainData = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/domain/${id}`);
      setDomainInfo(res.data);
    } catch (error) {
      console.log(error);
      alert("Error fetching domain data");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDomainData();

    // Get the current timezone
    const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimezone(currentTimezone);
  }, []);

  useEffect(() => {
    // Set initial error state after a short delay
    // This helps catch immediate loading failures
    const timer = setTimeout(() => {
      setPreviewState((prev) => ({
        ...prev,
        error: true,
        loading: false,
      }));
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = async () => {
    setIsRotating(true);
    try {
      // Simulate API call
      await api.post(`/domain/refresh/${id}`);
    } catch (error) {
      console.error("API call failed:", error);
    } finally {
      setIsRotating(false);
      fetchDomainData();
    }
  };
  const handleWhoisRefresh = async () => {
    setIsRotating(true);
    try {
      // Simulate API call
      await api.post(`/domain/refresh-whois/${id}`);
    } catch (error) {
      console.error("API call failed:", error);
    } finally {
      setIsRotating(false);
      fetchDomainData();
    }
  };
  const handleSSLRefresh = async () => {
    setIsRotating(true);
    try {
      // Simulate API call
      await api.post(`/domain/refresh-ssl/${id}`);
    } catch (error) {
      console.error("API call failed:", error);
    } finally {
      setIsRotating(false);
      fetchDomainData();
    }
  };

  const handleIframeLoad = () => {
    setPreviewState({
      loading: false,
      error: false,
    });
  };

  const handleIframeError = () => {
    setPreviewState({
      loading: false,
      error: true,
    });
  };

  const formatDate = (dateInput: string | number) => {
    let date;
    if (typeof dateInput === "string" && !isNaN(Number(dateInput))) {
      // If the input is a string that can be converted to a number, treat it as a Unix timestamp
      dateInput = Number(dateInput);
    }

    if (typeof dateInput === "number") {
      // If the input is a number, treat it as a Unix timestamp
      date = new Date(dateInput * 1000); // Convert seconds to milliseconds
    } else {
      // Otherwise, treat it as an ISO date string
      date = new Date(dateInput);
    }

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      console.error("Invalid date input:", dateInput);
      return "Invalid date";
    }

    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const StatusIcon = domainInfo?.status ? CheckCircle : XCircle;
  const statusText = domainInfo?.status ? "Up" : "Down";

  if (loading) {
    return (
      <div className="container mx-auto p-4 space-y-8">
        <header className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
            <div>
              <div className="w-40 h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </header>

        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="animate-pulse">
              <div className="w-full h-48 bg-gray-200 rounded-md"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div className="container mx-auto p-4 space-y-8">
      {domainInfo ? (
        <div>
          <header className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <Image
                src={`https://www.google.com/s2/favicons?domain=https://${domainInfo.url}&sz=64`}
                alt={`${domainInfo.url} favicon`}
                width={64}
                height={64}
                className="w-12 h-12"
              />
              <div className="flex justify-between w-full">
                <div>
                  <h1 className="text-3xl font-bold">{domainInfo.url}</h1>
                  <p>{timezone}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge
                            variant={
                              domainInfo.status ? "default" : "destructive"
                            }
                            className="text-sm"
                          >
                            <StatusIcon
                              className={`w-4 h-4 mr-1 ${
                                domainInfo.status
                                  ? "text-green-500"
                                  : "text-red-950"
                              }`}
                            />
                            {statusText}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            {domainInfo.status
                              ? "Website is up and running"
                              : "Website is currently down"}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <span className="text-sm text-muted-foreground flex items-center">
                      <LastCheckedTime dateString={domainInfo.last_checked} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end space-x-4">
              <button
                onClick={handleRefresh}
                className="bg-red-500 rounded-lg p-2"
              >
                <RotateCw className={`size-4 ${isRotating ? "rotate" : ""}`} />
              </button>
            </div>
          </header>

          <Card>
            <CardContent className="p-6 space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Monitor className="w-5 h-5 mr-2" />
                  Website Preview
                </h2>
                <div className="relative aspect-video w-full max-w-2xl mx-auto border rounded-md overflow-hidden bg-muted">
                  {(previewState.error || previewState.loading) && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                      {previewState.loading ? (
                        <span className="text-muted-foreground">
                          Loading preview...
                        </span>
                      ) : (
                        <>
                          <p className="text-muted-foreground mb-4">
                            Preview not available. This website cannot be
                            embedded.
                          </p>
                          <Button
                            onClick={() =>
                              window.open(
                                `https://${domainInfo.url}`,
                                "_blank",
                                "noopener,noreferrer"
                              )
                            }
                            className="flex items-center gap-2"
                          >
                            Visit Website <ExternalLink className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  )}
                  <iframe
                    src={`https://${domainInfo.url}`}
                    className="w-full h-full"
                    style={{
                      opacity:
                        !previewState.error && !previewState.loading ? 1 : 0,
                      display: previewState.error ? "none" : "block",
                    }}
                    onLoad={handleIframeLoad}
                    onError={handleIframeError}
                    title={`Preview of ${domainInfo.url}`}
                    sandbox="allow-same-origin allow-scripts"
                  />
                </div>
              </section>

              <Separator />

              <section>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <Globe className="w-5 h-5 mr-2" />
                    WHOIS Information
                  </h2>
                  <div className="flex items-center justify-end space-x-4">
                    <button
                      onClick={handleWhoisRefresh}
                      className="bg-red-500 rounded-lg p-2"
                    >
                      <RotateCw
                        className={`size-4 ${isRotating ? "rotate" : ""}`}
                      />
                    </button>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center space-x-2">
                    <Building className="w-5 h-5 text-muted-foreground" />
                    <span className="font-semibold">Registrar:</span>
                    <span>{domainInfo.registrar}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <span className="font-semibold">Created:</span>
                    <span>{formatDate(domainInfo.creation_date)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <span className="font-semibold">Updated:</span>
                    <span>{formatDate(domainInfo.updated_date)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <span className="font-semibold">Expires:</span>
                    <span>{formatDate(domainInfo.expiration_date)}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="font-semibold flex items-center space-x-2 mb-2">
                    <Server className="w-5 h-5 text-muted-foreground" />
                    <span>Nameservers:</span>
                  </span>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {domainInfo.name_servers.map((ns, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Image
                          src={`https://www.google.com/s2/favicons?domain=${ns}&sz=16`}
                          alt={`${ns} favicon`}
                          width={16}
                          height={16}
                          className="w-4 h-4"
                        />
                        <span>{ns}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <Separator />

              <section>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <Lock className="w-5 h-5 mr-2" />
                    SSL Information
                  </h2>
                  <div className="flex items-center justify-end space-x-4">
                    <button
                      onClick={handleSSLRefresh}
                      className="bg-red-500 rounded-lg p-2"
                    >
                      <RotateCw
                        className={`size-4 ${isRotating ? "rotate" : ""}`}
                      />
                    </button>
                  </div>
                </div>
                {domainInfo.ssl_status ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-muted-foreground" />
                      <span className="font-semibold">Issuer:</span>
                      <span>{domainInfo.ssl_issuer}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <span className="font-semibold">Valid From:</span>
                      <span>{domainInfo.ssl_valid_from}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <span className="font-semibold">Valid To:</span>
                      <span>{domainInfo.ssl_valid_till}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-red-500">SSL certificate not found</p>
                )}
                {domainInfo.alternative_urls && (
                  <div className="mt-4">
                    <span className="font-semibold flex items-center space-x-2 mb-2">
                      <Globe className="w-5 h-5 text-muted-foreground" />
                      <span>Subject Alternative Names:</span>
                    </span>
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {domainInfo.alternative_urls.map((name, index) => (
                        <li key={index}>{name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            </CardContent>
          </Card>
        </div>
      ) : (
        <p className="text-center text-gray-500">No domain found</p>
      )}
    </div>
  );
}
