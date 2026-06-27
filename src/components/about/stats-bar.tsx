import { STATS } from './contants';

export function StatsBar() {
  return (
    <section className="bg-[#E8DDD3] py-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {STATS.map((stat) => (
            <div key={stat.value}>
              <h3 className="text-4xl text-[#3C2D24]">{stat.value}</h3>

              <p className="mt-2 text-xs tracking-wide text-[#7D746D]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
