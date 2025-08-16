export function fileToGenerativePath(path: string, mimeType: string) {
  return {
    inlineData: {
      data: Buffer.from(path).toString("base64"),
      mimeType,
    },
  };
}
