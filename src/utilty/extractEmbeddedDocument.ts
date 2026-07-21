interface SplitHtml {
  before: string;
  embeddedDoc: string | null;
  after: string;
}

export function extractEmbeddedDocument(html: string): SplitHtml {
  const startTag = '<!DOCTYPE html>';
  const startIdx = html.indexOf(startTag);

  if (startIdx === -1) {
    return { before: html, embeddedDoc: null, after: '' };
  }

  const endTag = '</html>';
  const endIdx = html.indexOf(endTag, startIdx);
  const endPos = endIdx === -1 ? html.length : endIdx + endTag.length;

  return {
    before: html.slice(0, startIdx),
    embeddedDoc: html.slice(startIdx, endPos),
    after: html.slice(endPos),
  };
}
