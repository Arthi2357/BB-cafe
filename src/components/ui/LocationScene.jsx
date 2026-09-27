import { MapPin, Phone, ExternalLink, Navigation, Clock, Star } from 'lucide-react';
import { CAFE_INFO } from '../../data/cafe';

export default function LocationScene() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 pointer-events-auto">
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-[#C5A059]/30 relative overflow-hidden">
        {/* Background ambient gold gradient */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left: Location & Contact details */}
          <div className="space-y-6 text-left">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] font-medium block mb-2">
                Trichy Destination
              </span>
              <h3 className="text-3xl sm:text-4xl font-serif font-bold text-[#FFF8EE]">
                {CAFE_INFO.name}
              </h3>
              <p className="text-sm text-[#E5D5C4]/70 mt-1">
                Vayalur Main Road, Puthur, Tiruchirappalli
              </p>
            </div>

            {/* Address Info Box */}
            <div className="space-y-3.5 text-xs text-[#FFF8EE]/90">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#142344] border border-[#C5A059]/30 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#C5A059]" />
                </div>
                <div>
                  <p className="font-semibold text-[#FFF8EE]">Address</p>
                  <p className="text-[#E5D5C4]/80 leading-relaxed mt-0.5">
                    {CAFE_INFO.address.full}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#142344] border border-[#C5A059]/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-4 h-4 text-[#C5A059]" />
                </div>
                <div>
                  <p className="font-semibold text-[#FFF8EE]">Phone & Direct Inquiries</p>
                  <a
                    href={`tel:${CAFE_INFO.phoneRaw}`}
                    className="text-[#C5A059] hover:underline font-mono text-sm block mt-0.5"
                  >
                    {CAFE_INFO.phone}
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#142344] border border-[#C5A059]/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-[#C5A059]" />
                </div>
                <div>
                  <p className="font-semibold text-[#FFF8EE]">Cafe Hours</p>
                  <p className="text-[#E5D5C4]/80 mt-0.5">
                    {CAFE_INFO.hours}
                  </p>
                </div>
              </div>
            </div>

            {/* Required Action Buttons: GET DIRECTIONS and CALL CAFE */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={CAFE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#DFBA6A] to-[#C5A059] text-[#0B1325] font-bold text-xs tracking-wider uppercase flex items-center gap-2 shadow-lg shadow-[#C5A059]/20 hover:shadow-[#C5A059]/40 transition-all transform hover:-translate-y-0.5"
              >
                <Navigation className="w-4 h-4" />
                <span>GET DIRECTIONS</span>
              </a>

              <a
                href={`tel:${CAFE_INFO.phoneRaw}`}
                className="px-6 py-3.5 rounded-full bg-[#142344] hover:bg-[#1E3462] border border-[#C5A059]/40 text-[#FFF8EE] font-semibold text-xs tracking-wider uppercase flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <Phone className="w-4 h-4 text-[#C5A059]" />
                <span>CALL CAFE</span>
              </a>
            </div>
          </div>

          {/* Right: WHAT GUESTS ARE SAYING & Public Listing Hub */}
          <div className="p-6 rounded-2xl bg-[#0E1A33]/80 border border-white/5 space-y-5 text-left">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-medium block mb-1">
                Guest Community
              </span>
              <h4 className="text-xl font-serif font-bold text-[#FFF8EE]">
                WHAT GUESTS ARE SAYING
              </h4>
            </div>

            <p className="text-xs text-[#E5D5C4]/80 leading-relaxed">
              We value genuine guest feedback and love hearing about your coffee conversations, favorite bites, and cozy moments at Brew Blue Cafe in Puthur.
            </p>

            <div className="p-4 rounded-xl bg-[#0B1325] border border-white/10 space-y-2">
              <div className="flex items-center gap-1 text-[#FFD166]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#FFD166]" />
                ))}
              </div>
              <p className="text-xs text-[#FFF8EE]/90 font-medium">
                Verified Google Business Reviews
              </p>
              <p className="text-[11px] text-[#E5D5C4]/60">
                Read direct guest ratings, customer reviews, and community impressions on our public Google Maps listing.
              </p>
            </div>

            {/* Per prompt: Provide "VIEW REVIEWS" linking to cafe public listing */}
            <a
              href={CAFE_INFO.reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-[#142344] hover:bg-[#1E3462] border border-[#C5A059]/40 text-[#FFF8EE] text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-colors group"
            >
              <span>VIEW REVIEWS</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#C5A059] transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
