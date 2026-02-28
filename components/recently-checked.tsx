"use client";

const FAKE_USERS = [
  { name: "sofia.mtzz", seed: 9 },
  { name: "jessicaaarose", seed: 25 },
  { name: "mia.deluxx", seed: 32 },
  { name: "emma.redhot", seed: 47 },
  { name: "lina.urbanx", seed: 56 },
  { name: "chloe.sunsets", seed: 20 },
  { name: "vale.dreams", seed: 44 },
  { name: "giuli.vibes", seed: 60 },
  { name: "anna.dolcee", seed: 36 },
  { name: "chiara.lux", seed: 41 },
];

function UserCard({ name, seed }: { name: string; seed: number }) {
  return (
    <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-full px-4 py-2 shrink-0">
      <img
        src={`https://i.pravatar.cc/40?img=${seed}`}
        alt=""
        className="w-7 h-7 rounded-full object-cover"
      />
      <span className="text-white/70 text-sm font-mono whitespace-nowrap">
        @{name}
      </span>
    </div>
  );
}

function MarqueeRow({ users, reverse }: { users: typeof FAKE_USERS; reverse?: boolean }) {
  const direction = reverse ? "animate-[marqueeReverse_25s_linear_infinite]" : "animate-[marquee_25s_linear_infinite]";

  return (
    <div className="overflow-hidden w-screen">
      <div className={`flex gap-3 ${direction}`}>
        {/* Duplicate for seamless loop */}
        {[...users, ...users].map((user, i) => (
          <UserCard key={`${user.name}-${i}`} name={user.name} seed={user.seed} />
        ))}
      </div>
    </div>
  );
}

export function RecentlyChecked() {
  const firstRow = FAKE_USERS.slice(0, 7);
  const secondRow = [...FAKE_USERS.slice(5), ...FAKE_USERS.slice(0, 2)];

  return (
    <div className="w-screen space-y-4 mt-8">
      <p className="text-center text-white/30 text-xs font-mono tracking-[0.3em] uppercase">
        Recently checked
      </p>
      <div className="space-y-3">
        <MarqueeRow users={firstRow} />
        <MarqueeRow users={secondRow} reverse />
      </div>
    </div>
  );
}
