import { useEffect, useState } from "react";

const Toast = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 6000); // Auto-close after 6 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div className="fixed top-5 right-5 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg">
      <span>{message}</span>
      <button
        onClick={() => {
          setVisible(false);
          onClose();
        }}
        className="ml-4 bg-red-500 px-2 py-1 rounded"
      >
        ✖
      </button>
    </div>
  );
};

export default Toast;
