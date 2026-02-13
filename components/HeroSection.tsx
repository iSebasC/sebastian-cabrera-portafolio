import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Briefcase } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface HeroSectionProps {
  portfolioMode?: 'employee' | 'freelance';
}

const useTypingAnimation = (
  text: string,
  typingSpeed: number = 100,
  deletingSpeed: number = 50,
  pauseDuration: number = 2000,
) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (isPaused) {
      timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(timeout);
    }

    if (!isDeleting && displayedText.length < text.length) {
      timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, typingSpeed);
    } else if (!isDeleting && displayedText.length === text.length) {
      setIsPaused(true);
    } else if (isDeleting && displayedText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length - 1));
      }, deletingSpeed);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, isPaused, text, typingSpeed, deletingSpeed, pauseDuration]);

  return displayedText;
};

export function HeroSection({ portfolioMode = 'freelance' }: HeroSectionProps) {
  const navigate = useNavigate();
  const typedName = useTypingAnimation('Sebastian Cabrera A.', 100, 50, 2000);
  const heroDescription = (
    <>
      Desarrollo páginas web, sistemas web y plataformas digitales modernas con{' '}
      <span className="text-foreground font-semibold">Next.js, Astro y Node.js</span> que convierten
      visitantes en clientes reales en Perú y Latinoamérica.
    </>
  );

  return (
    <section
      className="relative min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-5rem)] bg-background overflow-hidden flex flex-col items-center justify-center"
      style={{ zIndex: 1 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-0 py-20 xl:py-0">
        {/* IMAGEN FLOTANTE CENTRADA - SOLO DESKTOP XL+ */}
        <div
          className="hidden xl:block pointer-events-none absolute"
          style={{
            top: 'calc(50% - 40px)',
            left: 'calc(50% - 56px)',
            transform: 'translate(-50%, -50%)',
            zIndex: 50,
            width: '16rem',
            height: '20rem',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="relative w-full h-full"
          >
            <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-border/50 shadow-2xl">
              <img
                src="/img/profilesebastian_2026.webp"
                alt="Perfil"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Círculo Interactivo con manita "¡Conóceme!" */}
            <motion.button
              onClick={() => navigate('/sobre-mi')}
              className="absolute -bottom-4 -left-4 z-10 cursor-pointer group pointer-events-auto"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              aria-label="Ir a Sobre Mí"
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-xl bg-blue-500">
                <motion.svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 sm:w-10 sm:h-10"
                  animate={{ y: [0, -4, 0, -2, 0], rotate: [0, 10, -10, 5, 0] }}
                  transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.5 }}
                  aria-hidden="true"
                >
                  <path
                    d="M8.78355 21.9999C7.09836 21.2478 5.70641 20.0758 4.7915 18.5068"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M14.8252 2.18595C16.5021 1.70882 18.2333 2.16305 19.4417 3.39724"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M4.0106 8.36655L3.63846 7.71539L4.0106 8.36655ZM6.50218 8.86743L7.15007 8.48962L6.50218 8.86743ZM3.2028 10.7531L2.55491 11.1309H2.55491L3.2028 10.7531ZM7.69685 3.37253L8.34474 2.99472V2.99472L7.69685 3.37253ZM8.53873 4.81624L7.89085 5.19405L8.53873 4.81624ZM10.4165 9.52517C10.6252 9.88299 11.0844 10.0039 11.4422 9.79524C11.8 9.58659 11.9209 9.12736 11.7123 8.76955L10.4165 9.52517ZM7.53806 12.1327C7.74672 12.4905 8.20594 12.6114 8.56376 12.4027C8.92158 12.1941 9.0425 11.7349 8.83384 11.377L7.53806 12.1327ZM4.39747 5.25817L3.74958 5.63598L4.39747 5.25817ZM11.8381 2.9306L12.486 2.55279V2.55279L11.8381 2.9306ZM14.3638 7.26172L15.0117 6.88391L14.3638 7.26172ZM16.0475 10.1491L16.4197 10.8003C16.5934 10.701 16.7202 10.5365 16.772 10.3433C16.8238 10.15 16.7962 9.94413 16.6954 9.77132L16.0475 10.1491ZM17.6632 5.37608L17.0153 5.75389L17.6632 5.37608ZM20.1888 9.7072L20.8367 9.32939V9.32939L20.1888 9.7072ZM6.99128 17.2497L7.63917 16.8719L6.99128 17.2497ZM16.9576 19.2533L16.5854 18.6021L16.9576 19.2533ZM13.784 15.3C13.9927 15.6578 14.4519 15.7787 14.8097 15.5701C15.1676 15.3614 15.2885 14.9022 15.0798 14.5444L13.784 15.3ZM4.38275 9.0177C5.01642 8.65555 5.64023 8.87817 5.85429 9.24524L7.15007 8.48962C6.4342 7.26202 4.82698 7.03613 3.63846 7.71539L4.38275 9.0177ZM3.63846 7.71539C2.44761 8.39597 1.83532 9.8969 2.55491 11.1309L3.85068 10.3753C3.64035 10.0146 3.75139 9.37853 4.38275 9.0177L3.63846 7.71539ZM7.04896 3.75034L7.89085 5.19405L9.18662 4.43843L8.34474 2.99472L7.04896 3.75034ZM7.89085 5.19405L10.4165 9.52517L11.7123 8.76955L9.18662 4.43843L7.89085 5.19405ZM8.83384 11.377L7.15007 8.48962L5.85429 9.24524L7.53806 12.1327L8.83384 11.377ZM7.15007 8.48962L5.04535 4.88036L3.74958 5.63598L5.85429 9.24524L7.15007 8.48962ZM5.57742 3.5228C6.21109 3.16065 6.8349 3.38327 7.04896 3.75034L8.34474 2.99472C7.62887 1.76712 6.02165 1.54123 4.83313 2.22048L5.57742 3.5228ZM4.83313 2.22048C3.64228 2.90107 3.02999 4.40199 3.74958 5.63598L5.04535 4.88036C4.83502 4.51967 4.94606 3.88363 5.57742 3.5228L4.83313 2.22048ZM11.1902 3.30841L13.7159 7.63953L15.0117 6.88391L12.486 2.55279L11.1902 3.30841ZM13.7159 7.63953L15.3997 10.5269L16.6954 9.77132L15.0117 6.88391L13.7159 7.63953ZM9.71869 3.08087C10.3524 2.71872 10.9762 2.94134 11.1902 3.30841L12.486 2.55279C11.7701 1.32519 10.1629 1.0993 8.9744 1.77855L9.71869 3.08087ZM8.9744 1.77855C7.78355 2.45914 7.17126 3.96006 7.89085 5.19405L9.18662 4.43843C8.97629 4.07774 9.08733 3.4417 9.71869 3.08087L8.9744 1.77855ZM17.0153 5.75389L19.5409 10.085L20.8367 9.32939L18.311 4.99827L17.0153 5.75389ZM15.5437 5.52635C16.1774 5.1642 16.8012 5.38682 17.0153 5.75389L18.311 4.99827C17.5952 3.77068 15.988 3.54478 14.7994 4.22404L15.5437 5.52635ZM14.7994 4.22404C13.6086 4.90462 12.9963 6.40555 13.7159 7.63953L15.0117 6.88391C14.8013 6.52322 14.9124 5.88718 15.5437 5.52635L14.7994 4.22404ZM2.55491 11.1309L6.34339 17.6276L7.63917 16.8719L3.85068 10.3753L2.55491 11.1309ZM16.5854 18.6021C13.2185 20.5264 9.24811 19.631 7.63917 16.8719L6.34339 17.6276C8.45414 21.2472 13.4079 22.1458 17.3297 19.9045L16.5854 18.6021ZM19.5409 10.085C21.1461 12.8377 19.9501 16.6792 16.5854 18.6021L17.3297 19.9045C21.2539 17.6618 22.9512 12.9554 20.8367 9.32939L19.5409 10.085ZM15.0798 14.5444C14.4045 13.3863 14.8772 11.6818 16.4197 10.8003L15.6754 9.49797C13.5735 10.6993 12.5995 13.2687 13.784 15.3L15.0798 14.5444Z"
                    fill="#ffffff"
                  />
                </motion.svg>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                whileHover={{ opacity: 1, scale: 1, y: -8 }}
                className="absolute -top-12 left-1/2 -translate-x-1/2 bg-foreground text-background px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              >
                ¡Conóceme!
              </motion.div>
            </motion.button>
          </motion.div>
        </div>

        {/* XL+ Layout (3 columnas) */}
        <div className="hidden xl:flex justify-center w-full">
          <div className="grid grid-cols-[auto_16rem_auto] gap-12 items-start w-fit">
            {/* Columna izquierda: nombre + título */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="flex flex-col items-start justify-start text-left space-y-1 justify-self-end max-w-[420px] w-fit"
            >
              <div className="w-fit">
                <div
                  className="text-2xl xl:text-3xl tracking-tight leading-tight text-muted-foreground"
                  style={{ fontFamily: 'Antonio, sans-serif' }}
                >
                  {typedName}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block ml-1"
                  >
                    |
                  </motion.span>
                </div>
              </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="space-y-1 w-fit"
            >
              <h1 className="text-5xl xl:text-6xl font-bold tracking-tighter leading-tight">LANDING</h1>
              <div className="text-5xl xl:text-6xl font-bold tracking-tighter leading-tight">PAGES</div>
              <div className="text-4xl xl:text-5xl font-bold tracking-tighter text-muted-foreground opacity-40 leading-tight">
                QUE VENDEN
              </div>
            </motion.div>
            </motion.div>

            {/* Columna central: placeholder (la imagen flotante se posiciona encima) */}
            <div className="relative flex items-center justify-center">
              <div className="w-64 h-80" />
            </div>

            {/* Columna derecha: descriptivo + botones */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="flex flex-col items-start justify-start text-left space-y-6 justify-self-start max-w-[420px] w-fit"
            >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-sm text-muted-foreground leading-relaxed max-w-md"
            >
              {heroDescription}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-row gap-3 items-center w-fit"
            >
              <motion.button
                onClick={() => {
                  if (portfolioMode === 'freelance') navigate('/cotizar');
                  else navigate('/contacto');
                }}
                className="group px-5 py-3 bg-black text-white rounded-xl font-bold text-xs flex items-center gap-2 shadow-xl hover:shadow-2xl transition-all hover:bg-black/90"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                aria-label={portfolioMode === 'freelance' ? 'Ver precios y cotizar' : 'Contactar'}
              >
                <Sparkles className="w-4 h-4" />
                <div className="flex flex-col items-start">
                  {portfolioMode === 'freelance' && (
                    <span className="text-[10px] opacity-70">Desde $189 USD</span>
                  )}
                  <span className="text-xs whitespace-nowrap">
                    {portfolioMode === 'freelance' ? 'Ver Precios y Cotizar' : 'Contactar'}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                onClick={() => navigate('/proyectos')}
                className="px-5 py-3 bg-white border-2 border-gray-200 text-black rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors whitespace-nowrap"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                aria-label="Ver portfolio"
              >
                <Briefcase className="w-4 h-4" />
                Ver Portfolio
              </motion.button>
            </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Móvil/Tablet (< xl) */}
        <div className="xl:hidden flex flex-col items-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div
              className="text-3xl sm:text-4xl font-bold tracking-tighter"
              style={{ fontFamily: 'Antonio, sans-serif' }}
            >
              Sebastian Cabrera A.
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-48 h-64 sm:w-56 sm:h-72 rounded-3xl overflow-hidden border-4 border-border/50 shadow-2xl"
          >
            <img src="/img/profilesebastian_2026.webp" alt="Perfil" className="w-full h-full object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center space-y-4"
          >
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter">
              LANDING<br />PAGES
            </h1>
            <div className="text-3xl sm:text-4xl font-bold tracking-tighter text-muted-foreground opacity-30">
              QUE VENDEN
            </div>

            <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed pt-4">
              {heroDescription}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col gap-3 w-full max-w-sm"
          >
            <motion.button
              onClick={() => {
                if (portfolioMode === 'freelance') {
                  navigate('/cotizar');
                } else {
                  navigate('/contacto');
                }
              }}
              className="px-6 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-sm flex items-center justify-between gap-3 shadow-xl"
              whileTap={{ scale: 0.95 }}
              aria-label={portfolioMode === 'freelance' ? 'Ver precios y cotizar' : 'Contactar'}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <div className="flex flex-col items-start">
                  {portfolioMode === 'freelance' && <span className="text-xs opacity-80">Desde $189 USD</span>}
                  <span>{portfolioMode === 'freelance' ? 'Ver Precios y Cotizar' : 'Contactar'}</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <motion.button
              onClick={() => navigate('/proyectos')}
              className="px-6 py-4 border-2 border-border rounded-xl font-bold text-sm flex items-center justify-center gap-2 bg-background"
              whileTap={{ scale: 0.95 }}
              aria-label="Ver portfolio"
            >
              <Briefcase className="w-4 h-4" />
              Ver Portfolio
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
