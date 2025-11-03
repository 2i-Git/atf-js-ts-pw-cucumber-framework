//models/wiki-data.ts
// define the structure of a test case
export type WikiCase = {
    topic: string;
    mustContain: string[];
};
// define test cases
export const WIKI_CASES: WikiCase[] = [
    { topic: "Playwright (software)", mustContain: ["Microsoft", "testing", "automation"] },
    { topic: "London", mustContain: ["capital", "Thames", "borough"] },
    { topic: "Unit testing", mustContain: ["code", "assertion", "framework"] },
    { topic: "Automation testing", mustContain: ["software", "QA", "manual"] },

];
