import styles from './GuideContent.module.css';

interface GuideContentProps {
  html: string;
}

export function GuideContent({ html }: GuideContentProps) {
  return (
    <div
      className={`${styles.content} mx-auto max-w-6xl px-4 pt-10 pb-4 sm:px-6`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
