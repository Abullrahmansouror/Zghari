/* Non-localized external links / handles. Swap for Zghari's real accounts. */

export const INSTAGRAM_URL = 'https://instagram.com/zghari'

/** Build a WhatsApp deeplink with a prefilled message. */
export const whatsappLink = (number, text) =>
  `https://wa.me/${number}?text=${encodeURIComponent(text)}`
