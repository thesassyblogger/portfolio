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
    <section id="contact" data-testid="contact-section" className="relative py-28 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="lg:pl-[8%]">
            <p className="font-mono-accent text-xs tracking-[0.3em] uppercase text-[#BF5537] mb-6">(05) — Contact</p>
            <h2 className="font-serif-display font-light text-4xl sm:text-5xl lg:text-6xl text-[#1B1A16] leading-tight">
              Let's build something <span className="italic text-[#BF5537]">remarkable</span>.
            </h2>
            <p className="text-[#4a463d] mt-6 leading-relaxed max-w-md">
              Open to full-stack, cloud and DevOps roles — and collaborations that dare to be different.
            </p>

            <div className="mt-10 space-y-4">
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
