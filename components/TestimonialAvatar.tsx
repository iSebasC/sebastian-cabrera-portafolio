import { motion } from 'framer-motion';

interface TestimonialAvatarProps {
  name: string;
  initials: string;
  colorClass: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function TestimonialAvatar({ 
  name, 
  initials, 
  colorClass, 
  size = 'md', 
  className = '' 
}: TestimonialAvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-lg', 
    lg: 'w-16 h-16 text-xl'
  };

  return (
    <motion.div
      className={`
        ${sizeClasses[size]} 
        ${colorClass} 
        rounded-full 
        flex 
        items-center 
        justify-center 
        text-white 
        font-bold
        shadow-xl
        border-4
        border-white
        hover:shadow-2xl
        hover:border-white/90
        transition-all
        duration-300
        ${className}
      `}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      title={name}
      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ 
        duration: 0.5, 
        type: "spring", 
        stiffness: 200,
        delay: Math.random() * 0.3 
      }}
    >
      <span className="drop-shadow-lg text-shadow font-extrabold avatar-text">
        {initials}
      </span>
    </motion.div>
  );
}