export default function CinematicBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#faf9fe]"
      style={{
        background: `radial-gradient(ellipse 120% 90% at 50% 15%, #ffffff 0%, #f7f6fc 45%, #eff2fa 100%)`,
      }}
    >
      {/* Top Ethereal Silk Wave 1 (Lavender Ribbon swooping from top right across center) */}
      <svg
        className="absolute top-0 right-0 w-[110vw] h-[110vh] opacity-75 mix-blend-multiply pointer-events-none"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M200 -50 C600 150 900 80 1440 320 L1440 -100 L200 -100 Z"
          fill="url(#topLavenderSilk)"
        />
        <path
          d="M-50 280 C400 480 850 150 1500 420 L1500 900 L-50 900 Z"
          fill="url(#midSilkFlow)"
          opacity="0.5"
        />
        <defs>
          <linearGradient id="topLavenderSilk" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ede6fc" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#e0e8fd" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#d2e3fa" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="midSilkFlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f3effd" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#e3ebfc" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Luminous Curved Horizon Wave across bottom of Hero / Experience */}
      <svg
        className="absolute top-[35vh] -left-20 w-[125vw] h-[90vh] opacity-60 mix-blend-multiply pointer-events-none"
        viewBox="0 0 1440 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M-100 420 C350 220 900 520 1540 260 L1540 800 L-100 800 Z"
          fill="url(#softBlueSwoop)"
        />
        <defs>
          <linearGradient id="softBlueSwoop" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#dce8fd" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#e8e3fd" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
