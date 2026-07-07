export const profileTheme = {
  colors: {
    pageBackground: '#FAF6F0',
    surface: '#FFFFFF',
    surfaceMuted: '#F3ECE1',
    heroBackground: '#F1E4D2',
    border: '#EAE1D3',
    textPrimary: '#2B2420',
    textSecondary: '#8B7E70',
    accentDark: '#2B2420',
    accentDarkHover: '#3D342C',
    ring: '#2B2420',
  },
  status: {
    'on-the-way': {
      bg: 'bg-[#F5E1C0]',
      text: 'text-[#8A5A2B]',
      label: 'On the way',
    },
    delivered: {
      bg: 'bg-[#DCEAD3]',
      text: 'text-[#3F6B33]',
      label: 'Delivered',
    },
    regretted: {
      bg: 'bg-[#F3D9D9]',
      text: 'text-[#9B3B3B]',
      label: 'Regretted',
    },
  },
} as const;

export const profileClasses = {
  page: 'bg-[#FAF6F0] min-h-screen',
  surfaceCard: 'bg-white border border-[#EAE1D3] rounded-2xl',
  heroCard: 'bg-[#F1E4D2] rounded-2xl',
  textPrimary: 'text-[#2B2420]',
  textSecondary: 'text-[#8B7E70]',
  serifItalic: 'font-serif italic font-normal',
  buttonDark: 'bg-[#2B2420] text-white hover:bg-[#3D342C] rounded-full',
  buttonOutline:
    'border border-[#2B2420] text-[#2B2420] bg-transparent hover:bg-[#2B2420]/5 rounded-full',
  navItemActive: 'bg-[#2B2420] text-white',
  navItemInactive: 'text-[#2B2420]/80 hover:bg-[#F3ECE1]',
};
