import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function Register() {
  const { t } = useLanguage();
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('entrepreneur');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone || !password) {
      setError('Please fill in all fields / Sabhi khaney bharein');
      return;
    }

    if (phone.length < 10) {
      setError('Phone number must be 10 digits / Phone number 10 ankon ka hona chahiye');
      return;
    }

    try {
      const loggedUser = await register(name, phone, password, role);
      if (loggedUser.role === 'customer') {
        navigate('/customer-home');
      } else {
        navigate('/onboarding');
      }
    } catch (err) {
      setError(err.message || 'Registration failed / Khaata nahi ban paya');
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <Card title={t('register')} subtitle="Create a new account to calculate unit economics and get QR feedback">
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
            id="name"
            label="Your Name (आपका नाम)"
            type="text"
            placeholder="e.g. Lakshmi Devi"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            allowVoice={true}
            hint="Voice input enabled / Bolkar naam bharein"
          />

          <Input
            id="phone"
            label="Phone Number (फ़ोन नंबर)"
            type="tel"
            maxLength={10}
            placeholder="e.g. 9876543210"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
            required
            hint="10 ankon ka mobile number"
          />

          <Input
            id="password"
            label="Create PIN / Password (पासवर्ड बनाएं)"
            type="password"
            placeholder="••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            hint="Aisa pin jo aapko yaad rahe"
          />

          <Button type="submit" variant="primary" className="w-full py-3 text-lg font-bold">
            {t('register')}
          </Button>

          <p className="text-center text-sm font-medium text-brand-dark opacity-80 pt-2">
            Already have an account? / Pehle se account hai?{' '}
            <Link to="/login" className="text-brand-primary font-bold hover:underline">
              {t('login')}
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
}
