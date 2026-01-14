import React from 'react';
import { Navigate } from 'react-router-dom';
import { isBackendConnected, supabase } from '../lib/supabase';

const ProtectedRoute = ({ children }) => {
    // 1. Check for real session (async) or local mock token
    // For this hybrid MVP, we check localStorage 'aura_session' which is set by both Mock and Real flows
    const hasSession = localStorage.getItem('aura_session') || (isBackendConnected() && supabase.auth.getSession());

    if (!hasSession) {
        return <Navigate to="/auth" replace />;
    }

    return children;
};

export default ProtectedRoute;
