import { motion } from 'framer-motion';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../context/ThemeContext';

const ThemeSwitch = ({ compact = false }) => {
  const { isLight, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isLight}
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} experience`}
      onClick={toggleTheme}
      className={`theme-switch ${isLight ? 'theme-switch--light' : ''} ${
        compact ? 'theme-switch--compact' : ''
      }`}
    >
      <span className="theme-switch__label theme-switch__label--dark">
        <MoonIcon aria-hidden="true" />
        {!compact && 'Dark'}
      </span>
      <span className="theme-switch__label theme-switch__label--light">
        <SunIcon aria-hidden="true" />
        {!compact && 'Light'}
      </span>
      <motion.span
        aria-hidden="true"
        className="theme-switch__thumb"
        animate={{ x: isLight ? '100%' : '0%' }}
        transition={{ type: 'spring', stiffness: 430, damping: 32 }}
      />
    </button>
  );
};

export default ThemeSwitch;
