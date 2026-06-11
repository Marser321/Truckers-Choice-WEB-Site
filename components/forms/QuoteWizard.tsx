"use client";

import { FormEvent, useState } from "react";
import { useLocale } from "next-intl";
import { ArrowLeft, ArrowRight, Check, Phone } from "lucide-react";
import { locations, services, localize } from "@/lib/content";
import { LeadDraft, mockLeadSubmissionAdapter } from "@/lib/leads";

const emptyLead: LeadDraft = {
  need: "",
  operationType: "",
  state: "",
  units: "",
  name: "",
  phone: "",
  email: "",
  preferredLanguage: "en",
};

export function QuoteWizard() {
  const locale = useLocale();
  const lang = locale === "es" ? "es" : "en";
  const [step, setStep] = useState(0);
  const [lead, setLead] = useState<LeadDraft>({ ...emptyLead, preferredLanguage: lang });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const valid = [
    Boolean(lead.need),
    Boolean(lead.operationType && lead.state && lead.units),
    Boolean(lead.name && lead.phone),
  ][step];

  const update = (key: keyof LeadDraft, value: string) => setLead((current) => ({ ...current, [key]: value }));

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (step < 2) {
      if (valid) setStep((value) => value + 1);
      return;
    }
    if (!valid) return;
    setSubmitting(true);
    const result = await mockLeadSubmissionAdapter.submit(lead);
    setSubmitting(false);
    if (result.ok) setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-[2rem] border border-accent/30 bg-accent/5 p-8 md:p-12">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-background"><Check className="h-5 w-5" /></div>
        <h2 className="type-subsection mt-7 text-4xl text-text">{lang === "es" ? "El recorrido funciona." : "The flow works."}</h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-text-muted">
          {lang === "es"
            ? "Esta versión es una demostración: tus datos no fueron guardados ni enviados. Para hablar ahora, llama a nuestra oficina de Medley."
            : "This is a preview: your information was not stored or transmitted. To speak now, call our Medley office."}
        </p>
        <a href={`tel:${locations[0].phoneRaw}`} className="mt-7 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-4 text-sm font-bold text-background"><Phone className="h-4 w-4" />{locations[0].phone}</a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-[2rem] border border-white/10 bg-surface/50 p-6 md:p-10">
      <div className="mb-8 flex gap-2" aria-label={lang === "es" ? "Progreso" : "Progress"}>
        {[0, 1, 2].map((index) => <span key={index} className={`h-1.5 flex-1 rounded-full ${index <= step ? "bg-accent" : "bg-white/10"}`} />)}
      </div>

      {step === 0 && (
        <fieldset>
          <legend className="type-card text-3xl text-text">{lang === "es" ? "¿Qué necesitas resolver?" : "What do you need to solve?"}</legend>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {services.map((service) => (
              <button key={service.slug} type="button" onClick={() => update("need", service.slug)} className={`rounded-2xl border p-4 text-left text-sm font-semibold transition-colors ${lead.need === service.slug ? "border-accent bg-accent/10 text-text" : "border-white/10 text-text-muted hover:border-white/25"}`}>
                {localize(service.title, locale)}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {step === 1 && (
        <fieldset>
          <legend className="type-card text-3xl text-text">{lang === "es" ? "Cuéntanos sobre la operación." : "Tell us about the operation."}</legend>
          <div className="mt-7 grid gap-5">
            <label className="grid gap-2 text-xs font-bold uppercase tracking-wider text-text-muted">
              {lang === "es" ? "Tipo de operación" : "Operation type"}
              <select value={lead.operationType} onChange={(event) => update("operationType", event.target.value)} className="rounded-xl border border-white/10 bg-[#080d18] px-4 py-4 text-sm font-medium normal-case tracking-normal text-text">
                <option value="">{lang === "es" ? "Seleccionar" : "Select"}</option>
                <option value="new">{lang === "es" ? "Nueva operación" : "New operation"}</option>
                <option value="existing">{lang === "es" ? "Operación existente" : "Existing operation"}</option>
                <option value="renewal">{lang === "es" ? "Renovación / corrección" : "Renewal / correction"}</option>
              </select>
            </label>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-xs font-bold uppercase tracking-wider text-text-muted">{lang === "es" ? "Estado base" : "Base state"}<input value={lead.state} onChange={(event) => update("state", event.target.value)} className="rounded-xl border border-white/10 bg-[#080d18] px-4 py-4 text-sm font-medium normal-case tracking-normal text-text" placeholder="FL" /></label>
              <label className="grid gap-2 text-xs font-bold uppercase tracking-wider text-text-muted">{lang === "es" ? "Número de unidades" : "Number of units"}<input value={lead.units} onChange={(event) => update("units", event.target.value)} inputMode="numeric" className="rounded-xl border border-white/10 bg-[#080d18] px-4 py-4 text-sm font-medium normal-case tracking-normal text-text" placeholder="1" /></label>
            </div>
          </div>
        </fieldset>
      )}

      {step === 2 && (
        <fieldset>
          <legend className="type-card text-3xl text-text">{lang === "es" ? "¿Cómo podemos contactarte?" : "How can we reach you?"}</legend>
          <div className="mt-7 grid gap-5">
            <label className="grid gap-2 text-xs font-bold uppercase tracking-wider text-text-muted">{lang === "es" ? "Nombre" : "Name"}<input value={lead.name} onChange={(event) => update("name", event.target.value)} autoComplete="name" className="rounded-xl border border-white/10 bg-[#080d18] px-4 py-4 text-sm font-medium normal-case tracking-normal text-text" /></label>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-xs font-bold uppercase tracking-wider text-text-muted">{lang === "es" ? "Teléfono" : "Phone"}<input value={lead.phone} onChange={(event) => update("phone", event.target.value)} autoComplete="tel" inputMode="tel" className="rounded-xl border border-white/10 bg-[#080d18] px-4 py-4 text-sm font-medium normal-case tracking-normal text-text" /></label>
              <label className="grid gap-2 text-xs font-bold uppercase tracking-wider text-text-muted">Email <span className="text-[9px] font-normal normal-case tracking-normal">({lang === "es" ? "opcional" : "optional"})</span><input value={lead.email} onChange={(event) => update("email", event.target.value)} autoComplete="email" type="email" className="rounded-xl border border-white/10 bg-[#080d18] px-4 py-4 text-sm font-medium normal-case tracking-normal text-text" /></label>
            </div>
            <p className="rounded-xl border border-blue-400/20 bg-blue-400/5 p-4 text-xs leading-relaxed text-text-muted">
              {lang === "es" ? "Modo demostración: este formulario no almacena ni transmite información." : "Preview mode: this form does not store or transmit information."}
            </p>
          </div>
        </fieldset>
      )}

      <div className="mt-9 flex items-center justify-between gap-3 border-t border-white/8 pt-6">
        <button type="button" onClick={() => setStep((value) => Math.max(0, value - 1))} disabled={step === 0} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-xs font-bold text-text disabled:opacity-25"><ArrowLeft className="h-4 w-4" />{lang === "es" ? "Atrás" : "Back"}</button>
        <button type="submit" disabled={!valid || submitting} className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-xs font-bold text-background disabled:cursor-not-allowed disabled:opacity-40">
          {submitting ? (lang === "es" ? "Procesando…" : "Processing…") : step === 2 ? (lang === "es" ? "Probar envío" : "Test submission") : (lang === "es" ? "Continuar" : "Continue")} <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
