export const getActiveWhatsappNumber = (): string => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('wasla_whatsapp') || '201025146867';
  }
  return '201025146867';
};

export const openWhatsapp = (message: string) => {
  const phone = getActiveWhatsappNumber();
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  if (typeof window !== 'undefined') {
    window.open(url, '_blank');
  }
};