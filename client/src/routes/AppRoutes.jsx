import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '../components/shared/Layout';
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Onboarding from '../pages/Onboarding';
import Dashboard from '../pages/Dashboard';
import CostCalculator from '../pages/CostCalculator';
import DemandTest from '../pages/DemandTest';
import FeedbackDashboard from '../pages/FeedbackDashboard';
import DecisionCard from '../pages/DecisionCard';
import Profile from '../pages/Profile';
import CustomerFeedbackForm from '../pages/CustomerFeedbackForm';
import CustomerHome from '../pages/CustomerHome';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/feedback/:testId" element={<CustomerFeedbackForm />} />
        <Route path="/customer-home" element={<CustomerHome />} />

        {/* Private Dashboard Routes */}
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/calculator" element={<CostCalculator />} />
        <Route path="/demand-test" element={<DemandTest />} />
        <Route path="/analytics" element={<FeedbackDashboard />} />
        <Route path="/decision" element={<DecisionCard />} />
        <Route path="/profile" element={<Profile />} />

        {/* Fallback Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
