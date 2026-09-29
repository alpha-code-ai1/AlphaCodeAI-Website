import WhatsAppGlyph from './WhatsAppIcon';

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
