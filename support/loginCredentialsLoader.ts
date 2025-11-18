import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

export type Credential = {
  username: string;
  password: string;
};

function loadCredentialsFromCsv(): Credential[] {
  const filePath = path.resolve(__dirname, "../data/credentials.csv");
  const fileContent = fs.readFileSync(filePath, "utf-8");

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  }) as unknown;

  if (!Array.isArray(records)) {
    throw new Error("Invalid CSV format: expected an array of records.");
  }

  return records.map((record) => {
    if (
      typeof record === "object" &&
      record !== null &&
      "username" in record &&
      "password" in record
    ) {
      const { username, password } = record as Record<string, unknown>;
      if (typeof username === "string" && typeof password === "string") {
        return { username, password };
      }
    }
    throw new Error("Invalid record format in CSV");
  });
}

export function getAllCredentials(): Credential[] {
  return loadCredentialsFromCsv();
}

export function getCredentialByRow(rowIndex: number): Credential {
  const creds = getAllCredentials();
  const cred = creds[rowIndex];
  if (!cred) {
    throw new Error(`No credentials found for row ${rowIndex}`);
  }
  return cred;
}
