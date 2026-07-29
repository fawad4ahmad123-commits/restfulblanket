import SignupOffer from '@/src/components/discout-baner';
import { getExperts } from '@/src/lib/expert';

export default async function DIscountPage() {
  const slug = '/sign-up-for-restfulblanket';
  const data = await getExperts(slug);
  return <SignupOffer data={data} />;
}
