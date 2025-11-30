import React from "react";
import { Activity, Heart, Stethoscope } from "lucide-react";

// Main Loader Component with multiple variants
export default function Loader({
  variant = "pulse",
  size = "md",
  fullScreen = false,
}) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  const loaderContent = (
    <div className="flex flex-col items-center justify-center space-y-4">
      {variant === "pulse" && <PulseLoader size={sizeClasses[size]} />}
      {variant === "heartbeat" && <HeartbeatLoader size={sizeClasses[size]} />}
      {variant === "medical" && <MedicalLoader size={sizeClasses[size]} />}
      {variant === "dots" && <DotsLoader size={size} />}
      {variant === "spinner" && <SpinnerLoader size={sizeClasses[size]} />}

      <p className="text-gray-600 text-sm font-medium animate-pulse">
        Loading...
      </p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50">
        {loaderContent}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full h-full min-h-screen">
      {loaderContent}
    </div>
  );
}

// Pulse Loader (Medical Cross)
function PulseLoader({ size }) {
  return (
    <div className="relative">
      <div
        className={`${size} bg-blue-600 rounded-lg flex items-center justify-center animate-pulse`}
      >
        <Activity className="w-2/3 h-2/3 text-white animate-pulse" />
      </div>
      <div className="absolute inset-0 bg-blue-400 rounded-lg animate-ping opacity-75"></div>
    </div>
  );
}

// Heartbeat Loader
function HeartbeatLoader({ size }) {
  return (
    <div className="relative">
      <Heart
        className={`${size} text-red-500 animate-pulse`}
        fill="currentColor"
        style={{
          animation: "heartbeat 1.2s ease-in-out infinite",
        }}
      />
      <style jsx>{`
        @keyframes heartbeat {
          0%,
          100% {
            transform: scale(1);
          }
          25% {
            transform: scale(1.1);
          }
          50% {
            transform: scale(1);
          }
          75% {
            transform: scale(1.15);
          }
        }
      `}</style>
    </div>
  );
}

// Medical Loader (Rotating Stethoscope)
function MedicalLoader({ size }) {
  return (
    <div className="relative">
      <div className="animate-spin">
        <Stethoscope className={`${size} text-blue-600`} />
      </div>
    </div>
  );
}

// Dots Loader
function DotsLoader({ size }) {
  const dotSize = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
    xl: "w-5 h-5",
  };

  return (
    <div className="flex space-x-2">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`${dotSize[size]} bg-blue-600 rounded-full animate-bounce`}
          style={{
            animationDelay: `${i * 0.15}s`,
            animationDuration: "0.6s",
          }}
        ></div>
      ))}
    </div>
  );
}

// Spinner Loader
function SpinnerLoader({ size }) {
  return (
    <div
      className={`${size} border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin`}
    ></div>
  );
}

// Demo Component showing all variants
export function LoaderDemo() {
  const [showFullScreen, setShowFullScreen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Hospital Loader Components
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Pulse Loader */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Pulse Loader
            </h3>
            <div className="flex justify-center py-8">
              <Loader variant="pulse" size="lg" />
            </div>
          </div>

          {/* Heartbeat Loader */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Heartbeat Loader
            </h3>
            <div className="flex justify-center py-8">
              <Loader variant="heartbeat" size="lg" />
            </div>
          </div>

          {/* Medical Loader */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Medical Loader
            </h3>
            <div className="flex justify-center py-8">
              <Loader variant="medical" size="lg" />
            </div>
          </div>

          {/* Dots Loader */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Dots Loader
            </h3>
            <div className="flex justify-center py-8">
              <Loader variant="dots" size="lg" />
            </div>
          </div>

          {/* Spinner Loader */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Spinner Loader
            </h3>
            <div className="flex justify-center py-8">
              <Loader variant="spinner" size="lg" />
            </div>
          </div>

          {/* Size Variations */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Size Variations
            </h3>
            <div className="flex justify-center items-center space-x-4 py-8">
              <Loader variant="pulse" size="sm" />
              <Loader variant="pulse" size="md" />
              <Loader variant="pulse" size="lg" />
            </div>
          </div>
        </div>

        {/* Full Screen Demo */}
        <div className="mt-8 bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Full Screen Loader
          </h3>
          <button
            onClick={() => {
              setShowFullScreen(true);
              setTimeout(() => setShowFullScreen(false), 3000);
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Show Full Screen Loader (3 seconds)
          </button>
        </div>

        {showFullScreen && <Loader variant="pulse" size="xl" fullScreen />}
      </div>
    </div>
  );
}
