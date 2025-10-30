declare module 'fetch-blob' {
  export class Blob {
    constructor(parts?: any[], options?: { type?: string })
    size: number
    type: string
    text(): Promise<string>
    arrayBuffer(): Promise<ArrayBuffer>
  }
}