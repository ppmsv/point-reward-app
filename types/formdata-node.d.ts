declare module 'formdata-node' {
  export class File {
    constructor(chunks: any[], name: string, options?: { type?: string; lastModified?: number })
    name: string
    size: number
    type: string
    lastModified: number
    arrayBuffer(): Promise<ArrayBuffer>
    text(): Promise<string>
  }

  export class FormData {
    append(name: string, value: any, filename?: string): void
  }
}