import Image from 'next/image';

interface CommentItemProps {
  name: string;
  date: string;
  avatar: string;
  comment: string;
}

export default function CommentItem({
  name,
  date,
  avatar,
  comment,
}: CommentItemProps) {
  return (
    <div className="border-b border-[#E8DED6] py-5">
      <div className="flex gap-3">
        <div className="h-[34px] w-[34px] flex-shrink-0 overflow-hidden rounded-full">
          <Image
            src={avatar}
            alt={name}
            width={34}
            height={34}
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-[#35281E]">{name}</span>

            <span className="text-xs text-[#8B817A]">{date}</span>
          </div>

          <p className="mt-2 text-[13px] leading-6 text-[#5D534C]">{comment}</p>
        </div>
      </div>
    </div>
  );
}
