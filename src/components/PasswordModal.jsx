import React, { useState } from 'react';
import { X, Eye, EyeOff, Copy, CheckCircle } from 'lucide-react';

const PasswordModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  title = "Set Preview Password",
  description = "Set a password to protect this blog preview. Anyone with the link will need this password to view the preview.",
  submitText = "Set Password",
  initialPassword = "",
  showCopyButton = false
}) => {
  const [password, setPassword] = useState(initialPassword);
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password.trim()) return;
    onSubmit(password);
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-primary p-8 rounded-xl shadow-2xl max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-light/50 hover:text-light transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <p className="text-light/90 mb-6">
          {description}
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-light mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 
                         text-white focus:outline-none focus:border-secondary pr-10"
                placeholder="Enter password"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-light/50 hover:text-light transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            {showCopyButton && (
              <button
                type="button"
                onClick={handleCopyPassword}
                className="px-4 py-2 rounded-lg bg-white/10 text-white 
                         hover:bg-white/20 transition-colors flex items-center gap-2"
              >
                {copied ? <CheckCircle size={20} /> : <Copy size={20} />}
                {copied ? "Copied!" : "Copy Password"}
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white/10 text-white 
                       hover:bg-white/20 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-secondary text-primary font-semibold 
                       hover:bg-secondary/90 transition-colors"
            >
              {submitText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;