import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { PROFILE } from "../../data/portfolio";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Contact() {
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
      await axios.post(`${API}/contact`, form);
      toast.success("Message sent! Mansi will get back to you soon. ✦");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full bg-transparent border-b border-white/20 py-3 text-white placeholder:text-zinc-600 focus:border-[#818cf8] focus:outline-none transition-colors";

  return (
    <section id="contact" data-testid="contact-section" className="relative py-28 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="lg:pl-[10%]">
            <p className="font-mono-accent text-xs tracking-[0.3em] uppercase text-[#818cf8] mb-6">// 07 — Contact</p>
            <h2 className="font-serif-display font-light text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
              Let's build something <span className="italic text-[#818cf8]">stellar</span>.
            </h2>
            <p className="text-zinc-400 mt-6 leading-relaxed max-w-md">
              Open to full-stack, cloud and DevOps roles — and collaborations that dare to be different.
            </p>

            <div className="mt-10 space-y-4">
              <a href={`mailto:${PROFILE.email}`} data-testid="contact-email-link" className="flex items-center gap-3 text-zinc-300 hover:text-[#818cf8] transition-colors">
                <Mail className="w-4 h-4" /> <span className="font-mono-accent text-sm">{PROFILE.email}</span>
              </a>
              <a href={`tel:${PROFILE.phone}`} data-testid="contact-phone-link" className="flex items-center gap-3 text-zinc-300 hover:text-[#818cf8] transition-colors">
                <Phone className="w-4 h-4" /> <span className="font-mono-accent text-sm">{PROFILE.phone}</span>
              </a>
              <div className="flex items-center gap-4 pt-4">
                <a href={PROFILE.github} target="_blank" rel="noreferrer" data-testid="contact-github-link" className="p-3 border border-white/15 hover:bg-white hover:text-black transition-colors">
                  <Github className="w-4 h-4" />
                </a>
                <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" data-testid="contact-linkedin-link" className="p-3 border border-white/15 hover:bg-white hover:text-black transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
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
            className="bg-white/[0.02] border border-white/[0.08] p-8 backdrop-blur-xl space-y-6"
          >
            <div>
              <label className="font-mono-accent text-[10px] tracking-[0.2em] uppercase text-zinc-500">Name</label>
              <input data-testid="contact-input-name" value={form.name} onChange={update("name")} placeholder="Your name" className={inputCls} />
            </div>
            <div>
              <label className="font-mono-accent text-[10px] tracking-[0.2em] uppercase text-zinc-500">Email</label>
              <input data-testid="contact-input-email" type="email" value={form.email} onChange={update("email")} placeholder="you@email.com" className={inputCls} />
            </div>
            <div>
              <label className="font-mono-accent text-[10px] tracking-[0.2em] uppercase text-zinc-500">Subject</label>
              <input data-testid="contact-input-subject" value={form.subject} onChange={update("subject")} placeholder="What's this about?" className={inputCls} />
            </div>
            <div>
              <label className="font-mono-accent text-[10px] tracking-[0.2em] uppercase text-zinc-500">Message</label>
              <textarea data-testid="contact-input-message" value={form.message} onChange={update("message")} placeholder="Tell me about it..." rows={4} className={`${inputCls} resize-none`} />
            </div>
            <button
              type="submit"
              disabled={loading}
              data-testid="contact-submit-button"
              className="w-full font-mono-accent text-xs tracking-[0.2em] uppercase bg-white text-black py-4 hover:bg-[#818cf8] transition-colors disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
