export interface Domain {
  id: string;
  url: string;
  status: boolean;
  last_checked: string;
  registrar: string;
  creation_date: string;
  updated_date: string;
  expiration_date: string;
  name_servers: string[];
  registrant: string;
  ssl_issuer: string;
  ssl_valid_from: string;
  ssl_valid_till: string;
  ssl_status: boolean;
  alternative_urls: string[];
}
