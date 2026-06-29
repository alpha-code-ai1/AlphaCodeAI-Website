const WhatsAppGlyph = (props) => (
  <svg viewBox="0 0 32 32" fill="currentColor" {...props}>
    <path d="M16.003 0h-.006C7.165 0 .004 7.163.004 16c0 3.49 1.123 6.726 3.034 9.36L1.06 31.94l6.77-2.165A15.9 15.9 0 0 0 16.003 32C24.84 32 32 24.836 32 16S24.84 0 16.003 0zm9.318 22.61c-.387 1.092-1.922 1.998-3.146 2.262-.837.178-1.93.32-5.61-1.205-4.706-1.95-7.737-6.73-7.973-7.04-.226-.31-1.91-2.543-1.91-4.85 0-2.31 1.18-3.443 1.654-3.927.39-.397.857-.578 1.346-.578.16 0 .302.008.43.014.387.017.58.04.836.652.318.768 1.094 2.66 1.187 2.853.094.193.157.42.03.677-.12.258-.18.418-.36.643-.18.226-.378.502-.54.674-.18.193-.367.402-.158.762.21.36.93 1.534 1.997 2.485 1.378 1.228 2.523 1.61 2.91 1.77.29.12.63.094.853-.16.282-.323.616-.857.95-1.39.227-.354.51-.398.836-.275.327.12 2.073.978 2.43 1.155.357.178.594.265.683.413.09.146.09.85-.297 1.94z" />
  </svg>
);

// Site-wide floating button that opens WhatsApp chat directly.
const FloatingWhatsApp = () => (
  <a
    href="https://wa.me/918850313109"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-6px_rgba(37,211,102,0.7)] transition-transform hover:scale-110"
  >
    {/* Pulsing ring */}
    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-50" />

    {/* Hover tooltip (desktop) */}
    <span className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 sm:block">
      Chat on WhatsApp
    </span>

    <WhatsAppGlyph className="relative h-7 w-7" />
  </a>
);

export default FloatingWhatsApp;
