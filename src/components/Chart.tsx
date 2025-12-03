interface BarChartProps {
  data: { label: string; value: number; color?: string }[];
  height?: number;
}

export function BarChart({ data, height = 300 }: BarChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="w-full" style={{ height }}>
      <div className="flex items-end justify-between h-full space-x-2">
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * 100;
          return (
            <div key={index} className="flex-1 flex flex-col items-center justify-end h-full">
              <div className="w-full flex flex-col items-center justify-end h-full pb-8">
                <div className="text-xs text-gray-700 mb-1 font-medium">{item.value}</div>
                <div
                  className={`w-full ${item.color || 'bg-blue-600'} transition-all`}
                  style={{ height: `${barHeight}%` }}
                />
              </div>
              <div className="text-xs text-gray-600 text-center mt-2 max-w-full px-1 break-words">
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface DonutChartProps {
  data: { label: string; value: number; color: string }[];
  size?: number;
}

interface ChartProps {
  data: { [key: string]: any }[];
  xKey: string;
  yKey: string;
  title?: string;
  height?: number;
}

export function Chart({ data, xKey, yKey, title, height = 300 }: ChartProps) {
  const maxValue = Math.max(...data.map(d => d[yKey]));

  return (
    <div className="w-full">
      {title && <h4 className="text-sm font-medium text-gray-700 mb-4">{title}</h4>}
      <div className="w-full" style={{ height }}>
        <div className="flex items-end justify-between h-full space-x-2">
          {data.map((item, index) => {
            const barHeight = (item[yKey] / maxValue) * 100;
            return (
              <div key={index} className="flex-1 flex flex-col items-center justify-end h-full">
                <div className="w-full flex flex-col items-center justify-end h-full pb-8">
                  <div
                    className="w-full bg-blue-600 transition-all relative"
                    style={{ height: `${barHeight}%` }}
                  >
                    <div className="absolute top-2 left-0 right-0 text-center text-sm font-semibold text-white">
                      {item[yKey]}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-600 text-center mt-2 max-w-full px-1 break-words whitespace-pre-line">
                  {item[xKey]}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function DonutChart({ data, size = 200 }: DonutChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = -90;

  const segments = data.map(item => {
    const percentage = (item.value / total) * 100;
    const angle = (percentage / 100) * 360;
    const startAngle = currentAngle;
    currentAngle += angle;

    return {
      ...item,
      percentage,
      startAngle,
      endAngle: currentAngle,
    };
  });

  const radius = size / 2;
  const innerRadius = radius * 0.6;

  const polarToCartesian = (angle: number, r: number) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: radius + r * Math.cos(rad),
      y: radius + r * Math.sin(rad),
    };
  };

  return (
    <div className="flex items-center gap-8">
      <svg width={size} height={size} className="flex-shrink-0">
        {segments.map((segment, index) => {
          const start = polarToCartesian(segment.startAngle, radius);
          const end = polarToCartesian(segment.endAngle, radius);
          const innerStart = polarToCartesian(segment.endAngle, innerRadius);
          const innerEnd = polarToCartesian(segment.startAngle, innerRadius);

          const largeArc = segment.percentage > 50 ? 1 : 0;

          const path = [
            `M ${start.x} ${start.y}`,
            `A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`,
            `L ${innerStart.x} ${innerStart.y}`,
            `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${innerEnd.x} ${innerEnd.y}`,
            'Z',
          ].join(' ');

          return <path key={index} d={path} fill={segment.color} />;
        })}
      </svg>

      <div className="space-y-2">
        {segments.map((segment, index) => (
          <div key={index} className="flex items-center gap-3">
            <div
              className="w-4 h-4 flex-shrink-0"
              style={{ backgroundColor: segment.color }}
            />
            <div className="text-sm">
              <div className="text-gray-900 font-medium">{segment.label}</div>
              <div className="text-gray-500">{segment.value} ({segment.percentage.toFixed(1)}%)</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
