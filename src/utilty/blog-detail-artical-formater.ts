export const formatArticleData = (content: string) => {
  // If content is already HTML, return it as rawHtml
  if (content?.includes('<')) {
    return {
      rawHtml: content,
      intro: [],
      sections: [],
    };
  }

  // For plain text content, split by sections
  const lines =
    content?.split('\n').filter((line: string) => line.trim()) || [];
  const sections: any[] = [];
  let currentSection: any = null;
  let intro: string[] = [];

  lines.forEach((line: string) => {
    if (line.startsWith('## ')) {
      if (currentSection) {
        sections.push(currentSection);
      }
      currentSection = {
        id: `section-${sections.length + 1}`,
        title: line.replace('## ', '').trim(),
        content: [],
        list: [],
      };
    } else if (currentSection && line.startsWith('•')) {
      currentSection.list.push(line.replace('•', '').trim());
    } else if (currentSection) {
      currentSection.content.push(line.trim());
    } else {
      intro.push(line.trim());
    }
  });

  if (currentSection) {
    sections.push(currentSection);
  }

  return { intro, sections };
};
