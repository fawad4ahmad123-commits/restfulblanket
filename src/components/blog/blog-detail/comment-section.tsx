'use client';

import { COMMENTS } from '../constants';
import CommentItem from './comment-item';

export default function CommentSection() {
  return (
    <section className="mx-auto mt-28 max-w-2xl">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="font-serif text-[32px] text-[#35281E]">
          Join the Conversation
        </h2>

        <span className="text-sm text-[#8B817A]">
          {COMMENTS.length} comments
        </span>
      </div>

      <div>
        {COMMENTS.map((comment) => (
          <CommentItem key={comment.id} {...comment} />
        ))}
      </div>

      <form className="mt-6 space-y-3">
        <input
          type="text"
          placeholder="Your name"
          className="h-11 w-full rounded-xl border border-[#E5DDD7] bg-white px-4 text-sm outline-none"
        />

        <textarea
          rows={4}
          placeholder="Share a thought..."
          className="w-full rounded-xl border border-[#E5DDD7] bg-white p-4 text-sm outline-none"
        />

        <button
          type="submit"
          className="rounded-full bg-[#35281E] px-6 py-3 text-sm text-white"
        >
          Post Comment
        </button>
      </form>
    </section>
  );
}
