import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { toast } from "sonner";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { PROFILE } from "../../data/portfolio";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const CONTACT_ENDPOINT = "https://formsubmit.co/ajax/bfc5c755b33ac9eafadda243b7e7fdbd";
const AIRPLANE_PATH =
  "M36 500 C6 414 62 338 174 320 C306 298 396 394 354 494 C314 588 166 574 104 486 C42 396 116 300 244 304 C382 310 430 514 560 520";

function ContactAirplane({ sectionRef }) {
  const pathRef = useRef(null);
  const ghostPathRef = useRef(null);
  const planeRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    const ghostPath = ghostPathRef.current;
    const plane = planeRef.current;
    const section = sectionRef.current;
    if (!path || !ghostPath || !plane || !section) return;

    const length = path.getTotalLength();
    const trail = Math.min(320, length * 0.42);
    gsap.set(ghostPath, {
      strokeDasharray: `${trail * 1.15} ${length}`,
      strokeDashoffset: length,
    });
    gsap.set(path, {
      strokeDasharray: `${trail} ${length}`,
      strokeDashoffset: length,
    });
    gsap.set(plane, {
      opacity: 0,
      scale: 0.9,
      transformOrigin: "50% 50%",
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 90%",
          end: "bottom top",
          scrub: 1.8,
        },
      });

      tl.to(ghostPath, { strokeDashoffset: -length, ease: "none" }, 0)
        .to(path, { strokeDashoffset: -length, ease: "none" }, 0.02)
        .to(plane, { opacity: 1, duration: 0.08 }, 0)
        .to(
          plane,
          {
            motionPath: {
              path,
              align: path,
              alignOrigin: [0.82, 0.5],
              autoRotate: true,
            },
            scale: 1.16,
            ease: "none",
          },
          0
        )
        .to(plane, { scale: 1.26, duration: 0.1, ease: "sine.inOut" }, 0.48)
        .to(plane, { scale: 1.1, duration: 0.1, ease: "sine.inOut" }, 0.58)
        .to(plane, { scale: 1.16, duration: 0.12, ease: "sine.out" }, 0.88)
        .to(plane, { rotation: 38, duration: 0.16, ease: "sine.out" }, 0.9);
    }, section);

    const refresh = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => {
      clearTimeout(refresh);
      ctx.revert();
    };
  }, [sectionRef]);

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 640 560"
      className="pointer-events-none absolute -left-40 -top-12 z-0 hidden h-[560px] w-[640px] lg:block"
    >
      <defs>
        <linearGradient id="planeWingA" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F7B3FF" />
          <stop offset="52%" stopColor="#8EDBFF" />
          <stop offset="100%" stopColor="#00B8FF" />
        </linearGradient>
        <linearGradient id="planeWingB" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F5A7F7" />
          <stop offset="100%" stopColor="#5B4AA0" />
        </linearGradient>
        <linearGradient id="planeWingC" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#DFA4FF" />
          <stop offset="100%" stopColor="#2D255F" />
        </linearGradient>
        <filter id="planeShadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="14" stdDeviation="12" floodColor="#5B4AA0" floodOpacity="0.22" />
        </filter>
      </defs>
      <path
        ref={ghostPathRef}
        d={AIRPLANE_PATH}
        fill="none"
        stroke="#E7C9BC"
        strokeWidth="1.35"
        strokeLinecap="round"
        opacity="0.88"
      />
      <path
        ref={pathRef}
        d={AIRPLANE_PATH}
        fill="none"
        stroke="#BF5537"
        strokeWidth="3.4"
        strokeLinecap="round"
        opacity="0.72"
      />
      <g ref={planeRef} filter="url(#planeShadow)">
        <g transform="translate(-72 -34) rotate(2)">
          <path d="M0 34 L166 0 L104 94 Z" fill="url(#planeWingA)" />
          <path d="M48 42 L166 0 L76 62 Z" fill="#F7F4ED" opacity="0.34" />
          <path d="M48 42 L104 94 L76 62 Z" fill="url(#planeWingB)" />
          <path d="M0 34 L48 42 L104 94 L42 58 Z" fill="url(#planeWingC)" opacity="0.94" />
          <path d="M48 42 L42 58 L76 62 Z" fill="#241B4D" opacity="0.35" />
          <path d="M0 34 L48 42 L166 0" fill="none" stroke="#F7F4ED" strokeOpacity="0.28" strokeWidth="2" />
        </g>
      </g>
    </svg>
  );
}

export default function Contact() {
  const sectionRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in your name, email and message.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        CONTACT_ENDPOINT,
        {
          name: form.name,
          visitor_email: form.email,
          subject: form.subject || "Portfolio contact form",
          message: form.message,
          _subject: form.subject
            ? `Portfolio message: ${form.subject}`
            : "New portfolio contact message",
          _template: "table",
          _captcha: "false",
          _honey: "",
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      toast.success("Message sent! Mansi will get back to you soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      const d = err?.response?.data?.detail;
      toast.error(typeof d === "string" ? d : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full bg-transparent border-b border-[rgba(27,26,22,0.25)] py-3 text-[#1B1A16] placeholder:text-[#9a9384] focus:border-[#BF5537] focus:outline-none transition-colors";

  return (
    <section ref={sectionRef} id="contact" data-testid="contact-section" className="relative py-28 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="relative isolate overflow-visible lg:pl-[8%]">
            <ContactAirplane sectionRef={sectionRef} />
            <p className="font-mono-accent text-xs tracking-[0.3em] uppercase text-[#BF5537] mb-6">(05) — Contact</p>
            <h2 className="relative z-10 font-serif-display font-light text-4xl sm:text-5xl lg:text-6xl text-[#1B1A16] leading-tight">
              Let's build something <span className="italic text-[#BF5537]">remarkable</span>.
            </h2>
            <p className="relative z-10 text-[#4a463d] mt-6 leading-relaxed max-w-md">
              Open to full-stack, cloud and DevOps roles — and collaborations that dare to be different.
            </p>

            <div className="relative z-10 mt-10 space-y-4">
              <a href={`mailto:${PROFILE.email}`} data-testid="contact-email-link" className="flex items-center gap-3 text-[#4a463d] hover:text-[#BF5537] transition-colors">
                <Mail className="w-4 h-4" /> <span className="font-mono-accent text-sm">{PROFILE.email}</span>
              </a>
              <a href={`tel:${PROFILE.phone}`} data-testid="contact-phone-link" className="flex items-center gap-3 text-[#4a463d] hover:text-[#BF5537] transition-colors">
                <Phone className="w-4 h-4" /> <span className="font-mono-accent text-sm">{PROFILE.phone}</span>
              </a>
              <div className="flex items-center gap-4 pt-4">
                <a href={PROFILE.github} target="_blank" rel="noreferrer" data-testid="contact-github-link" className="p-3 border border-[rgba(27,26,22,0.2)] hover:bg-[#1B1A16] hover:text-[#EFEBE3] transition-colors"><Github className="w-4 h-4" /></a>
                <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" data-testid="contact-linkedin-link" className="p-3 border border-[rgba(27,26,22,0.2)] hover:bg-[#1B1A16] hover:text-[#EFEBE3] transition-colors"><Linkedin className="w-4 h-4" /></a>
              </div>
            </div>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={submit}
            data-testid="contact-form"
            className="bg-[#F7F4ED] border border-[rgba(27,26,22,0.12)] p-8 space-y-6"
          >
            <div>
              <label className="font-mono-accent text-[10px] tracking-[0.2em] uppercase text-[#6E685B]">Name</label>
              <input data-testid="contact-input-name" value={form.name} onChange={update("name")} placeholder="Your name" className={inputCls} />
            </div>
            <div>
              <label className="font-mono-accent text-[10px] tracking-[0.2em] uppercase text-[#6E685B]">Email</label>
              <input data-testid="contact-input-email" type="email" value={form.email} onChange={update("email")} placeholder="you@email.com" className={inputCls} />
            </div>
            <div>
              <label className="font-mono-accent text-[10px] tracking-[0.2em] uppercase text-[#6E685B]">Subject</label>
              <input data-testid="contact-input-subject" value={form.subject} onChange={update("subject")} placeholder="What's this about?" className={inputCls} />
            </div>
            <div>
              <label className="font-mono-accent text-[10px] tracking-[0.2em] uppercase text-[#6E685B]">Message</label>
              <textarea data-testid="contact-input-message" value={form.message} onChange={update("message")} placeholder="Tell me about it..." rows={4} className={`${inputCls} resize-none`} />
            </div>
            <button type="submit" disabled={loading} data-testid="contact-submit-button" className="w-full font-mono-accent text-xs tracking-[0.2em] uppercase bg-[#1B1A16] text-[#EFEBE3] py-4 hover:bg-[#BF5537] transition-colors disabled:opacity-50">
              {loading ? "Sending..." : "Send Message"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
