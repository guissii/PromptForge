import { FRAMEWORKS } from '@/types';
import type { Framework } from '@/types';

interface FrameworkBadgeProps {
  framework: Framework;
}

export function FrameworkBadge({ framework }: FrameworkBadgeProps) {
  const config = FRAMEWORKS[framework];
  
  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full font-space text-[11px] font-bold uppercase tracking-wider border"
      style={{
        color: config.color,
        borderColor: config.color,
        backgroundColor: `${config.color}15`,
      }}
    >
      {config.name}
    </span>
  );
}
