import { Source } from "./source"

export interface News {
    title: string,
    description: string,
    source: Source,
    author: string,
    publishedAt: Date,
    urlToImage: string,
    content: string
}