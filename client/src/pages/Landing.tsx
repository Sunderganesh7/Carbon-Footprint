import { useNavigate } from 'react-router-dom';

const features = [
  {
    title: 'Carbon Calculator',
    description: 'Calculate your carbon footprint across transportation, energy, food, and lifestyle categories.',
    icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.012M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-500', // Changed to match reference (solid color box with white icon)
    iconColorInner: 'text-white',
    cardBg: 'bg-[#f8fdf9]', // Very light green tint
    cardBorder: 'border-emerald-100',
    route: '/calculator'
  },
  {
    title: 'AI Sustainability Coach',
    description: 'Get personalized recommendations from our AI-powered coach to reduce your environmental impact.',
    icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z',
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-500',
    iconColorInner: 'text-white',
    cardBg: 'bg-[#f4f8ff]',
    cardBorder: 'border-blue-100',
    route: '/ai-coach'
  },
  {
    title: 'Reduction Simulator',
    description: 'Simulate lifestyle changes and see instant updates to your carbon footprint.',
    icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
    iconColor: 'text-purple-500',
    iconBg: 'bg-purple-500',
    iconColorInner: 'text-white',
    cardBg: 'bg-[#faf5ff]',
    cardBorder: 'border-purple-100',
    route: '/simulator'
  },
  {
    title: 'Eco Challenges',
    description: 'Take on gamified challenges to build sustainable habits and earn points.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    iconColor: 'text-amber-500',
    iconBg: 'bg-amber-400',
    iconColorInner: 'text-white',
    cardBg: 'bg-[#fffdf5]',
    cardBorder: 'border-amber-100',
    route: '/challenges'
  },
  {
    title: 'Progress Tracking',
    description: 'Track your emissions over time with weekly and monthly trends.',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-600',
    iconColorInner: 'text-white',
    cardBg: 'bg-[#f2fdf7]',
    cardBorder: 'border-emerald-100',
    route: '/dashboard'
  },
  {
    title: 'Sustainability Score',
    description: 'Get a clear 0-100 sustainability score with actionable improvement tips.',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    iconColor: 'text-rose-500',
    iconBg: 'bg-rose-500',
    iconColorInner: 'text-white',
    cardBg: 'bg-[#fff5f5]',
    cardBorder: 'border-rose-100',
    route: '/dashboard'
  }
];

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* CINEMATIC HERO */}
      <section className="relative w-full h-[600px] sm:h-[650px] lg:h-[700px] overflow-hidden flex items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2500&auto=format&fit=crop')" }}
        />
        
        {/* Gradient Overlay for Text Readability - Darker on left, fading right */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent" />
        
        <div className="relative z-20 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-12 w-full h-full flex items-center">
          <div className="w-full flex justify-between items-end pb-12">
            
            {/* Left Side Content */}
            <div className="max-w-2xl mt-12">
              {/* Label */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs font-bold tracking-[0.2em] text-slate-300 uppercase">AI-POWERED SUSTAINABILITY</span>
                <div className="h-[1px] w-12 bg-emerald-500"></div>
              </div>

              {/* Heading */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
                Understand Your <br />
                <span className="text-emerald-400">Carbon Footprint</span>
              </h1>

              {/* Description */}
              <p className="text-[17px] text-slate-200 mb-10 max-w-xl leading-relaxed font-light">
                CarbonWise AI helps you track, understand, and reduce your carbon
                emissions with personalized insights, AI-powered recommendations,
                and gamified challenges.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
                <button
                  onClick={() => navigate('/calculator')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-[#0ea559] px-7 py-3.5 text-[15px] font-bold text-white shadow-lg transition-all duration-200 hover:bg-[#0c904e] active:bg-[#0a7a42]"
                >
                  Calculate Your Footprint
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
                <button
                  onClick={() => navigate('/ai-coach')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300/40 bg-transparent px-7 py-3.5 text-[15px] font-semibold text-white transition-all duration-200 hover:bg-white/10"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                  Talk to AI Coach
                </button>
              </div>

              {/* Capabilities Row */}
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2 text-[13px] font-semibold text-slate-200">
                  <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10C22 6.477 17.523 2 12 2zM9.5 16.5l-4-4 1.414-1.414L9.5 13.672l6.086-6.086L17 9l-7.5 7.5z" clipRule="evenodd"></path></svg>
                  Measure
                </div>
                <div className="flex items-center gap-2 text-[13px] font-semibold text-slate-200">
                  <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10C22 6.477 17.523 2 12 2zM9.5 16.5l-4-4 1.414-1.414L9.5 13.672l6.086-6.086L17 9l-7.5 7.5z" clipRule="evenodd"></path></svg>
                  Analyze
                </div>
                <div className="flex items-center gap-2 text-[13px] font-semibold text-slate-200">
                  <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10C22 6.477 17.523 2 12 2zM9.5 16.5l-4-4 1.414-1.414L9.5 13.672l6.086-6.086L17 9l-7.5 7.5z" clipRule="evenodd"></path></svg>
                  Reduce
                </div>
                <div className="flex items-center gap-2 text-[13px] font-semibold text-slate-200">
                  <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10C22 6.477 17.523 2 12 2zM9.5 16.5l-4-4 1.414-1.414L9.5 13.672l6.086-6.086L17 9l-7.5 7.5z" clipRule="evenodd"></path></svg>
                  Make an Impact
                </div>
              </div>
            </div>

            {/* Right Side Text Content */}
            <div className="hidden lg:block pb-10 pr-4">
              <div className="flex flex-col items-start border-l-2 border-white/40 pl-4">
                <div className="flex items-center gap-2 text-emerald-400 mb-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"></path></svg>
                </div>
                <h3 className="text-white font-semibold text-lg leading-snug">
                  Cleaner Choices <br /> Brighter Tomorrows
                </h3>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURE SECTION */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-12">
          {/* Section Header */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-[34px] font-extrabold text-slate-900 tracking-tight mb-4">
              Everything you need to <span className="text-emerald-500">go green</span>
            </h2>
            <p className="text-base text-slate-500 font-light">
              A comprehensive platform to measure, track, and reduce your carbon footprint with the help of AI.
            </p>
          </div>

          {/* Feature Grid - Horizontal Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div 
                key={feature.title}
                onClick={() => navigate(feature.route)}
                className={`group cursor-pointer rounded-2xl border ${feature.cardBorder} ${feature.cardBg} p-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 relative overflow-hidden`}
              >
                {/* Decorative background icon */}
                <svg className={`absolute -right-4 -bottom-4 w-32 h-32 opacity-[0.03] ${feature.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={feature.icon} />
                </svg>

                <div className="flex items-center gap-5 relative z-10">
                  {/* Left Icon Block */}
                  <div className={`shrink-0 w-[60px] h-[60px] rounded-2xl ${feature.iconBg} flex items-center justify-center shadow-sm`}>
                    <svg
                      className={`h-7 w-7 ${feature.iconColorInner}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d={feature.icon} />
                    </svg>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 pr-2">
                    <h3 className="text-[16px] font-bold text-slate-800 mb-1 truncate">
                      {feature.title}
                    </h3>
                    <p className="text-[13px] leading-relaxed text-slate-500 line-clamp-2 font-light">
                      {feature.description}
                    </p>
                  </div>

                  {/* Arrow Action */}
                  <div className="shrink-0 w-8 h-8 rounded-full bg-white/80 border border-slate-200/60 flex items-center justify-center text-slate-400 group-hover:bg-slate-800 group-hover:border-slate-800 group-hover:text-white transition-all shadow-sm">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="pb-16 pt-4 bg-white">
        <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-12">
          <div className="relative overflow-hidden bg-gradient-to-r from-[#0a4521] to-[#0d5929] rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between p-8 sm:p-10">
            {/* Left large leaf decorative */}
            <svg className="absolute -left-10 -bottom-20 w-64 h-64 text-emerald-400/20 opacity-30 transform rotate-45 pointer-events-none" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a8 8 0 018 8c0 4.418-3.582 8-8 8H2V10a8 8 0 018-8zm0 2a6 6 0 00-6 6v4h4a6 6 0 006-6c0-3.314-2.686-6-6-6z" clipRule="evenodd"></path></svg>

            {/* Content Left */}
            <div className="relative z-10 mb-6 md:mb-0 flex items-center gap-6">
              <div className="hidden sm:flex shrink-0 w-12 h-12 rounded-xl bg-emerald-500/20 items-center justify-center text-emerald-300 backdrop-blur-sm border border-emerald-400/20">
                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10C22 6.477 17.523 2 12 2zM9.5 16.5l-4-4 1.414-1.414L9.5 13.672l6.086-6.086L17 9l-7.5 7.5z" clipRule="evenodd"></path></svg>
              </div>
              <div className="max-w-xl">
                <h2 className="text-[22px] font-bold text-white tracking-tight mb-1.5">
                  Ready to make a difference?
                </h2>
                <p className="text-[14px] text-emerald-100/90 font-light">
                  Start your sustainability journey today. Calculate your footprint and get personalized recommendations.
                </p>
              </div>
            </div>

            {/* Actions Right */}
            <div className="relative z-10 flex items-center gap-8 shrink-0">
              <button
                onClick={() => navigate('/calculator')}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-[14px] font-bold text-[#0d5929] shadow-md transition-all duration-200 hover:bg-emerald-50 active:bg-emerald-100 whitespace-nowrap"
              >
                Get Started Now
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
              
              {/* Divider */}
              <div className="hidden lg:block w-[1px] h-12 bg-emerald-400/30"></div>

              {/* Right text box */}
              <div className="hidden lg:flex items-center gap-3 text-emerald-100 pr-4">
                 <svg className="w-5 h-5 text-emerald-300" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10C22 6.477 17.523 2 12 2zM9.5 16.5l-4-4 1.414-1.414L9.5 13.672l6.086-6.086L17 9l-7.5 7.5z" clipRule="evenodd"></path></svg>
                 <div className="text-[12px] font-medium leading-tight">
                   Small Actions.<br/>Big Impact.
                 </div>
              </div>
            </div>

            {/* Right large leaf decorative */}
            <svg className="absolute -right-20 -top-20 w-72 h-72 text-emerald-400/20 opacity-40 transform -rotate-45 pointer-events-none" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a8 8 0 018 8c0 4.418-3.582 8-8 8H2V10a8 8 0 018-8zm0 2a6 6 0 00-6 6v4h4a6 6 0 006-6c0-3.314-2.686-6-6-6z" clipRule="evenodd"></path></svg>
          </div>
        </div>
      </section>
    </div>
  );
}
