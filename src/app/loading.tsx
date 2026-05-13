export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0A0A0A]">
      <div className="flex flex-col items-center gap-6">
        <span className="font-[family-name:var(--font-cormorant)] text-4xl font-bold text-[#E5E4E2] animate-pulse">
          V3
        </span>
        <div className="h-[2px] w-32 overflow-hidden bg-white/10 rounded-full">
          <div className="h-full w-full bg-[#E5E4E2] animate-[scale-x_1s_ease-in-out_infinite_alternate]" />
        </div>
      </div>
    </div>
  );
}
