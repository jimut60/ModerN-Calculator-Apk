
import React from 'react';
import Calculator from './components/Calculator';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-900 flex flex-col items-center justify-center font-sans p-4">
      <main className="w-full max-w-md">
        <Calculator />
      </main>
      <footer className="text-center text-slate-500 mt-8 text-sm">
        <p>Designed with ❤️ by Jimut Mahato</p>
      </footer>
    </div>
  );
};

export default App;
