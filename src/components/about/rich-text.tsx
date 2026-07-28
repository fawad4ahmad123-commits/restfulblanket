'use client';

import Link from 'next/link';
import { Fragment } from 'react';

const OLD_HOSTS = [
  'tapbookme.com',
  'restfulblanket.dk',
  'www.restfulblanket.dk',
];

const LINK_CLASSNAME =
  'font-semibold underline decoration-2 underline-offset-2 text-inherit hover:opacity-70 transition-opacity';

function resolveHref(href: string): { href: string; external: boolean } {
  try {
    const url = new URL(href);
    if (OLD_HOSTS.includes(url.hostname)) {
      return {
        href: `${url.pathname}${url.search}${url.hash}`,
        external: false,
      };
    }
    return { href, external: true };
  } catch {
    return { href, external: false };
  }
}

const LINK_REGEX = /\[([^\]]+)\]\(([^)]+)\)/g;

function renderLine(line: string, keyPrefix: string) {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  LINK_REGEX.lastIndex = 0;
  while ((match = LINK_REGEX.exec(line)) !== null) {
    const [full, label, rawHref] = match;

    if (match.index > lastIndex) {
      nodes.push(
        <Fragment key={`${keyPrefix}-t-${i}`}>
          {line.slice(lastIndex, match.index)}
        </Fragment>,
      );
    }

    const { href, external } = resolveHref(rawHref);

    if (external) {
      nodes.push(
        <a
          key={`${keyPrefix}-a-${i}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={LINK_CLASSNAME}
        >
          {label}
        </a>,
      );
    } else {
      nodes.push(
        <Link
          key={`${keyPrefix}-a-${i}`}
          href={href}
          className={LINK_CLASSNAME}
        >
          {label}
        </Link>,
      );
    }

    lastIndex = match.index + full.length;
    i += 1;
  }

  if (lastIndex < line.length) {
    nodes.push(
      <Fragment key={`${keyPrefix}-t-end`}>{line.slice(lastIndex)}</Fragment>,
    );
  }

  return nodes;
}

export function RichText({
  text,
  className,
  paragraphClassName,
}: {
  text: string;
  className?: string;
  paragraphClassName?: string;
}) {
  if (!text) return null;

  const paragraphs = text.split(/\n\n+/).filter(Boolean);

  return (
    <div className={className}>
      {paragraphs.map((paragraph, idx) => (
        <p key={idx} className={paragraphClassName}>
          {renderLine(paragraph, `p${idx}`)}
        </p>
      ))}
    </div>
  );
}
