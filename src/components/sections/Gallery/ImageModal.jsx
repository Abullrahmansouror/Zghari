import { useTranslation } from 'react-i18next'
import MorphingModal from '../../ui/MorphingModal'

/**
 * Gallery-specific wrapper around MorphingModal: pulls the photo's title +
 * location from i18n by its manifest index.
 */
export default function ImageModal({ item, onClose }) {
  const { t } = useTranslation()
  const meta = item ? t(`gallery.items.${item.index}`, { returnObjects: true }) : null

  return (
    <MorphingModal
      item={item}
      title={meta?.title}
      caption={meta?.location}
      closeLabel={t('gallery.close')}
      onClose={onClose}
    />
  )
}
