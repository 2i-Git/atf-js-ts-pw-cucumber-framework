import { test as testBase } from "@playwright/test";
export { expect } from "@playwright/test";

type Data = { example: string };

export const test = testBase.extend<Data>({});
