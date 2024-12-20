export interface Domain {
    id: string;
    name: string;
    status: 'up' | 'down';
    lastChecked: string;
    whoisDetails: {
      registrar: string;
      createdDate: string;
      expiryDate: string;
      registrant: string;
    };
    sslDetails: {
      issuer: string;
      validFrom: string;
      validTo: string;
      status: string;
    };
  }