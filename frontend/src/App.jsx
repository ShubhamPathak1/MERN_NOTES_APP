import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import CreateNotes from './pages/CreateNotes'
import LoadingSpinner from './components/LoadingSpinner'
import { Navigate } from 'react-router-dom';
import { useUserStore } from './store/UserStore'
import OTPVerificationPage from './pages/OTPVerificationPage'
import UpdateNotes from './pages/UpdateNotes'
import MyProfile from './pages/MyProfile'


const ProtectedRoute = ({children}) => {
  const {isAuthenticated, user} = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />
  }
  if (!user.isVerified) {
    return <Navigate to={"/verify-otp"} replace />
  }

  return children;
};

const RedirectAuthenticatedUser = ({children}) => {
  const {isAuthenticated, user} = useUserStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to={"/"} replace />
  }

  return children;
}


const App = () => {

  const {isCheckingAuth, checkAuth} = useUserStore();

  useEffect(()=> {checkAuth()}, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />



  return (
    <Routes>
      <Route path='/' element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path='/login' element={<RedirectAuthenticatedUser><LoginPage /></RedirectAuthenticatedUser>} />
      <Route path='/signup' element={<RedirectAuthenticatedUser><SignupPage /></RedirectAuthenticatedUser>} />
      <Route path='/verify-otp' element={<OTPVerificationPage />} />

      <Route path='/create-note' element={<ProtectedRoute><CreateNotes /></ProtectedRoute>} />
      <Route path='/update-note/:id' element={<ProtectedRoute><UpdateNotes /></ProtectedRoute>} />
      <Route path='/myprofile' element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />

      <Route path='*' element={<Navigate to={"/"} replace />} />

    </Routes>
  )
}

export default App