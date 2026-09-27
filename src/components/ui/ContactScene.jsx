import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, MessageCircle, Phone, MapPin } from 'lucide-react';
import { CAFE_INFO } from '../../data/cafe';

export default function ContactScene() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = "Please enter your full name.";
    }
    if (!formData.phone.trim() || !/^\+?[0-9\s-]{8,15}$/.test(formData.phone.trim())) {
      errs.phone = "Please enter a valid phone number.";
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim() || formData.message.trim().length < 8) {
      errs.message = "Please write a message with at least 8 characters.";
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#C5A059', '#DFBA6A', '#FFF8EE', '#142344']
      });
    } catch {
      // confetti fallback
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 pointer-events-auto">
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-[#C5A059]/30 text-left">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Summary */}
          <div className="md:col-span-5 space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] font-medium block">
              Say Hello
            </span>
            <h3 className="text-3xl font-serif font-bold text-[#FFF8EE]">
              Connect with Brew Blue
            </h3>
            <p className="text-xs sm:text-sm text-[#E5D5C4]/80 leading-relaxed font-light">
              Whether you want to reserve a table for an evening gathering, plan a small celebration, or simply ask about our artisan brews, drop us a note.
            </p>

            <div className="pt-4 space-y-2.5 text-xs text-[#FFF8EE]/80">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A059]" />
                <span>+91 78780 63636</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A059]" />
                <span>Puthur, Tiruchirappalli, TN</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={CAFE_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-semibold hover:bg-emerald-600/40 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Chat Instantly on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Form */}
          <div className="md:col-span-7 bg-[#0E1A33]/70 p-6 rounded-2xl border border-white/5">
            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-serif font-bold text-[#FFF8EE]">
                  Message Prepared!
                </h4>
                <p className="text-xs text-[#E5D5C4]/80 max-w-sm mx-auto leading-relaxed">
                  Thank you, <span className="text-[#C5A059] font-medium">{formData.name}</span>. This portfolio demo validates your form inputs accurately. In production, this connects to the cafe's backend or triggers direct WhatsApp ordering.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', phone: '', email: '', message: '' });
                    }}
                    className="px-5 py-2 rounded-xl bg-[#142344] hover:bg-[#1E3462] border border-[#C5A059]/40 text-xs font-semibold text-[#FFF8EE] transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#C5A059] font-medium mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Karthik Ram"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1325] border border-white/10 text-xs text-[#FFF8EE] placeholder-white/30 focus:outline-none focus:border-[#C5A059]"
                  />
                  {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#C5A059] font-medium mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1325] border border-white/10 text-xs text-[#FFF8EE] placeholder-white/30 focus:outline-none focus:border-[#C5A059]"
                    />
                    {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#C5A059] font-medium mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="hello@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1325] border border-white/10 text-xs text-[#FFF8EE] placeholder-white/30 focus:outline-none focus:border-[#C5A059]"
                    />
                    {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#C5A059] font-medium mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you have in mind..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1325] border border-white/10 text-xs text-[#FFF8EE] placeholder-white/30 focus:outline-none focus:border-[#C5A059] resize-none"
                  />
                  {errors.message && <p className="text-[11px] text-red-400 mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#DFBA6A] to-[#C5A059] text-[#0B1325] font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#C5A059]/20 hover:shadow-[#C5A059]/40 transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
