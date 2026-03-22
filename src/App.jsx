import React from 'react';
import { LoadingProvider } from './contexts/LoadingContext';
import LoadingScreen from './components/ui/LoadingScreen';
import ScrollProgress from './components/ui/ScrollProgress';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import MainContainer from './components/MainContainer';

function App() {
  return (
    <LoadingProvider>
      <div className="relative w-full min-h-screen bg-black text-white font-sans selection:bg-teal-500/30 selection:text-teal-200 cursor-none">
        
        {/* Core UI Overlays */}
        <LoadingScreen />
        <ScrollProgress />
        <Cursor />
        <Navbar />

        <MainContainer />

      </div>
    </LoadingProvider>
  );
}

export default App;
