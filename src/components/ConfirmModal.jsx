export default function ConfirmModal({ title, message, confirmText, cancelText, onConfirm, onClose, isDestructive }) {
  function stopPropagation(e) { e.stopPropagation() }

  return (
    <div className="modal-overlay z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm fixed inset-0" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200" onClick={stopPropagation}>
        <div className="p-6 text-center">
          <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full mb-4 ${isDestructive ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-sm text-gray-500">{message}</p>
        </div>
        <div className="px-6 py-4 bg-gray-50 flex gap-3">
          <button onClick={onClose} className="btn-secondary flex-1 py-2.5">
            {cancelText || 'Cancelar'}
          </button>
          <button onClick={() => { onConfirm(); onClose(); }} className={`flex-1 py-2.5 rounded-xl font-bold text-sm text-white transition-all active:scale-95 ${isDestructive ? 'bg-red-600 hover:bg-red-700' : 'bg-brand-600 hover:bg-brand-700'}`}>
            {confirmText || 'Confirmar'}
          </button>
        </div>
      </div>
    </div>
  )
}
