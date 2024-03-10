import { Client } from "@notionhq/client";

const client = new Client({ auth: process.env.NOTION_API_KEY });

export default client;
