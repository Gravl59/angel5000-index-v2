export function StatementFlowVisualization() {
  return (
    <div className="w-full bg-white flex items-center justify-center py-16">
      <div className="relative w-[600px] h-[400px]">
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
          <defs>
            <marker
              id="hollowDiamond"
              markerWidth="16"
              markerHeight="16"
              refX="8"
              refY="8"
              orient="auto"
            >
              <path
                d="M 4 8 L 8 4 L 12 8 L 8 12 Z"
                fill="white"
                stroke="black"
                strokeWidth="1.5"
              />
            </marker>
            <marker
              id="hollowTriangle"
              markerWidth="16"
              markerHeight="16"
              refX="12"
              refY="8"
              orient="auto"
            >
              <path
                d="M 4 4 L 12 8 L 4 12 Z"
                fill="white"
                stroke="black"
                strokeWidth="1.5"
              />
            </marker>
            <marker
              id="filledCircle"
              markerWidth="12"
              markerHeight="12"
              refX="6"
              refY="6"
              orient="auto"
            >
              <circle cx="6" cy="6" r="5" fill="black" />
            </marker>
            <marker
              id="filledTriangle"
              markerWidth="16"
              markerHeight="16"
              refX="12"
              refY="8"
              orient="auto"
            >
              <path
                d="M 4 4 L 12 8 L 4 12 Z"
                fill="black"
                stroke="black"
                strokeWidth="1"
              />
            </marker>
          </defs>

          <path
            d="M 180 120 L 220 120 L 220 50 L 260 50"
            fill="none"
            stroke="black"
            strokeWidth="2.5"
            markerEnd="url(#hollowDiamond)"
          />

          <path
            d="M 180 120 L 300 120 L 300 160"
            fill="none"
            stroke="black"
            strokeWidth="2.5"
            markerEnd="url(#filledCircle)"
          />

          <path
            d="M 180 120 L 300 120 L 300 220"
            fill="none"
            stroke="black"
            strokeWidth="2.5"
            markerEnd="url(#filledTriangle)"
          />

          <path
            d="M 180 120 L 220 120 L 220 320 L 260 320"
            fill="none"
            stroke="black"
            strokeWidth="2.5"
            markerEnd="url(#hollowTriangle)"
          />
        </svg>

        <div className="absolute left-0 top-[100px]">
          <div className="px-6 py-3 bg-gradient-to-br from-green-100 to-green-200 border border-green-300">
            <span className="text-lg font-medium text-gray-900">A causes B</span>
          </div>
        </div>

        <div className="absolute left-[260px] top-[20px]">
          <div className="px-6 py-3 bg-gradient-to-br from-green-100 to-green-200 border border-green-300">
            <span className="text-lg font-medium text-gray-900">A causes H if B is red</span>
          </div>
        </div>

        <div className="absolute left-[300px] top-[140px]">
          <div className="px-6 py-3 bg-gradient-to-br from-cyan-100 to-cyan-200 border border-cyan-300">
            <span className="text-lg font-medium text-gray-900">B is red</span>
          </div>
        </div>

        <div className="absolute left-[300px] top-[200px]">
          <div className="px-6 py-3 bg-gradient-to-br from-purple-100 to-purple-200 border border-purple-300">
            <span className="text-lg font-medium text-gray-900">B may cause D</span>
          </div>
        </div>

        <div className="absolute left-[260px] top-[300px]">
          <div className="px-6 py-3 rounded-full bg-gradient-to-br from-red-100 to-red-200 border border-red-300">
            <span className="text-lg font-medium text-gray-900">B causes C</span>
          </div>
        </div>
      </div>
    </div>
  );
}
