import React, { useState, useEffect } from 'react';
import {
  ArrowRight, CheckCircle, Users, Clock, TrendingUp, RefreshCw, Puzzle, TrendingDown, Calendar,
  Mail, AlertCircle, Zap, DollarSign, BarChart3, Headphones, Repeat, Target, Building2, CreditCard,
  Gift, LineChart, Briefcase, ShoppingCart, Cpu, Database, MessageSquare, FileText, Settings,
  CheckCircle2, Phone, Linkedin, ChevronDown, Menu, X, Star, Quote, MessageCircle, Instagram,
  Plus, Minus, Heart, Home, Stethoscope, UserCheck, BookOpen, Store
} from 'lucide-react';

interface FormData {
  name: string;
  whatsapp: string;
  email: string;
  company: string;
  segment: string;
  website: string;
  revenue: string;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    whatsapp: '',
    email: '',
    company: '',
    segment: '',
    website: '',
    revenue: ''
  });

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVH();
    window.addEventListener('resize', setVH);
    const timer = setTimeout(() => setIsVisible(true), 500);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepIndex = parseInt(entry.target.getAttribute('data-step') || '0');
            setVisibleSteps((prev) => [...prev, stepIndex]);
          }
        });
      },
      { threshold: 0.3 }
    );
    const steps = document.querySelectorAll('[data-step]');
    steps.forEach((step) => observer.observe(step));

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', setVH);
      clearTimeout(timer);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const WEBHOOK_URL = 'https://webhook.site/028a3519-ec15-462e-b556-fe8f369a0791';
    const submitButton = e.currentTarget.querySelector('button[type="submit"]') as HTMLButtonElement;
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '⏳ Enviando...';
    submitButton.disabled = true;

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome: formData.name,
          whatsapp: formData.whatsapp,
          email: formData.email,
          empresa: formData.company,
          segmento: formData.segment,
          website: formData.website,
          faturamento: formData.revenue,
          timestamp: new Date().toISOString(),
          origem: 'landing-page-diagnostico'
        })
      });

      if (response.ok) {
        setIsFormSubmitted(true);
        console.log('Formulário enviado com sucesso!');
      } else {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      alert('❌ Ops! Houve um erro ao enviar o formulário. Tente novamente.');
    } finally {
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
    }
  };

  const scrollToForm = () => document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const toggleFAQ = (index: number) => setOpenFAQ(openFAQ === index ? null : index);
  return (
    <div className="min-h-screen bg-[#04020a] text-white relative overflow-hidden flex flex-col">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 bg-grid-pattern bg-grid opacity-20 animate-grid-glow pointer-events-none"></div>
      
      {/* Header */}
      <header className="fixed top-2 left-2 right-2 z-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-black/15 backdrop-blur-md border border-white/15 rounded-2xl px-4 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <button 
                onClick={scrollToTop}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <img 
                  src="https://i.imgur.com/saV9Lwr.png" 
                  alt="NOCTA.I Logo" 
                  className="h-8 w-auto"
                />
              </button>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-6 ml-6">
                <button 
                  onClick={scrollToTop}
                  className="text-white hover:text-[#6831f3] transition-colors font-medium"
                >
                  Início
                </button>
                
                {/* Dropdown */}
                <div className="relative">
                  <button 
                    className="flex items-center gap-1 text-white hover:text-[#6831f3] transition-colors font-medium"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                  >
                    Mais
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <div 
                    className={`absolute top-full left-0 mt-2 w-48 bg-black/90 backdrop-blur-md border border-white/15 rounded-lg shadow-xl transition-all duration-300 ${
                      isDropdownOpen 
                        ? 'opacity-100 visible translate-y-0' 
                        : 'opacity-0 invisible -translate-y-2'
                    }`}
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    <a href="#funcionalidades" className="block px-4 py-3 text-white hover:text-[#6831f3] hover:bg-white/5 transition-all duration-200 rounded-t-lg">
                      Funcionalidades
                    </a>
                    <a href="#como-funciona" className="block px-4 py-3 text-white hover:text-[#6831f3] hover:bg-white/5 transition-all duration-200">
                      Como funciona
                    </a>
                    <a href="#faq" className="block px-4 py-3 text-white hover:text-[#6831f3] hover:bg-white/5 transition-all duration-200">
                      Perguntas frequentes
                    </a>
                    <a href="#contato" className="block px-4 py-3 text-white hover:text-[#6831f3] hover:bg-white/5 transition-all duration-200 rounded-b-lg">
                      Contato
                    </a>
                  </div>
                </div>
              </nav>

              {/* CTA Button */}
              <button 
                onClick={scrollToForm}
                className="hidden md:block bg-[#6831f3] hover:bg-purple-600 px-6 py-2 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105"
              >
                Contrate
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-white"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="md:hidden bg-black/90 backdrop-blur-md border-t border-white/10 rounded-b-2xl animate-in slide-in-from-top-2 duration-300">
                <div className="px-4 py-4 space-y-4">
                  <button 
                    onClick={() => { scrollToTop(); setIsMenuOpen(false); }}
                    className="block w-full text-left text-white hover:text-[#6831f3] transition-colors font-medium"
                  >
                    Início
                  </button>
                  <a href="#funcionalidades" onClick={() => setIsMenuOpen(false)} className="block text-white hover:text-[#6831f3] transition-colors font-medium">
                    Funcionalidades
                  </a>
                  <a href="#como-funciona" onClick={() => setIsMenuOpen(false)} className="block text-white hover:text-[#6831f3] transition-colors font-medium">
                    Como funciona
                  </a>
                  <a href="#faq" onClick={() => setIsMenuOpen(false)} className="block text-white hover:text-[#6831f3] transition-colors font-medium">
                    Perguntas frequentes
                  </a>
                  <a href="#contato" onClick={() => setIsMenuOpen(false)} className="block text-white hover:text-[#6831f3] transition-colors font-medium">
                    Contato
                  </a>
                  <button 
                    onClick={() => { scrollToForm(); setIsMenuOpen(false); }}
                    className="w-full bg-[#6831f3] hover:bg-purple-600 px-6 py-2 rounded-lg font-semibold text-white transition-all duration-300"
                  >
                    Contrate
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/5511999999999"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-110"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-24 pb-20 overflow-hidden px-4">
          <div className="absolute inset-0 bg-gradient-to-br from-[#140037]/30 via-transparent to-[#6831f3]/10"></div>
          <div className="relative max-w-4xl mx-auto text-center">
            <div className="space-y-8">
              {/* Badge animado */}
              <div className={`inline-flex items-center gap-2 px-4 py-2 bg-nocta-dark-purple/60 backdrop-blur-sm border border-nocta-purple/30 rounded-full text-sm font-medium transition-all duration-700 hover:scale-105 hover:bg-nocta-dark-purple/80 hover:border-nocta-purple/60 hover:shadow-glow group ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}>
                <Zap className="w-4 h-4 text-nocta-purple animate-pulse group-hover:animate-bounce" />
                <span className="text-gray-300">IA para</span>
                <span className="bg-gradient-to-r from-nocta-purple to-purple-400 bg-clip-text text-transparent font-bold animate-pulse">Vender Mais</span>
              </div>

              <div className="space-y-6">
                <h1 className="text-3xl lg:text-5xl font-black leading-tight">
                  <span className="text-[#6831f3]">Automatize</span> seu comercial com <span className="text-[#6831f3]">IA personalizada</span> em uma operação 24/7
                </h1>
                <div className="h-1 w-20 bg-gradient-to-r from-[#6831f3] to-purple-400 mx-auto"></div>
                <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                  IA treinada para sua empresa vender mais, recuperar leads, agendar no automático e liberar seu time do repetitivo — <span className="text-[#6831f3] font-semibold">com atendimento humanizado e integração total.</span>
                </p>
              </div>
              
              <button 
                onClick={scrollToForm}
                className="group bg-gradient-to-r from-[#6831f3] to-purple-600 hover:from-purple-600 hover:to-[#6831f3] px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25 flex items-center gap-3 mx-auto"
              >
                <span>🚀 Quero Agendar Diagnóstico Gratuito</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Indicadores centralizados */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-12 max-w-4xl mx-auto">
                {[
                  { value: "+70%", text: "mais agendamentos" },
                  { value: "24h/dia", text: "atendimento sem parar" },
                  { value: "-80%", text: "trabalho manual reduzido" },
                  { value: "SDR IA", text: "qualificando leads" },
                  { value: "100%", text: "humanizado" }
                ].map((item, index) => (
                  <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                    <div className="text-2xl lg:text-3xl font-bold text-[#00ff88] mb-2">{item.value}</div>
                    <div className="text-gray-400 text-sm lg:text-base">{item.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section - RED CARDS */}
        <section className="py-20 bg-[#1d1d1d]/30 backdrop-blur-sm px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-black mb-12">
              Sua empresa ainda depende de <span className="text-[#6831f3]">processos manuais</span> para vender?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-visible">
              {[
                { icon: RefreshCw, text: "Vendedores sobrecarregados com WhatsApp e planilhas" },
                { icon: Puzzle, text: "Leads perdidos por falta de follow-up ou demora no atendimento" },
                { icon: TrendingDown, text: "Poucos agendamentos e baixa conversão" },
                { icon: Mail, text: "Closer recebendo lead frio ou desqualificado" },
                { icon: Calendar, text: "Sem previsibilidade no volume comercial" },
                { icon: AlertCircle, text: "Atendimento comercial travando o crescimento" }
              ].map((item, index) => (
                <div key={index} className="group relative bg-gradient-to-br from-red-500/30 to-red-600/30 border border-red-400/40 rounded-xl p-6 hover:border-red-400 transition-all duration-500 hover:scale-105 backdrop-blur-sm transform-gpu hover:z-20 hover:shadow-[0_0_40px_rgba(239,68,68,0.6)] overflow-visible">
                  {/* Overlay de brilho interno */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                  
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform group-hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]">
                      <item.icon className="w-6 h-6 text-red-400 group-hover:animate-pulse" />
                    </div>
                    <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 text-sm lg:text-base font-medium">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CLT Costs Section */}
        <section className="py-20 bg-[#04020a] px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-black mb-2">
                <span className="text-white">VEJA A DIFERENÇA DE CUSTOS:</span>
              </h2>
              <h3 className="text-2xl lg:text-3xl font-bold">
                <span className="text-red-400">FUNCIONÁRIO</span> <span className="text-red-400">CLT</span> VS <span className="text-green-400">INTELIGÊNCIA ARTIFICIAL</span>
              </h3>
              <p className="text-gray-300 mt-4 max-w-3xl mx-auto">
                Entenda o peso de manter um atendente tradicional CLT, com altos custos fixos, baixa escalabilidade e diversas limitações operacionais.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 overflow-visible">
              {[
                { value: "R$ 2.000", title: "Média de salário bruto mensal", subtitle: "Mesmo que produza pouco, o custo continua alto todo mês." },
                { value: "+ R$ 1.000", title: "INSS, FGTS, Férias, 13º", subtitle: "Você paga para contratar, manter e ainda para demitir." },
                { value: "R$ 400", title: "em infraestrutura", subtitle: "Computador, energia, internet e espaço físico" },
                { value: "Limite de 8h", title: "por dia", subtitle: "Sem finais de semana, feriados ou virada de plantão" },
                { value: "Rotatividade", title: "e Treinamento", subtitle: "Perde um, começa tudo do zero" },
                { value: "Falta de", title: "Padronização", subtitle: "Cada atendente responde de um jeito" }
              ].map((item, index) => (
                <div key={index} className="group relative bg-gradient-to-br from-red-500/30 to-red-600/30 border border-red-400/40 rounded-xl p-6 hover:border-red-400 transition-all duration-500 hover:scale-105 backdrop-blur-sm transform-gpu hover:z-20 hover:shadow-[0_0_40px_rgba(239,68,68,0.6)] overflow-visible">
                  {/* Overlay de brilho interno */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                  
                  <div className="relative z-10">
                    <div className="text-2xl lg:text-3xl font-bold text-red-400 group-hover:text-red-300 transition-colors duration-300 mb-2">{item.value}</div>
                    <div className="text-lg font-semibold text-white group-hover:text-red-200 transition-colors duration-300 mb-2">{item.title}</div>
                    <div className="text-gray-400 group-hover:text-gray-200 transition-colors duration-300 text-sm">{item.subtitle}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center bg-gradient-to-br from-red-900/30 to-red-800/20 border border-red-500/40 rounded-2xl p-8 backdrop-blur-sm">
              <div className="text-4xl lg:text-5xl font-black text-red-400 mb-4">💸 R$ 40.800</div>
              <div className="text-xl font-bold text-white mb-4">Média de gastos anuais somente com 1 funcionário.</div>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Esse é o custo anual de apenas 1 funcionário. E com apenas 1 pessoa você não vai escalar vendas. Na prática, precisaria de 3 a 5 pessoas — multiplicando tudo.
              </p>
            </div>
          </div>
        </section>

        {/* AI Power Section */}
        <section className="py-20 bg-gradient-to-br from-green-900/20 to-emerald-800/10 backdrop-blur-sm px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-black mb-6 text-green-400">
                O Poder da IA e Automação
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Enquanto o mundo dorme, sua IA continua vendendo, atendendo e entregando experiência de alto nível — com empatia, velocidade e inteligência.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 overflow-visible">
              {[
                { value: "+30%", title: "Aumento direto no faturamento", icon: TrendingUp },
                { value: "Tempo Livre", title: "Para focar no que realmente importa", icon: Clock },
                { value: "+40%", title: "a mais de conversão no final do mês", icon: Target },
                { value: "24h/dia", title: "Atendimento sem limites", subtitle: "Sem descanso, sem falhas e sem reclamações", icon: Zap },
                { value: "94%", title: "de satisfação", subtitle: "Clientes bem atendidos e casos resolvidos", icon: CheckCircle },
                { value: "+1.000", title: "Atendimentos Diários", subtitle: "sem aumento de equipe", icon: Users }
              ].map((item, index) => (
                <div key={index} className="group relative bg-gradient-to-br from-green-500/30 to-green-600/30 border border-green-400/40 rounded-xl p-6 hover:border-green-400 transition-all duration-500 hover:scale-105 backdrop-blur-sm transform-gpu hover:z-20 hover:shadow-[0_0_40px_rgba(34,197,94,0.6)] overflow-visible">
                  {/* Overlay de brilho interno */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-green-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                  
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform group-hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]">
                      <item.icon className="w-6 h-6 text-green-400 group-hover:animate-pulse" />
                    </div>
                    <div className="text-2xl lg:text-3xl font-bold text-green-400 group-hover:text-green-300 transition-colors duration-300 mb-2">{item.value}</div>
                    <div className="text-lg font-semibold text-white group-hover:text-green-200 transition-colors duration-300 mb-2">{item.title}</div>
                    {item.subtitle && <div className="text-gray-400 group-hover:text-gray-200 transition-colors duration-300 text-sm">{item.subtitle}</div>}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center bg-gradient-to-br from-green-900/30 to-emerald-800/20 border border-green-500/40 rounded-2xl p-8 backdrop-blur-sm">
              <div className="text-2xl lg:text-3xl font-bold text-green-400 mb-4">100% Humanizado</div>
              <div className="text-xl text-white mb-4">Totalmente personalizado de acordo com sua empresa</div>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Você ainda tem dúvidas se a IA mudaria a sua operação? Agora imagine ter tudo isso, sem dor de cabeça, por um valor simbólico.
              </p>
            </div>
          </div>
        </section>


        {/* Benefits Section */}
        <section className="py-20 bg-[#04020a] px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-black mb-12">
              Resultados que você sente ainda no <span className="text-[#6831f3]">primeiro mês</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-visible">
              {[
                { icon: Target, text: "+70% mais agendamentos com leads quentes", color: "text-green-400" },
                { icon: Clock, text: "Atendimento 24h sem custo adicional", color: "text-blue-400" },
                { icon: TrendingDown, text: "Redução de até 80% no trabalho manual do time comercial", color: "text-yellow-400" },
                { icon: UserCheck, text: "SDR IA qualificando leads com linguagem natural", color: "text-purple-400" },
                { icon: Zap, text: "Closer focado só em fechar, sem ruído operacional", color: "text-cyan-400" },
                { icon: RefreshCw, text: "Leads inativos sendo reativados automaticamente", color: "text-green-400" }
              ].map((item, index) => (
                <div key={index} className="group relative bg-gradient-to-br from-[#140037]/40 to-[#1d1d1d]/60 border border-[#6831f3]/30 rounded-xl p-6 hover:border-[#6831f3] transition-all duration-500 hover:scale-105 backdrop-blur-sm transform-gpu hover:z-20 hover:shadow-glow-lg overflow-visible">
                  {/* Overlay de brilho interno */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#6831f3]/0 via-[#6831f3]/5 to-[#6831f3]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                  
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-[#6831f3]/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <item.icon className={`w-6 h-6 ${item.color} group-hover:animate-pulse`} />
                    </div>
                    <p className="font-semibold text-gray-200 group-hover:text-white transition-colors duration-300 text-sm lg:text-base">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Target Audience */}
        <section id="funcionalidades" className="py-20 bg-gradient-to-br from-[#140037]/30 to-[#1d1d1d]/50 backdrop-blur-sm px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-black mb-12">
              Projetado para empresas que vendem 1:1 e querem <span className="text-[#6831f3]">escalar com eficiência</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-visible">
              {[
                { icon: Stethoscope, title: "Clínicas e consultórios", color: "from-blue-500 to-cyan-600" },
                { icon: Home, title: "Imobiliárias", color: "from-green-500 to-emerald-600" },
                { icon: LineChart, title: "Seguradoras", color: "from-yellow-500 to-orange-600" },
                { icon: BookOpen, title: "Infoprodutores e E-commerces", color: "from-purple-500 to-indigo-600" },
                { icon: Store, title: "Profissional autônomo", color: "from-teal-500 to-green-600" },
                { icon: Users, title: "Empresas com atendimento ao cliente", color: "from-pink-500 to-rose-600" }
              ].map((item, index) => (
                <div key={index} className="group relative bg-gradient-to-br from-[#140037]/40 to-[#1d1d1d]/60 border border-[#6831f3]/30 rounded-xl p-6 hover:border-[#6831f3] transition-all duration-500 hover:scale-105 backdrop-blur-sm transform-gpu hover:z-20 hover:shadow-glow-lg overflow-visible">
                  {/* Overlay de brilho interno */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#6831f3]/0 via-[#6831f3]/5 to-[#6831f3]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                  
                  <div className="relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-lg group-hover:text-[#6831f3] transition-colors duration-300">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Differentials Section */}
        <section className="py-20 bg-[#04020a] px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-black mb-6">
                Porque empresas modernas escolhem escalar com <span className="text-[#6831f3]">IA de verdade</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-visible">
              {[
                { icon: Target, title: "IA treinada por nicho com linguagem humanizada", color: "from-green-500 to-emerald-600" },
                { icon: MessageSquare, title: "SDR IA + agendamento + follow-up automático", color: "from-blue-500 to-cyan-600" },
                { icon: FileText, title: "Scripts comerciais personalizados para cada operação", color: "from-yellow-500 to-orange-600" },
                { icon: MessageCircle, title: "Funil de vendas 1:1 no WhatsApp sem parecer robô", color: "from-purple-500 to-pink-600" },
                { icon: Database, title: "Integração com CRM, Google Agenda, plataformas comerciais", color: "from-indigo-500 to-purple-600" },
                { icon: CheckCircle, title: "Diagnóstico gratuito e fechamento consultivo", color: "from-teal-500 to-green-600" }
              ].map((item, index) => (
                <div key={index} className="group relative bg-gradient-to-br from-[#140037]/40 to-[#1d1d1d]/60 border border-[#6831f3]/30 rounded-xl p-6 hover:border-[#6831f3] transition-all duration-500 hover:scale-105 hover:shadow-glow-lg backdrop-blur-sm transform-gpu hover:z-20 overflow-visible">
                  {/* Overlay de brilho interno */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#6831f3]/0 via-[#6831f3]/5 to-[#6831f3]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                  
                  <div className="relative z-10">
                    <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="font-semibold text-gray-200 group-hover:text-white transition-colors text-sm lg:text-base">{item.title}</p>
                    <CheckCircle className="w-5 h-5 text-[#6831f3] mt-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gradient-to-br from-[#140037]/30 to-[#1d1d1d]/50 backdrop-blur-sm px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-black mb-12">
              Empresas que já escalam suas vendas com a <span className="text-[#6831f3]">NOCTA.I</span>
            </h2>
            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Clínica Vital Mais",
                  company: "Clínica de Estética",
                  text: "Antes da NOCTA.I, perdíamos muitos pacientes por falta de resposta. Agora temos atendimento imediato e follow-ups automáticos. Nossas agendas vivem cheias.",
                  rating: 5
                },
                {
                  name: "ImobPrime",
                  company: "Imobiliária",
                  text: "A IA da NOCTA qualificou nossos leads e automatizou os agendamentos. Em uma semana já tínhamos triplicado a taxa de visitas.",
                  rating: 5
                },
                {
                  name: "Mentoria Gama Pro",
                  company: "Infoprodutor",
                  text: "O volume de leads que respondem nos primeiros 5 minutos aumentou muito. Tudo sem precisar de operador humano.",
                  rating: 5
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-gradient-to-br from-[#1d1d1d]/80 to-[#04020a]/50 border border-[#6831f3]/20 rounded-xl p-8 hover:border-[#6831f3]/40 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                  <div className="flex items-center justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-[#6831f3] mb-4 mx-auto" />
                  <p className="text-gray-300 mb-6 italic text-sm lg:text-base">"{testimonial.text}"</p>
                  <div className="border-t border-gray-600 pt-4">
                    <div className="font-bold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.company}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Strategic Form Section */}
<section id="formulario" className="py-20 bg-[#04020a] px-4">
  <div className="max-w-4xl mx-auto">
    <div className="bg-gradient-to-br from-[#1d1d1d]/80 to-[#04020a]/50 border border-[#6831f3]/20 rounded-2xl p-8 backdrop-blur-sm">
      <div className="text-center mb-8">
        <h2 className="text-2xl lg:text-3xl font-black mb-4">
          Quer ver o que sua empresa <span className="text-[#6831f3]">pode automatizar</span>?
        </h2>
        <p className="text-gray-300">
          Responda algumas perguntas e receba um diagnóstico real com soluções aplicáveis.
        </p>
      </div>

      {isFormSubmitted ? (
        <div className="text-center py-12">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-green-400 mb-2">✅ Sucesso!</h3>
          <p className="text-gray-300">
            🕑 Em alguns segundos você vai receber uma mensagem no WhatsApp com os próximos passos do seu diagnóstico.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nome / WhatsApp */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Qual o seu nome? *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-[#04020a] border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-[#6831f3] focus:ring-2 focus:ring-[#6831f3]/20 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Qual o seu WhatsApp? *</label>
              <input
                type="tel"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleInputChange}
                className="w-full bg-[#04020a] border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-[#6831f3] focus:ring-2 focus:ring-[#6831f3]/20 transition-all"
                placeholder="(11) 99999-9999"
                required
              />
            </div>
          </div>

          {/* E-mail / Empresa */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Qual o seu melhor e-mail? *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-[#04020a] border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-[#6831f3] focus:ring-2 focus:ring-[#6831f3]/20 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Qual o nome da sua empresa *</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full bg-[#04020a] border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-[#6831f3] focus:ring-2 focus:ring-[#6831f3]/20 transition-all"
                required
              />
            </div>
          </div>

          {/* Segmento / Site */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Qual o segmento? *</label>
              <input
                type="text"
                name="segment"
                value={formData.segment}
                onChange={handleInputChange}
                className="w-full bg-[#04020a] border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-[#6831f3] focus:ring-2 focus:ring-[#6831f3]/20 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Link do site ou Instagram</label>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="w-full bg-[#04020a] border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-[#6831f3] focus:ring-2 focus:ring-[#6831f3]/20 transition-all"
                placeholder="https://..."
              />
            </div>
          </div>

          {/* Faixa de faturamento */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Faixa de faturamento mensal</label>
            <select
              name="revenue"
              value={formData.revenue}
              onChange={handleInputChange}
              className="w-full bg-[#04020a] border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-[#6831f3] focus:ring-2 focus:ring-[#6831f3]/20 transition-all"
            >
              <option value="">Selecione uma opção</option>
              <option value="0-30k">R$ 0 - R$30.000</option>
              <option value="30-50k">R$30.000 - R$50.000</option>
              <option value="50-100k">R$50.000 - R$100.000</option>
              <option value="100-500k">R$100.000 - R$300.000</option>
              <option value="500k+">R$500.000 +</option>
            </select>
          </div>

          {/* Botão de envio */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#6831f3] to-purple-600 hover:from-purple-600 hover:to-[#6831f3] px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25 flex items-center justify-center gap-3"
          >
            <span>🚀 Enviar e Agendar Diagnóstico</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      )}
    </div>
  </div>
</section>


{/* Framework Section */}
<section id="como-funciona" className="py-20 bg-gradient-to-br from-[#140037]/30 to-[#1d1d1d]/50 backdrop-blur-sm px-4">
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-3xl lg:text-4xl font-black mb-6">
        Framework <span className="text-[#6831f3]">NOCTA.I SALES AI</span>
      </h2>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-visible">
      {[
        { step: "1", title: "Diagnóstico", subtitle: "Estratégico Comercial", icon: FileText },
        { step: "2", title: "Arquitetura", subtitle: "do Funil e Fluxos", icon: BarChart3 },
        { step: "3", title: "Criação", subtitle: "de SDRs IA personalizados", icon: Cpu },
        { step: "4", title: "Integração", subtitle: "com CRM, agendas e canais", icon: Database },
        { step: "5", title: "Treinamento", subtitle: "com scripts e dados reais", icon: Users },
        { step: "6", title: "Testes", subtitle: "de resposta e validação com leads", icon: CheckCircle2 },
        { step: "7", title: "Go Live", subtitle: "Funil de vendas IA rodando", icon: Zap },
        { step: "8", title: "Otimizações", subtitle: "semanais com IA Learning", icon: TrendingUp }
      ].map((item, index) => (
        <div 
          key={index} 
          className={`group relative transition-all duration-700 overflow-visible ${
            visibleSteps.includes(index) 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
          data-step={index}
        >
          <div className="group relative bg-gradient-to-br from-[#140037]/40 to-[#1d1d1d]/60 border border-[#6831f3]/30 rounded-xl p-6 hover:border-[#6831f3] transition-all duration-500 hover:scale-105 backdrop-blur-sm transform-gpu hover:z-20 hover:shadow-glow-lg overflow-visible">
            {/* Overlay Glow Interno */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#6831f3]/0 via-[#6831f3]/5 to-[#6831f3]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>

            {/* Conteúdo */}
            <div className="relative z-10 text-center">
              <div className="w-12 h-12 bg-[#6831f3]/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <item.icon className="w-6 h-6 text-white group-hover:animate-pulse" />
              </div>
              <div className="text-sm text-[#6831f3] font-bold mb-1">ETAPA {item.step}</div>
              <h3 className="font-bold text-lg mb-2 text-white">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.subtitle}</p>
            </div>
          </div>

          {/* Linha Conectora */}
          {index < 7 && (
            <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-[#6831f3] to-transparent"></div>
          )}
        </div>
      ))}
    </div>
  </div>
</section>

        {/* About NOCTA.I Section */}
        <section className="py-20 bg-gradient-to-br from-[#140037]/30 to-[#1d1d1d]/50 backdrop-blur-sm px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <img 
                src="https://i.imgur.com/saV9Lwr.png" 
                alt="NOCTA.I Logo" 
                className="h-16 w-auto mx-auto mb-8"
              />
            </div>
            
            <div className="max-w-4xl mx-auto space-y-8 text-lg leading-relaxed">
              <p className="text-gray-300">
                Fundada em <span className="text-[#6831f3] font-semibold">2024</span>, a NOCTA.I nasceu com uma visão clara: romper com a automação robótica, engessada e genérica do mercado — e entregar <span className="text-[#6831f3] font-semibold">inteligência real</span>, com <span className="text-[#6831f3] font-semibold">personalização humana</span> e <span className="text-[#6831f3] font-semibold">resultado validado</span>.
              </p>
              
              <p className="text-gray-300">
                Nós <span className="text-red-500 font-bold">NÃO</span> criamos chatbots de opção 1, 2 ou 3.<br />
                Criamos <span className="text-[#6831f3] font-semibold">agentes de IA</span> capazes de <span className="text-[#6831f3] font-semibold">entender, conversar, agir e escalar</span>, como se fossem membros estratégicos da sua equipe — só que disponíveis <span className="text-[#6831f3] font-semibold">24 horas por dia, 7 dias por semana</span>, sem erro e sem descanso.
              </p>

              <div className="bg-gradient-to-br from-[#1d1d1d]/80 to-[#140037]/50 border border-[#6831f3]/20 rounded-2xl p-8 backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-6 text-center">Produtos NOCTA.I</h3>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-[#6831f3] pl-6">
                    <h4 className="text-xl font-bold text-[#6831f3] mb-2">🚀 NOCTA.I SALES AI™ — IA para Vendas e Atendimento</h4>
                    <p className="text-gray-300 mb-2">
                      Ideal para empresas que querem <span className="text-[#6831f3] font-semibold">escalar comercial</span>, <span className="text-[#6831f3] font-semibold">recuperar leads perdidos</span>, liberar o time humano do operacional e <span className="text-[#6831f3] font-semibold">vender no automático</span>, sem perder o toque humano.
                    </p>
                    <p className="text-gray-400 text-sm">
                      Utilizado por clínicas, infoprodutores, imobiliárias, e-commerces e negócios de atendimento direto.
                    </p>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-6">
                    <h4 className="text-xl font-bold text-purple-400 mb-2">🔧 NOCTA.I OPS AI™ — IA para Operação e Automação Profunda</h4>
                    <p className="text-gray-300 mb-2">
                      Desenvolvido para empresas com <span className="text-purple-400 font-semibold">grande carga operacional</span>, <span className="text-purple-400 font-semibold">alto volume de processos</span> e <span className="text-purple-400 font-semibold">múltiplos sistemas a integrar</span>.
                    </p>
                    <p className="text-gray-400 text-sm">
                      Aqui, a IA atua nos bastidores — automatizando CRMs, integrações por API, planilhas, processos administrativos e fluxos financeiros.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <p className="text-gray-300">
                  Cada projeto NOCTA.I é entregue com um <span className="text-[#6831f3] font-semibold">framework proprietário</span>, que garante <span className="text-[#6831f3] font-semibold">implantação personalizada</span>, <span className="text-[#6831f3] font-semibold">validação prática</span> e <span className="text-[#6831f3] font-semibold">performance mensurável</span> em até 20 dias.
                </p>
                
                <div className="space-y-2 text-xl font-bold">
                  <p className="text-[#6831f3]">Mais do que vender IA, entregamos operações completas que funcionam com inteligência real.</p>
                  <p className="text-white">Essa é a nossa essência.</p>
                  <p className="text-[#6831f3]">Esse é o novo padrão de automação.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-[#04020a] px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-black mb-6">
                Perguntas <span className="text-[#6831f3]">Frequentes</span>
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  question: "Quanto tempo leva para implementar a IA na minha empresa?",
                  answer: "Nosso framework proprietário garante implementação completa em até 20 dias. Isso inclui diagnóstico, arquitetura do funil, criação dos SDRs IA, integração com seus sistemas, treinamento e validação operacional."
                },
                {
                  question: "A IA da NOCTA.I funciona com meus sistemas atuais?",
                  answer: "Sim! Nossa IA se integra via API, webhooks e conectores nativos com CRMs, Google Agenda, WhatsApp Business, plataformas de vendas e praticamente qualquer sistema que sua empresa já utiliza."
                },
                {
                  question: "Qual a diferença entre NOCTA.I SALES AI e outros chatbots do mercado?",
                  answer: "Não criamos chatbots genéricos. Desenvolvemos SDRs de IA treinados especificamente para sua operação comercial, capazes de qualificar leads, agendar reuniões, fazer follow-ups e operar com total autonomia 24/7."
                },
                {
                  question: "Preciso ter conhecimento técnico para usar a solução?",
                  answer: "Não! Entregamos tudo configurado e funcionando. Sua equipe recebe treinamento completo e suporte contínuo. A IA opera de forma transparente, sem necessidade de conhecimento técnico avançado."
                },
                {
                  question: "Qual o investimento necessário para implementar a NOCTA.I SALES AI?",
                  answer: "O investimento varia conforme a complexidade da sua operação comercial e sistemas a integrar. Oferecemos um diagnóstico gratuito onde apresentamos uma proposta personalizada com ROI projetado para sua realidade específica."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-gradient-to-br from-[#1d1d1d]/80 to-[#04020a]/50 border border-[#6831f3]/20 rounded-xl backdrop-blur-sm overflow-hidden">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                  >
                    <h3 className="text-lg font-bold text-[#6831f3] pr-4">{faq.question}</h3>
                    <div className="flex-shrink-0">
                      {openFAQ === index ? (
                        <Minus className="w-5 h-5 text-[#6831f3] transition-transform duration-200" />
                      ) : (
                        <Plus className="w-5 h-5 text-[#6831f3] transition-transform duration-200" />
                      )}
                    </div>
                  </button>
                  <div className={`transition-all duration-300 ease-in-out ${
                    openFAQ === index 
                      ? 'max-h-96 opacity-100' 
                      : 'max-h-0 opacity-0'
                  } overflow-hidden`}>
                    <div className="px-6 pb-4">
                      <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-br from-[#140037]/30 to-[#1d1d1d]/50 backdrop-blur-sm px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-black mb-6">
              Pronto para automatizar seu comercial com <span className="text-[#6831f3]">IA em 20 dias</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              A IA que vai executar suas vendas com inteligência já pode estar rodando no mês 1.
              Vamos te mostrar exatamente como.
            </p>
            <button 
              onClick={scrollToForm}
              className="bg-gradient-to-r from-[#6831f3] to-purple-600 hover:from-purple-600 hover:to-[#6831f3] px-12 py-6 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25 flex items-center gap-3 mx-auto"
            >
              <span>🚀 Agendar Diagnóstico Estratégico Gratuito</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contato" className="bg-[#140037]/50 py-12 border-t border-[#6831f3]/20 backdrop-blur-sm px-4 mt-auto">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="https://i.imgur.com/saV9Lwr.png" 
                  alt="NOCTA.I Logo" 
                  className="h-10 w-auto"
                />
                <span className="text-2xl font-black">SALES AI</span>
              </div>
              <p className="text-gray-400 mb-4">
                Automação comercial com IA personalizada.
              </p>
              <div className="flex items-center gap-4 mb-4">
                <Mail className="w-5 h-5 text-[#6831f3]" />
                <span className="text-gray-300">sales@noctai.com.br</span>
              </div>
              <div className="flex items-center gap-4">
                <a 
                  href="https://wa.me/5511999999999" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-green-400 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp</span>
                </a>
                <a 
                  href="https://instagram.com/noct.ai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-pink-400 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                  <span>Instagram</span>
                </a>
                <a 
                  href="https://linkedin.com/company/noctai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Links Rápidos</h4>
              <div className="space-y-2">
                <button onClick={scrollToTop} className="block text-gray-400 hover:text-white transition-colors">Home</button>
                <a href="#funcionalidades" className="block text-gray-400 hover:text-white transition-colors">Funcionalidades</a>
                <a href="#como-funciona" className="block text-gray-400 hover:text-white transition-colors">Como funciona</a>
                <a href="#faq" className="block text-gray-400 hover:text-white transition-colors">FAQ</a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Outros Produtos</h4>
              <div className="space-y-3">
                <a 
                  href="https://ops.noctai.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 bg-[#1d1d1d]/50 rounded-lg border border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300 hover:scale-105"
                >
                  <div className="text-purple-400 font-bold">🔧 NOCTA.I OPS AI™</div>
                  <div className="text-sm text-gray-400">IA para Operação e Automação</div>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-[#6831f3]/20 mt-8 pt-8 text-center">
            <p className="text-gray-400">Copyright © 2025 NOCTA.I SALES AI. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default App;
