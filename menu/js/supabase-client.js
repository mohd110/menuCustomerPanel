// =====================================================
// SUPABASE-CLIENT.JS — Supabase Integration
// =====================================================

const supabaseUrl = 'https://pzseofankkdyigtbpjqy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6c2VvZmFua2tkeWlndGJwanF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1MTgxNDksImV4cCI6MjA5NDA5NDE0OX0.O82sE9DjF3bAfasBXXaPmugGgc88aKIokn_ClzrxKRU';
window.supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

// Global session state
window.currentSession = null;

// Load session from local storage if exists
function loadSession() {
  const stored = localStorage.getItem('customer_session');
  if (stored) {
    window.currentSession = JSON.parse(stored);
  }
}

// Save session
function saveSession(sessionData) {
  window.currentSession = sessionData;
  localStorage.setItem('customer_session', JSON.stringify(sessionData));
}

// Clear session
function clearSession() {
  window.currentSession = null;
  localStorage.removeItem('customer_session');
}

loadSession();
