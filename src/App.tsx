import React, { useState } from 'react';
import { 
  Bot, 
  MessageSquare, 
  TrendingUp, 
  Clock, 
  Users, 
  CheckCircle, 
  ArrowRight, 
  Star,
  Zap,
  Target,
  BarChart3,
  Calendar,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.name.trim()) {
      errors.name = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Email inválido';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Telefone é obrigatório';
    } else if (!/^[\d\s\(\)\-\+]+$/.test(formData.phone)) {
      errors.phone = 'Telefone inválido';
    }

    if (!formData.company.trim()) {
      errors.company = 'Empresa é obrigatória';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://manuela.noctai.com.br/webhook-test/32577b32-30d4-4f63-b080-288973ec4810', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: formData.message,
          source: 'NOCTA.I SALES AI Landing Page',
          timestamp: new Date().toISOString(),
          lead_type: 'contact_form'
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: ''
        });
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#04020a] text-white overflow-x-hidden">
      {/* Background Grid */}
      <div className="fixed inset-0 bg-grid-pattern bg-grid opacity-20 animate-grid-glow pointer-events-none"></div>
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Bot className="h-8 w-8 text-[#6831f3]" />
              <span className="text-xl font-bold">NOCTA.I SALES AI™</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('features')} className="text-gray-300 hover:text-white transition-colors">
                Recursos
              </button>
              <button onClick={() => scrollToSection('benefits')} className="text-gray-300 hover:text-white transition-colors">
                Benefícios
              </button>
              <button onClick={() => scrollToSection('testimonials')} className="text-gray-300 hover:text-white transition-colors">
                Depoimentos
              </button>
              <button onClick={() => scrollToSection('contact')} className="bg-[#6831f3] hover:bg-purple-600 px-6 py-2 rounded-lg transition-colors">
                Contato
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/10">
              <div className="px-4 py-4 space-y-4">
                <button onClick={() => scrollToSection('features')} className="block text-gray-300 hover:text-white transition-colors">
                  Recursos
                </button>
                <button onClick={() => scrollToSection('benefits')} className="block text-gray-300 hover:text-white transition-colors">
                  Benefícios
                </button>
                <button onClick={() => scrollToSection('testimonials')} className="block text-gray-300 hover:text-white transition-colors">
                  Depoimentos
                </button>
                <button onClick={() => scrollToSection('contact')} className="block bg-[#6831f3] hover:bg-purple-600 px-6 py-2 rounded-lg transition-colors text-center">
                  Contato
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-[#6831f3]/20 border border-[#6831f3]/30 rounded-full mb-6">
              <Zap className="h-4 w-4 text-[#6831f3] mr-2" />
              <span className="text-sm font-medium">IA Treinada para Vender Mais</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-black mb-6 leading-tight">
              Automatize seu Comercial com{' '}
              <span className="bg-gradient-to-r from-[#6831f3] to-purple-400 bg-clip-text text-transparent">
                IA Personalizada
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transforme seu atendimento e vendas em uma operação 24/7 com performance real. 
              IA treinada especificamente para seu negócio em apenas 20 dias.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-[#6831f3] hover:bg-purple-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-glow-lg hover:scale-105"
              >
                Quero Automatizar Agora
                <ArrowRight className="inline-block ml-2 h-5 w-5" />
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className="border border-[#6831f3]/30 hover:border-[#6831f3] px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-white/5"
              >
                Ver Como Funciona
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#6831f3] mb-2">300%</div>
              <div className="text-sm text-gray-400">Aumento em Conversões</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#6831f3] mb-2">24/7</div>
              <div className="text-sm text-gray-400">Atendimento Ativo</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#6831f3] mb-2">85%</div>
              <div className="text-sm text-gray-400">Leads Recuperados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#6831f3] mb-2">20</div>
              <div className="text-sm text-gray-400">Dias para Implementar</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Como a NOCTA.I SALES AI™ 
              <span className="text-[#6831f3]"> Revoluciona</span> Suas Vendas
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Nossa IA não é genérica. É treinada especificamente para seu negócio, 
              conhece seus produtos e fala como sua equipe.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-[#1d1d1d]/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-[#6831f3]/40 transition-all duration-300 group">
              <div className="bg-[#6831f3]/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MessageSquare className="h-8 w-8 text-[#6831f3]" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Atendimento Humanizado 24/7</h3>
              <p className="text-gray-300 mb-6">
                Responde leads instantaneamente, qualifica prospects e agenda reuniões 
                automaticamente, mesmo quando você está dormindo.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  Resposta em menos de 30 segundos
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  Qualificação automática de leads
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  Agendamento direto na agenda
                </li>
              </ul>
            </div>

            <div className="bg-[#1d1d1d]/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-[#6831f3]/40 transition-all duration-300 group">
              <div className="bg-[#6831f3]/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="h-8 w-8 text-[#6831f3]" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Recuperação Inteligente de Leads</h3>
              <p className="text-gray-300 mb-6">
                Identifica leads frios e executa sequências personalizadas de reativação 
                com base no comportamento e histórico de cada prospect.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  Análise comportamental avançada
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  Sequências de follow-up automáticas
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  Personalização em massa
                </li>
              </ul>
            </div>

            <div className="bg-[#1d1d1d]/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-[#6831f3]/40 transition-all duration-300 group">
              <div className="bg-[#6831f3]/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="h-8 w-8 text-[#6831f3]" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Analytics e Otimização Contínua</h3>
              <p className="text-gray-300 mb-6">
                Dashboard completo com métricas de performance, insights de conversão 
                e otimização automática baseada em dados reais.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  Métricas de conversão em tempo real
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  Otimização automática de scripts
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  Relatórios detalhados de ROI
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-4 lg:px-8 bg-gradient-to-br from-[#140037]/30 to-[#04020a]/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Resultados que Você Pode 
              <span className="text-[#6831f3]"> Esperar</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Empresas que implementaram nossa solução viram transformações reais 
              em suas operações comerciais.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-500/30 to-green-600/30 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="h-10 w-10 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-green-400 mb-2">+300%</h3>
              <p className="text-gray-300 font-medium mb-2">Aumento em Conversões</p>
              <p className="text-sm text-gray-400">
                Leads qualificados e atendidos instantaneamente resultam em mais vendas
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-500/30 to-cyan-600/30 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Clock className="h-10 w-10 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-blue-400 mb-2">90%</h3>
              <p className="text-gray-300 font-medium mb-2">Redução no Tempo de Resposta</p>
              <p className="text-sm text-gray-400">
                De horas para segundos - nunca mais perca um lead por demora
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-500/30 to-pink-600/30 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-10 w-10 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-purple-400 mb-2">85%</h3>
              <p className="text-gray-300 font-medium mb-2">Leads Recuperados</p>
              <p className="text-sm text-gray-400">
                Reative prospects frios com sequências inteligentes e personalizadas
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-yellow-500/30 to-orange-600/30 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Target className="h-10 w-10 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold text-yellow-400 mb-2">24/7</h3>
              <p className="text-gray-300 font-medium mb-2">Operação Contínua</p>
              <p className="text-sm text-gray-400">
                Sua equipe comercial nunca para, mesmo quando você não está trabalhando
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              O que Nossos Clientes 
              <span className="text-[#6831f3]"> Estão Dizendo</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Resultados reais de empresas que transformaram suas vendas com nossa IA.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#1d1d1d]/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 italic">
                "Em 30 dias, nossa taxa de conversão aumentou 280%. A IA responde leads 
                mais rápido que nossa equipe e com qualidade superior."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-[#6831f3] to-purple-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">RC</span>
                </div>
                <div>
                  <div className="font-semibold">Rafael Costa</div>
                  <div className="text-sm text-gray-400">CEO, TechSolutions</div>
                </div>
              </div>
            </div>

            <div className="bg-[#1d1d1d]/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 italic">
                "Recuperamos 85% dos leads que estavam frios. O ROI foi positivo 
                já no primeiro mês de implementação."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">MS</span>
                </div>
                <div>
                  <div className="font-semibold">Mariana Silva</div>
                  <div className="text-sm text-gray-400">Diretora Comercial, InnovaCorp</div>
                </div>
              </div>
            </div>

            <div className="bg-[#1d1d1d]/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 italic">
                "A implementação foi surpreendentemente rápida. Em 20 dias já 
                estávamos operando com a IA totalmente integrada."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">CA</span>
                </div>
                <div>
                  <div className="font-semibold">Carlos Andrade</div>
                  <div className="text-sm text-gray-400">Fundador, StartupXYZ</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 lg:px-8 bg-gradient-to-br from-[#140037]/40 to-[#1d1d1d]/60">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Pronto para 
              <span className="text-[#6831f3]"> Automatizar</span> suas Vendas?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Agende uma demonstração personalizada e veja como nossa IA pode 
              transformar seu comercial em apenas 20 dias.
            </p>
          </div>

          <div className="bg-[#1d1d1d]/50 backdrop-blur-sm border border-white/15 rounded-2xl p-8">
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-500/40 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                  <span className="text-green-300">Mensagem enviada com sucesso! Entraremos em contato em breve.</span>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/40 rounded-lg">
                <div className="flex items-center">
                  <X className="h-5 w-5 text-red-400 mr-2" />
                  <span className="text-red-300">Erro ao enviar mensagem. Tente novamente ou entre em contato diretamente.</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-[#1d1d1d]/30 border rounded-lg focus:ring-2 focus:ring-[#6831f3]/20 focus:border-[#6831f3] transition-colors ${
                      formErrors.name ? 'border-red-500/40' : 'border-white/15'
                    }`}
                    placeholder="Seu nome completo"
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-400">{formErrors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Profissional *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-[#1d1d1d]/30 border rounded-lg focus:ring-2 focus:ring-[#6831f3]/20 focus:border-[#6831f3] transition-colors ${
                      formErrors.email ? 'border-red-500/40' : 'border-white/15'
                    }`}
                    placeholder="seu@email.com"
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-400">{formErrors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    Telefone/WhatsApp *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-[#1d1d1d]/30 border rounded-lg focus:ring-2 focus:ring-[#6831f3]/20 focus:border-[#6831f3] transition-colors ${
                      formErrors.phone ? 'border-red-500/40' : 'border-white/15'
                    }`}
                    placeholder="(11) 99999-9999"
                  />
                  {formErrors.phone && (
                    <p className="mt-1 text-sm text-red-400">{formErrors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                    Empresa *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-[#1d1d1d]/30 border rounded-lg focus:ring-2 focus:ring-[#6831f3]/20 focus:border-[#6831f3] transition-colors ${
                      formErrors.company ? 'border-red-500/40' : 'border-white/15'
                    }`}
                    placeholder="Nome da sua empresa"
                  />
                  {formErrors.company && (
                    <p className="mt-1 text-sm text-red-400">{formErrors.company}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Mensagem (Opcional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#1d1d1d]/30 border border-white/15 rounded-lg focus:ring-2 focus:ring-[#6831f3]/20 focus:border-[#6831f3] transition-colors resize"
                  placeholder="Conte-nos mais sobre seu negócio e como podemos ajudar..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#6831f3] hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-glow-lg hover:scale-105"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-pulse mr-2">⏳</div>
                    Enviando...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    Quero uma Demonstração Gratuita
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                )}
              </button>

              <p className="text-sm text-gray-400 text-center">
                Resposta em até 2 horas úteis • Demonstração personalizada • Sem compromisso
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Bot className="h-8 w-8 text-[#6831f3]" />
                <span className="text-xl font-bold">NOCTA.I SALES AI™</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Automatização comercial inteligente que transforma leads em vendas 
                com IA personalizada para seu negócio.
              </p>
              <div className="flex space-x-4">
                <div className="flex items-center text-sm text-gray-400">
                  <Mail className="h-4 w-4 mr-2" />
                  contato@noctai.com.br
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Soluções</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Automação de Vendas</li>
                <li>Recuperação de Leads</li>
                <li>Atendimento 24/7</li>
                <li>Analytics Avançado</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Sobre Nós</li>
                <li>Casos de Sucesso</li>
                <li>Suporte</li>
                <li>Contato</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 NOCTA.I SALES AI™. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;