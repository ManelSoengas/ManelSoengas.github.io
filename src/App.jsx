import React, { useState, useEffect, useMemo } from 'react';
import { 
  MessageSquare, 
  Cpu, 
  Binary, 
  Brain, 
  Zap, 
  ArrowRight, 
  Info, 
  AlertTriangle, 
  ThumbsUp, 
  Maximize2 
} from 'lucide-react';

const App = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [userInput, setUserInput] = useState("Com es cuina un ou?");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTokens, setGeneratedTokens] = useState([]);
  
  const steps = [
    {
      id: 0,
      title: "El Prompt",
      subtitle: "L'entrada",
      icon: <MessageSquare className="w-6 h-6" />,
      content: "Tot comença aquí. Per al model, el teu text no té significat emocional, són dades en brut que han de ser processades.",
      color: "bg-blue-500"
    },
    {
      id: 1,
      title: "Tokenització",
      subtitle: "Traducció a números",
      icon: <Binary className="w-6 h-6" />,
      content: "El text es fragmenta en tokens (paraules, síl·labes o signes) i cada un rep un valor numèric. Després es converteixen en 'embeddings', coordenades en un espai de conceptes.",
      color: "bg-purple-500"
    },
    {
      id: 2,
      title: "El Transformer",
      subtitle: "Atenció i Context",
      icon: <Brain className="w-6 h-6" />,
      content: "El mecanisme d'atenció analitza tota la frase alhora. Decideix que 'cuina' i 'ou' són més importants que 'un' per generar la resposta.",
      color: "bg-indigo-500"
    },
    {
      id: 3,
      title: "Inferència",
      subtitle: "Predicció de la següent paraula",
      icon: <Zap className="w-6 h-6" />,
      content: "El model calcula quina paraula és la més probable. No escriu la resposta de cop, sinó que prediu paraula per paraula re-llegint-ho tot cada vegada.",
      color: "bg-amber-500"
    },
    {
      id: 4,
      title: "Decodificació",
      subtitle: "Sortida",
      icon: <ArrowRight className="w-6 h-6" />,
      content: "Els números interns es tornen a convertir en text humà perquè el puguis llegir a la pantalla.",
      color: "bg-green-500"
    }
  ];

  const hallucinationsData = [
    {
      title: "Probabilitat vs Veritat",
      desc: "El model prioritza la continuïtat del text. Si no sap qui va guanyar la lliga a Mart el 2025, inventarà el que millor 'soni'."
    },
    {
      title: "Confabulació d'Embeddings",
      desc: "Conceptes propers en l'espai matemàtic (com dos científics del mateix camp) es poden barrejar fàcilment."
    },
    {
      title: "Falta de Verificació",
      desc: "No hi ha un 'pensament' crític ni consulta externa. És pura estadística seqüencial."
    }
  ];

  const tokens = useMemo(() => {
    return userInput.split(/\s+/).map((word, i) => ({
      id: i,
      text: word,
      val: Math.floor(Math.random() * 50000)
    }));
  }, [userInput]);

  const handleNext = () => {
    if (activeStep < steps.length - 1) setActiveStep(activeStep + 1);
  };

  const handlePrev = () => {
    if (activeStep > 0) setActiveStep(activeStep - 1);
  };

  // Simulació de generació de text
  const simulateGeneration = () => {
    setIsGenerating(true);
    setGeneratedTokens([]);
    const response = ["Per", "cuinar", "un", "ou,", "pots", "fer-lo", "fregit", "o", "bullit."];
    let i = 0;
    const interval = setInterval(() => {
      setGeneratedTokens(prev => [...prev, response[i]]);
      i++;
      if (i >= response.length) {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Com funciona un LLM?</h1>
          <p className="text-slate-600">Explora el viatge d'una instrucció des del prompt fins a la resposta.</p>
        </header>

        {/* Stepper Navigation */}
        <div className="flex justify-between mb-8 overflow-x-auto pb-4">
          {steps.map((step, idx) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(idx)}
              className={`flex flex-col items-center min-w-[100px] transition-all ${activeStep === idx ? 'opacity-100 scale-105' : 'opacity-40 hover:opacity-60'}`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white mb-2 ${step.color} shadow-lg`}>
                {step.icon}
              </div>
              <span className="text-xs font-bold uppercase tracking-tighter">{step.title}</span>
            </button>
          ))}
        </div>

        {/* Main Interactive Stage */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 mb-8">
          <div className={`${steps[activeStep].color} p-4 text-white flex justify-between items-center`}>
            <div>
              <h2 className="text-xl font-bold">{steps[activeStep].title}</h2>
              <p className="text-sm opacity-90">{steps[activeStep].subtitle}</p>
            </div>
            <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-mono">
              Pas {activeStep + 1} de 5
            </div>
          </div>

          <div className="p-6 md:p-10 min-h-[400px] flex flex-col justify-center">
            
            {/* Step 0: Prompt */}
            {activeStep === 0 && (
              <div className="space-y-6">
                <div className="bg-slate-100 p-4 rounded-lg border-2 border-dashed border-slate-300">
                  <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">El teu prompt:</label>
                  <input 
                    type="text" 
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="w-full bg-transparent text-xl font-medium focus:outline-none"
                    placeholder="Escriu alguna cosa..."
                  />
                </div>
                <p className="text-slate-600 leading-relaxed italic border-l-4 border-blue-500 pl-4">
                  "{steps[0].content}"
                </p>
              </div>
            )}

            {/* Step 1: Tokenization */}
            {activeStep === 1 && (
              <div className="space-y-6">
                <div className="flex flex-wrap gap-3">
                  {tokens.map(t => (
                    <div key={t.id} className="flex flex-col items-center animate-bounce" style={{animationDelay: `${t.id * 100}ms`}}>
                      <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-md font-medium border border-purple-200">
                        {t.text}
                      </div>
                      <ArrowRight className="w-4 h-4 rotate-90 my-1 text-slate-300" />
                      <div className="bg-slate-800 text-slate-200 px-2 py-1 rounded text-xs font-mono">
                        {t.val}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 bg-indigo-50 p-4 rounded-lg">
                  <h4 className="font-bold text-indigo-800 text-sm mb-2 flex items-center">
                    <Maximize2 className="w-4 h-4 mr-2" /> Embeddings (Espai de Conceptes)
                  </h4>
                  <p className="text-sm text-indigo-700">
                    Cada número es converteix en un vector (p. ex. [0.12, -0.5, 0.88...]). 
                    Això permet al model saber que "ou" i "cuina" tenen una relació física en el món real.
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Attention */}
            {activeStep === 2 && (
              <div className="relative">
                <div className="flex justify-center gap-4 mb-12">
                  {tokens.map(t => (
                    <div 
                      key={t.id} 
                      className={`p-3 rounded-lg border-2 transition-all duration-500 ${
                        ['cuina', 'ou', 'ou?'].includes(t.text.toLowerCase()) 
                        ? 'border-indigo-500 bg-indigo-50 scale-110 shadow-md' 
                        : 'border-slate-200 opacity-50'
                      }`}
                    >
                      <span className="font-bold">{t.text}</span>
                    </div>
                  ))}
                </div>
                <div className="text-center space-y-4">
                  <div className="inline-block bg-indigo-600 text-white p-4 rounded-2xl shadow-lg animate-pulse">
                    Mecanisme d'Atenció Actiu
                  </div>
                  <p className="text-slate-600 max-w-md mx-auto">
                    El model ignora el soroll ("Com", "es", "un") i es focalitza en els conceptes clau per predir la resposta correcta.
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Inference */}
            {activeStep === 3 && (
              <div className="space-y-6 text-center">
                <div className="bg-slate-900 rounded-xl p-6 min-h-[150px] flex flex-wrap items-center justify-center gap-2 text-white font-mono shadow-2xl">
                  <span className="text-slate-400 italic mr-2">{userInput}</span>
                  {generatedTokens.map((t, idx) => (
                    <span key={idx} className="bg-amber-500/20 text-amber-400 px-2 py-1 rounded border border-amber-500/30 animate-in fade-in zoom-in">
                      {t}
                    </span>
                  ))}
                  {isGenerating && <span className="w-2 h-6 bg-amber-500 animate-pulse"></span>}
                </div>
                {!isGenerating && generatedTokens.length === 0 && (
                  <button 
                    onClick={simulateGeneration}
                    className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-full font-bold transition-all shadow-lg flex items-center mx-auto"
                  >
                    <Zap className="w-5 h-5 mr-2" /> Iniciar Inferència
                  </button>
                )}
                <p className="text-sm text-slate-500 italic">
                  Cada paraula s'ha generat calculant la probabilitat estadística basada en el context anterior.
                </p>
              </div>
            )}

            {/* Step 4: Decoding */}
            {activeStep === 4 && (
              <div className="space-y-8 animate-in fade-in duration-700 text-center">
                <div className="flex justify-center items-center gap-8">
                  <div className="space-y-2">
                    <div className="text-[10px] font-mono text-slate-400">010110...</div>
                    <ArrowRight className="w-8 h-8 mx-auto text-green-500" />
                  </div>
                  <div className="bg-green-100 border-2 border-green-500 p-6 rounded-2xl shadow-xl max-w-xs">
                    <p className="text-lg font-medium text-green-900 leading-relaxed">
                      "Per cuinar un ou, pots fer-lo fregit o bullit."
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg max-w-md mx-auto border border-slate-200">
                  <h4 className="font-bold flex items-center justify-center gap-2 mb-2">
                    <Info className="w-4 h-4 text-blue-500" /> Procés Completat
                  </h4>
                  <p className="text-xs text-slate-500">
                    S'ha arribat al token de final de text (EOS). El cicle de predicció s'atura i es mostra el resultat final.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between">
            <button 
              onClick={handlePrev}
              disabled={activeStep === 0}
              className="px-4 py-2 rounded-lg font-bold text-slate-600 hover:bg-slate-200 disabled:opacity-30 transition-colors"
            >
              Anterior
            </button>
            <button 
              onClick={handleNext}
              disabled={activeStep === steps.length - 1}
              className="px-6 py-2 bg-slate-800 text-white rounded-lg font-bold hover:bg-slate-700 disabled:opacity-30 transition-colors"
            >
              Següent pas
            </button>
          </div>
        </div>

        {/* Deep Dive Section: Hallucinations & Sycophancy */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Hallucinations */}
          <div className="bg-red-50 border border-red-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-red-800 font-bold text-xl flex items-center mb-4">
              <AlertTriangle className="mr-2" /> Per què al·lucinen?
            </h3>
            <div className="space-y-4">
              {hallucinationsData.map((item, idx) => (
                <div key={idx} className="bg-white/60 p-3 rounded-lg border border-red-200">
                  <h4 className="font-bold text-red-900 text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-red-800/80 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-red-800 text-white rounded-lg text-xs italic">
              "El model no pensa, simplement prediu quina paraula 'sona' millor segons l'estadística."
            </div>
          </div>

          {/* Sycophancy */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-blue-800 font-bold text-xl flex items-center mb-4">
              <ThumbsUp className="mr-2" /> Sycophancy (Submissió)
            </h3>
            <div className="space-y-4">
              <div className="bg-white/60 p-3 rounded-lg border border-blue-200">
                <h4 className="font-bold text-blue-900 text-sm mb-1">L'entrenament humà (RLHF)</h4>
                <p className="text-xs text-blue-800/80 leading-relaxed">
                  Els humans puntuem millor les respostes amables. El model aprèn que "agradar" és part de l'objectiu.
                </p>
              </div>
              <div className="bg-white/60 p-3 rounded-lg border border-blue-200">
                <h4 className="font-bold text-blue-900 text-sm mb-1">El pes del Prompt</h4>
                <p className="text-xs text-blue-800/80 leading-relaxed">
                  Si dius que la Terra és plana, el mecanisme d'atenció es fixa en aquest biaix i intenta mantenir la coherència amb el que demanes.
                </p>
              </div>
              <div className="bg-white/60 p-3 rounded-lg border border-blue-200">
                <h4 className="font-bold text-blue-900 text-sm mb-1">Mirall de Context</h4>
                <p className="text-xs text-blue-800/80 leading-relaxed">
                  Sense conviccions pròpies, el model simplement reflecteix l'opinió que l'usuari projecta.
                </p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-800 text-white rounded-lg text-xs italic">
              "Si el context està esbiaixat, la resposta es decantarà cap a aquest biaix per pur càlcul probabilístic."
            </div>
          </div>
        </div>

        <footer className="text-center text-slate-400 text-sm pb-12">
          Creat per explicar la ciència dels models de llenguatge a través del disseny.
        </footer>
      </div>
    </div>
  );
};

export default App;
