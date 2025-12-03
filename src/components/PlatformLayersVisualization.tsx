import { Radio, Activity, Shield, Scale, ShoppingBag } from 'lucide-react';

export function PlatformLayersVisualization() {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8 overflow-hidden">
      <div className="relative w-full max-w-6xl h-[700px]">

        {/* Layer 1: Storefront (Leftmost/Bottom) */}
        <div
          className="absolute w-[350px] h-[500px] rounded-xl shadow-2xl"
          style={{
            left: '100px',
            top: '200px',
            backgroundColor: 'rgba(147, 197, 253, 0.25)',
            border: '2px solid rgba(147, 197, 253, 0.6)',
            transform: 'perspective(1500px) rotateY(25deg) rotateZ(45deg)',
            transformStyle: 'preserve-3d',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}
        >
          <div className="absolute bottom-8 left-6">
            <ShoppingBag className="w-10 h-10 text-blue-600" strokeWidth={1.5} />
          </div>
        </div>

        {/* Layer 2: Firehose (Metadata) */}
        <div
          className="absolute w-[350px] h-[500px] rounded-xl shadow-2xl"
          style={{
            left: '300px',
            top: '100px',
            backgroundColor: 'rgba(165, 180, 252, 0.25)',
            border: '2px solid rgba(165, 180, 252, 0.6)',
            transform: 'perspective(1500px) rotateY(25deg) rotateZ(45deg)',
            transformStyle: 'preserve-3d',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}
        >
          <div className="absolute bottom-8 left-6">
            <Radio className="w-10 h-10 text-indigo-600" strokeWidth={1.5} />
          </div>
        </div>

        {/* Layer 3: Operations */}
        <div
          className="absolute w-[350px] h-[500px] rounded-xl shadow-2xl"
          style={{
            left: '500px',
            top: '0px',
            backgroundColor: 'rgba(196, 181, 253, 0.25)',
            border: '2px solid rgba(196, 181, 253, 0.6)',
            transform: 'perspective(1500px) rotateY(25deg) rotateZ(45deg)',
            transformStyle: 'preserve-3d',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}
        >
          <div className="absolute bottom-8 left-6">
            <Activity className="w-10 h-10 text-violet-600" strokeWidth={1.5} />
          </div>
        </div>

        {/* Layer 4: Governance */}
        <div
          className="absolute w-[350px] h-[500px] rounded-xl shadow-2xl"
          style={{
            left: '700px',
            top: '-100px',
            backgroundColor: 'rgba(216, 180, 254, 0.25)',
            border: '2px solid rgba(216, 180, 254, 0.6)',
            transform: 'perspective(1500px) rotateY(25deg) rotateZ(45deg)',
            transformStyle: 'preserve-3d',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}
        >
          <div className="absolute bottom-8 left-6">
            <Shield className="w-10 h-10 text-purple-600" strokeWidth={1.5} />
          </div>
        </div>

        {/* Layer 5: Licensing (Rightmost/Topmost) */}
        <div
          className="absolute w-[350px] h-[500px] rounded-xl shadow-2xl"
          style={{
            left: '900px',
            top: '-200px',
            backgroundColor: 'rgba(167, 243, 208, 0.25)',
            border: '2px solid rgba(167, 243, 208, 0.6)',
            transform: 'perspective(1500px) rotateY(25deg) rotateZ(45deg)',
            transformStyle: 'preserve-3d',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}
        >
          <div className="absolute bottom-8 left-6">
            <Scale className="w-10 h-10 text-emerald-600" strokeWidth={1.5} />
          </div>
        </div>

      </div>
    </div>
  );
}
