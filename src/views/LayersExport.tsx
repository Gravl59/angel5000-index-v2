import { PlatformLayersVisualization } from '../components/PlatformLayersVisualization';

export function LayersExport() {
  return (
    <div className="min-h-screen bg-white">
      <PlatformLayersVisualization />
      <div className="fixed bottom-4 right-4 text-xs text-gray-400">
        Tip: Use browser screenshot tools or print to PDF to export
      </div>
    </div>
  );
}
