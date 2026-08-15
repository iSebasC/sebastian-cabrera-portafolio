import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, Phone, MapPin, MessageCircle, CheckCircle, X, Loader2, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { isProduction } from '../config/email';

interface ContactSectionProps {
  portfolioMode?: 'employee' | 'freelance';
  headingLevel?: 'h1' | 'h2';
  headerVariant?: 'default' | 'magazine';
  showHeading?: boolean;
}

export function ContactSection({
  portfolioMode = 'freelance',
  headingLevel = 'h2',
  headerVariant = 'default',
  showHeading = true,
}: ContactSectionProps) {
  const { t } = useTranslation();

  const baseContactInfo = [
    {
      icon: Mail,
      label: t('contact.info.emailLabel'),
      value: 'sebastiandev@sebastiancabreraalcala.com',
      href: 'mailto:sebastiandev@sebastiancabreraalcala.com',
      truncate: true,
    },
    {
      icon: Phone,
      label: t('contact.info.phoneLabel'),
      value: portfolioMode === 'employee' ? '+51 993 106 111' : '+51 914 866 361',
      href: portfolioMode === 'employee' ? 'tel:+51993106111' : 'tel:+51914866361',
    },
    {
      icon: MapPin,
      label: t('contact.info.locationLabel'),
      value: t('contact.info.locationValue'),
      href: '#',
    },
  ];

  const contactInfo =
    portfolioMode === 'employee'
      ? [
          ...baseContactInfo,
          {
            icon: Linkedin,
            label: 'LinkedIn',
            value: 'linkedin.com/in/sebastian-cabrera-alcala',
            href: 'https://linkedin.com/in/sebastian-cabrera-alcala',
            truncate: true,
          },
        ]
      : baseContactInfo;

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const HeadingTag = headingLevel as 'h1' | 'h2';
  const magazineNumber = portfolioMode === 'freelance' ? '06' : '05';

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = t('contact.form.validation.nameRequired');
    else if (formData.name.trim().length < 2) newErrors.name = t('contact.form.validation.nameMinLength');
    if (!formData.email.trim()) newErrors.email = t('contact.form.validation.emailRequired');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = t('contact.form.validation.emailInvalid');
    if (!formData.subject.trim()) newErrors.subject = t('contact.form.validation.subjectRequired');
    else if (formData.subject.trim().length < 3) newErrors.subject = t('contact.form.validation.subjectMinLength');
    if (!formData.message.trim()) newErrors.message = t('contact.form.validation.messageRequired');
    else if (formData.message.trim().length < 10) newErrors.message = t('contact.form.validation.messageMinLength');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      if (isProduction()) {
        const netlifyFormData = new FormData();
        netlifyFormData.append('form-name', 'contact');
        netlifyFormData.append('bot-field', '');
        netlifyFormData.append('name', formData.name);
        netlifyFormData.append('email', formData.email);
        netlifyFormData.append('subject', formData.subject);
        netlifyFormData.append('message', formData.message);
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(netlifyFormData as any).toString(),
        });
        if (!response.ok) throw new Error(`Error ${response.status}`);
      } else {
        console.log('📧 Formulario (dev):', { ...formData, timestamp: new Date().toISOString() });
        await new Promise((r) => setTimeout(r, 1000));
      }
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 5000);
    } catch {
      const msg = isProduction()
        ? 'Error al enviar. Intenta nuevamente o contáctame directamente.'
        : 'Formulario en modo desarrollo. Datos en consola.';
      alert(msg);
      if (!isProduction()) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', subject: '', message: '' });
        }, 5000);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Campo reutilizable ── */
  const Field = ({
    id,
    label,
    error,
    children,
  }: {
    id: string;
    label: string;
    error?: string;
    children: React.ReactNode;
  }) => (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );

  /* ── Formulario ── */
  const FormContent = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="min-w-0"
    >
      {showHeading && (
        <div className="mb-8 space-y-1">
          <h3 className="text-2xl font-bold">
            {portfolioMode === 'employee' ? t('contact.form.opportunitiesTitle') : t('contact.form.conversationTitle')}
          </h3>
          <p className="text-muted-foreground text-sm">
            {portfolioMode === 'employee' ? t('contact.form.opportunitiesDescription') : t('contact.form.conversationDescription')}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="bot-field" style={{ display: 'none' }} />

        <div className="grid sm:grid-cols-2 gap-4">
          <Field id="name" label={t('contact.form.nameLabel')} error={errors.name}>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder={t('contact.form.namePlaceholder')}
              className={`h-11 rounded-xl border-border/60 bg-background ${errors.name ? 'border-red-500' : ''}`}
            />
          </Field>

          <Field id="email" label={t('contact.form.emailLabel')} error={errors.email}>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder={t('contact.form.emailPlaceholder')}
              className={`h-11 rounded-xl border-border/60 bg-background ${errors.email ? 'border-red-500' : ''}`}
            />
          </Field>
        </div>

        <Field
          id="subject"
          label={portfolioMode === 'employee' ? t('contact.form.subjectLabelEmployee') : t('contact.form.subjectLabel')}
          error={errors.subject}
        >
          <Input
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
            placeholder={
              portfolioMode === 'employee'
                ? t('contact.form.subjectPlaceholderEmployee')
                : t('contact.form.subjectPlaceholder')
            }
            className={`h-11 rounded-xl border-border/60 bg-background ${errors.subject ? 'border-red-500' : ''}`}
          />
        </Field>

        <Field id="message" label={t('contact.form.messageLabel')} error={errors.message}>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={5}
            placeholder={
              portfolioMode === 'employee'
                ? t('contact.form.messagePlaceholderEmployee')
                : t('contact.form.messagePlaceholder')
            }
            className={`rounded-xl border-border/60 bg-background resize-none ${errors.message ? 'border-red-500' : ''}`}
          />
        </Field>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 rounded-xl bg-foreground text-background hover:bg-foreground/90 font-semibold"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {t('contact.form.sending')}
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              {t('contact.form.sendButton')}
            </>
          )}
        </Button>
      </form>
    </motion.div>
  );

  /* ── Info de contacto ── */
  const InfoContent = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="space-y-6"
    >
      <div>
        <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
          {t('contact.infoTitle')}
        </p>
        <div className="space-y-2">
          {contactInfo.map((info) => (
            <a
              key={info.label}
              href={info.href}
              target={info.href.startsWith('http') ? '_blank' : undefined}
              rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-3 p-3 rounded-xl border border-border/60 hover:bg-accent/50 transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                <info.icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs text-muted-foreground">{info.label}</div>
                <div className={`text-sm font-medium group-hover:text-primary transition-colors ${info.truncate ? 'truncate' : ''}`}>
                  {info.value}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Disponibilidad */}
      <div className="p-4 rounded-xl bg-muted/30 border border-border/60">
        <div className="flex items-center gap-2 mb-1">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-sm font-semibold">
            {portfolioMode === 'employee' ? t('contact.availability.employee') : t('contact.availability.freelance')}
          </span>
        </div>
        <p className="text-xs text-muted-foreground pl-4">
          {portfolioMode === 'employee'
            ? t('contact.availabilityDesc.employee')
            : t('contact.availabilityDesc.freelance')}
        </p>
      </div>
    </motion.div>
  );

  return (
    <section
      id="contact"
      className={`scroll-mt-24 ${
        showHeading
          ? 'pb-16 sm:pb-20 lg:pb-24 pt-24 md:pt-32 lg:pt-40 relative overflow-hidden'
          : 'pb-2'
      }`}
    >
      {/* Fondo animado — solo en página de contacto */}
      {showHeading && (
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{
              background: [
                'radial-gradient(circle at 70% 20%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 80%, rgba(255, 119, 198, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 60%, rgba(119, 198, 255, 0.1) 0%, transparent 50%)',
              ],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            className="w-full h-full"
          />
        </div>
      )}

      <div className={showHeading ? 'container mx-auto px-4 relative z-10' : 'w-full'}>
        {/* ── Encabezado — solo en página de contacto ── */}
        {showHeading && headerVariant === 'magazine' ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="max-w-5xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-6"
              >
                <span className="font-mono text-6xl lg:text-8xl font-bold text-muted-foreground opacity-30">
                  {magazineNumber}
                </span>
                <div className="h-px flex-1 bg-border" />
              </motion.div>
              <HeadingTag className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-tight">
                {t('contact.title')}
              </HeadingTag>
              <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
                {portfolioMode === 'employee' ? t('contact.employeeDescription') : t('contact.freelanceDescription')}
              </p>
            </div>
          </motion.div>
        ) : showHeading ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/10 to-accent/20 rounded-full border border-border/50 mb-8"
            >
              <MessageCircle className="w-5 h-5 text-primary" />
              <span className="font-medium">{t('contact.connectLabel')}</span>
            </motion.div>
            <HeadingTag className="text-4xl lg:text-6xl xl:text-7xl font-bold mb-6">
              {t('contact.readyTitle')} {t('contact.createTitle')}
            </HeadingTag>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {portfolioMode === 'employee' ? t('contact.employeeSubtitle') : t('contact.freelanceSubtitle')}
            </p>
          </motion.div>
        ) : null}

        {/* ── Grid principal ── */}
        {showHeading ? (
          /* Página /contacto — sin card wrapper */
          <div className="grid lg:grid-cols-[1fr_1px_360px] gap-12 lg:gap-16 items-start">
            {FormContent}
            <div className="hidden lg:block self-stretch bg-border/60" />
            {InfoContent}
          </div>
        ) : (
          /* Página /hire — dentro de card bento */
          <div className="rounded-2xl border border-border/60 bg-card p-6 sm:p-8 lg:p-10">
            <div className="grid lg:grid-cols-[1fr_1px_300px] gap-8 lg:gap-10 items-start">
              {FormContent}
              <div className="hidden lg:block self-stretch bg-border/60" />
              {InfoContent}
            </div>
          </div>
        )}
      </div>

      {/* ── Modal de éxito ── */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsSubmitted(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative bg-background rounded-3xl p-8 max-w-md w-full shadow-2xl border border-border"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsSubmitted(false)}
                className="absolute top-4 right-4 p-2 hover:bg-accent/50 rounded-full transition-colors"
                aria-label={t('contact.success.closeLabel')}
              >
                <X className="w-5 h-5" />
              </button>

              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="flex justify-center mb-6"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-white" strokeWidth={2.5} />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center space-y-4"
              >
                <h3 className="text-3xl font-bold">{t('contact.success.title')}</h3>
                <p className="text-muted-foreground text-lg">{t('contact.success.message')}</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
