import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { formatNumber } from "@/lib/utils";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 2000,
  className = "",
}: AnimatedCounterProps) {
  const { count, ref } = useAnimatedCounter(value, duration);

  return (
    <div ref={ref} className={className}>
      {prefix}{formatNumber(count)}{suffix}
    </div>
  );
}
