import { memo, useEffect } from 'react'

const Modal = ({ open, onClose, children }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="max-w-[95vw] sm:max-w-[400px] md:max-w-[950px] mx-2 sm:mx-4 md:mx-0 bg-white rounded-lg shadow p-4 md:p-6 box-border overflow-x-hidden">
        {children}
      </div>
    </div>
  )
}

export default memo(Modal) 