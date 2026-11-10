import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { KeyRound, Phone, UserCheck } from 'lucide-react';

export default function Login() {
  const { t } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('entrepreneur');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone || !password) {
      setError('Please fill in all fields / kripya sabhi box bharein');
      return;
    }
    
    // Simple validator
    if (phone.length < 10) {
      setError('Phone number must be 10 digits / Phone number 10 ankon ka hona chahiye');
      return;
    }

    try {
      const loggedUser = await login(phone, password);
      if (loggedUser.role === 'customer') {
        navigate('/customer-home');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Login failed / Login nahi ho paya');
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <Card title={t('login')} subtitle="Enter your credentials to access your dashboard">
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm font-semibold border border-red-200">
              {error}
            </div>
          )}

          {/* Role selector buttons */}
          <div className="flex gap-2 p-1 bg-brand-light border border-brand-neutralGray rounded-lg">
            <button
              type="button"
              onClick={() => setRole('entrepreneur')}
              className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${
                role === 'entrepreneur'
                  ? 'bg-brand-primary text-white shadow-sm'
                  : 'text-brand-dark hover:bg-brand-primaryLight'
              }`}
            >
              {t('roleSeller')}
            </button>
            <button
              type="button"
              onClick={() => setRole('customer')}
              className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${
                role === 'customer'
                  ? 'bg-brand-primary text-white shadow-sm'
                  : 'text-brand-dark hover:bg-brand-primaryLight'
              }`}
            >
              {t('roleCustomer')}
            </button>
          </div>

          <Input
            id="phone"
            label="Phone Number (फ़ोन नंबर)"
            type="tel"
            maxLength={10}
            placeholder="e.g. 9876543210"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
            required
            hint="Aapka register phone number"
          />

          <Input
            id="password"
            label="PIN / Password (पासवर्ड)"
            type="password"
            placeholder="••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            hint="Aapka surakshit code"
          />

          <Button type="submit" variant="primary" className="w-full py-3 text-lg font-bold">
            {t('login')}
          </Button>

          <p className="text-center text-sm font-medium text-brand-dark opacity-80 pt-2">
            Don't have an account? / Naya account chahiye?{' '}
            <Link to="/register" className="text-brand-primary font-bold hover:underline">
              {t('register')}
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
}
