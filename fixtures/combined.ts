import { mergeExpects, mergeTests } from "@playwright/test";
import { test as Pages, expect as PagesExpect } from "./pages";

export const test = mergeTests(Pages);
export const expect = mergeExpects(PagesExpect);
