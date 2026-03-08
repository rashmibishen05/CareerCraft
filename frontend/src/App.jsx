import { useState, useRef, useEffect } from 'react';
import { Bot, Map, Target, Code2, Briefcase, GraduationCap, Award, Search, Bell, Settings, ChevronRight, CheckCircle2, PlayCircle, Calendar, Video, Star, Clock, BrainCircuit, Activity, Lock, Mail, User, Building, Sparkles, CreditCard, Smartphone } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [userName, setUserName] = useState('');
  const [activeTab, setActiveTab] = useState('roadmap');
  const [isBotOpen, setIsBotOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false); // New Interactive State
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [isTestActive, setIsTestActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [testAnswers, setTestAnswers] = useState({});
  const [showTestResults, setShowTestResults] = useState(false);
  const [testScores, setTestScores] = useState({});
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [bookingStatus, setBookingStatus] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [showMentorEnrollModal, setShowMentorEnrollModal] = useState(false);
  const [newMentor, setNewMentor] = useState({ name: '', role: '', price: '₹999', bio: '', expertise: '', upiId: '' });
  const [mentorsList, setMentorsList] = useState([]);

  // Internship Prep Interactive States
  const [activeInternshipTask, setActiveInternshipTask] = useState(null);
  const [isTaskSimulating, setIsTaskSimulating] = useState(false);
  const [taskResult, setTaskResult] = useState('');
  const [userXp, setUserXp] = useState(1200);

  const handleLaunchTask = (task) => {
    setActiveInternshipTask(task);
    setTaskResult('');
    setIsTaskSimulating(false);
  };

  const handleSubmitTask = () => {
    setIsTaskSimulating(true);
    setTimeout(() => {
         setIsTaskSimulating(false);
         setTaskResult('success');
         const xpGain = parseInt(activeInternshipTask.xp.replace(/[^0-9]/g, ''), 10) || 500;
         setUserXp(prev => prev + xpGain);
         setTimeout(() => {
             setActiveInternshipTask(null);
             setTaskResult('');
         }, 4000);
    }, 2500);
  };

  useEffect(() => {
    const saved = localStorage.getItem('careercraft_mentors_v2');
    if (saved) {
      setMentorsList(JSON.parse(saved));
    } else {
      const defaultMentors = [
        { name: 'Rahul S.', role: 'Senior SDE at Amazon', rating: 5.0, sessions: 124, expertise: ['System Design', 'Leadership Principles', 'Backend Scale'], bio: 'I specialize in conducting realistic Amazon LP mock interviews and reviewing High-Level Design for SDE II candidates.', price: '₹1,499', upiId: 'rahul.sde@okicici', badge: 'Top Rated', badgeBg: 'rgba(59, 130, 246, 0.1)', badgeColor: '#60a5fa', themeBorder: 'rgba(59, 130, 246, 0.4)' },
        { name: 'Neha G.', role: 'Cloud Architect at Google', rating: 4.9, sessions: 89, expertise: ['GCP Infrastructure', 'Resume Reviews', 'Cloud Native'], bio: 'Guiding candidates through real-time cloud architecture problems and providing actionable resume feedback for tier-1 selections.', price: '₹1,899', upiId: 'neha.cloud@okhdfc', badge: 'Available Today', badgeBg: 'rgba(16, 185, 129, 0.1)', badgeColor: '#34d399', themeBorder: 'rgba(16, 185, 129, 0.4)' },
        { name: 'Vikram R.', role: 'Frontend Lead at Meta', rating: 4.8, sessions: 215, expertise: ['React Performance', 'UI Component Design', 'Code Reviews'], bio: 'I help candidates master extreme DOM manipulation tasks and provide deep-dive code reviews to pass tier-1 frontend rounds.', price: '₹1,199', upiId: 'vikram.ui@okaxis', badge: 'Fast Responses', badgeBg: 'rgba(139, 92, 246, 0.1)', badgeColor: '#a78bfa', themeBorder: 'rgba(139, 92, 246, 0.4)' }
      ];
      setMentorsList(defaultMentors);
      localStorage.setItem('careercraft_mentors_v2', JSON.stringify(defaultMentors));
    }
  }, []);
  const [dreamCompany, setDreamCompany] = useState('');
  const [userGoal, setUserGoal] = useState('');
  const messagesEndRef = useRef(null);

  const [dynamicTests, setDynamicTests] = useState([
    {
      name: `Full Stack Core Concepts`,
      desc: `Test focused on fundamental tech concepts.`,
      time: 30,
      questions: [
        { id: 1, question: `Which pattern is essential for scalable tech applications?`, options: ["MVC/Microservices", "Global Variables", "Synchronous blocking", "Monolithic loops"], answer: "MVC/Microservices" },
        { id: 2, question: `What is the most performance-efficient way to handle state in modern tech?`, options: ["Direct DOM manipulation", "Local state with context", "Global window object", "Database queries per keystroke"], answer: "Local state with context" },
        { id: 3, question: `How would you deploy a tech project for production?`, options: ["FTP Upload", "Emailing the zip", "CI/CD Pipelines", "Copy paste on server"], answer: "CI/CD Pipelines" }
      ]
    },
    {
      name: `Systems Architecture Fundamentals`,
      desc: `Evaluates system design standard methodologies at top companies.`,
      time: 45,
      questions: [
         { id: 1, question: `What is the best practice for Continuous Integration according to industry standard?`, options: ["Automated testing in pipelines", "Testing in production", "No tests", "Manual QA only"], answer: "Automated testing in pipelines" },
         { id: 2, question: `How should you structure your data for optimal read performance?`, options: ["Normalized", "Denormalized/Cached", "Flat File", "In-memory only"], answer: "Denormalized/Cached" },
         { id: 3, question: `Which caching mechanism is most commonly used in target scale systems?`, options: ["LocalStorage", "Redis/Memcached", "SessionStorage", "Cookies"], answer: "Redis/Memcached" }
      ]
    }
  ]);

  const [internshipTasks, setInternshipTasks] = useState([
     {
        id: 1,
        title: "Search Architecture Challenge",
        xp: "+500 XP",
        type: "Frontend Engineering Simulation",
        desc: "Implement a highly debounced, multi-regional search feature that gracefully handles degraded network connections.",
        est_time: "Est. 2 Hours",
        color: "blue"
     },
     {
        id: 2,
        title: "High-Concurrency Cart Sync",
        xp: "+850 XP",
        type: "Backend Systems Simulation",
        desc: "Resolve distributed locking issues when millions of users attempt to checkout highly demanded flash-sale items.",
        est_time: "Est. 4 Hours",
        color: "green"
     }
  ]);

  const currentQuestions = selectedTest ? dynamicTests.find(t => t.name === selectedTest)?.questions || [] : [];

  const startTest = () => {
    setIsTestActive(true);
    setCurrentQuestionIndex(0);
    setTestAnswers({});
    setShowTestResults(false);
  };

  const handleAnswerSelect = (option) => {
    setTestAnswers(prev => ({ ...prev, [currentQuestionIndex]: option }));
  };

  const handleNextQuestion = () => {
    if (!testAnswers[currentQuestionIndex]) {
      alert("Please select an answer before proceeding.");
      return;
    }

    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      let score = 0;
      currentQuestions.forEach((q, idx) => {
        if (testAnswers[idx] === q.answer) score++;
      });
      const finalScore = Math.round((score / currentQuestions.length) * 100);
      setTestScores(prev => ({ ...prev, [selectedTest]: finalScore }));
      setIsTestActive(false);
      setShowTestResults(true);
    }
  };

  const closeTestModal = () => {
    setShowTestModal(false);
    setIsTestActive(false);
    setShowTestResults(false);
    setSelectedTest(null);
  };
  
  // Auth Form State
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const [roadmapModules, setRoadmapModules] = useState([]);
  const [isGeneratingRoadmap, setIsGeneratingRoadmap] = useState(false);
  
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Namaste! 🙏 I\'m your CareerCraft Helping Hand, specifically optimized for the **AI for Bharat Hackathon**.\n\nHere are some things you can ask me:\n- *"Can you explain how React hooks work?"*\n- *"What is a common Amazon interview question?"*\n- *"Can you review this code snippet for me?"*' }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!(chatInput || '').trim()) return;
    
    const userMessage = chatInput;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setChatInput('');
    setIsTyping(true);
    
    try {
      // Connect to the actual Python FastAPI Backend!
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });
      
      const data = await response.json();
      
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: data.reply 
      }]);
    } catch {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: '⚠️ Oh no! Could not connect to the Backend server. Ensure the FastAPI service is running on Port 8000!' 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleForgotPassword = () => {
    setAuthError('');
    let safeEmail = (authEmail || '').trim().toLowerCase();
    
    if (!safeEmail) {
      setAuthError('Please enter your email address first to reset password.');
      return;
    }
    
    const savedUserStr = localStorage.getItem('careercraft_users');
    const savedUsers = savedUserStr ? JSON.parse(savedUserStr) : null;
    
    if (!savedUsers || !savedUsers[safeEmail]) {
      setAuthError('We could not find an account associated with that email.');
      return;
    }

    const newPassword = window.prompt(`Password Reset for ${safeEmail}\n\nPlease enter your new password:`);
    
    if (newPassword && newPassword.trim().length > 0) {
      savedUsers[safeEmail].password = newPassword.trim();
      localStorage.setItem('careercraft_users', JSON.stringify(savedUsers));
      setAuthError('Password has been successfully updated! You may now sign in.');
      setAuthPassword('');
    }
  };

  const handleBookMentor = (mentorData) => {
    setSelectedMentor(mentorData);
    setShowBookingModal(true);
    setBookingStatus('');
    setSelectedDate('');
    setSelectedTime('');
  };

  const handleProceedToPayment = () => {
    if (!selectedDate || !selectedTime) return;
    setBookingStatus('payment');
  };

  const confirmBooking = () => {
    setBookingStatus('confirming');
    setTimeout(() => {
      setBookingStatus('success');
      setTimeout(() => {
        setShowBookingModal(false);
        setBookingStatus('');
      }, 3500);
    }, 2000);
  };

  const handleEnrollMentor = (e) => {
    e.preventDefault();
    const skills = newMentor.expertise.split(',').map(s => s.trim()).filter(s => s);
    const mentorEntry = {
      name: newMentor.name || 'New Mentor',
      role: newMentor.role || 'Industry Expert',
      rating: 5.0,
      sessions: 0,
      expertise: skills.length > 0 ? skills : ['General Mentorship'],
      bio: newMentor.bio || 'Ready to guide students on their journey!',
      price: newMentor.price || '₹999',
      upiId: newMentor.upiId || 'mentor@okicici',
      badge: 'New',
      badgeBg: 'rgba(59, 130, 246, 0.1)',
      badgeColor: '#60a5fa',
      themeBorder: 'rgba(59, 130, 246, 0.4)'
    };
    const updated = [mentorEntry, ...mentorsList];
    setMentorsList(updated);
    localStorage.setItem('careercraft_mentors_v2', JSON.stringify(updated));
    setShowMentorEnrollModal(false);
    setNewMentor({ name: '', role: '', price: '₹999', bio: '', expertise: '', upiId: '' });
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    
    let finalName = '';
    let finalCompany = (dreamCompany || '').trim() || 'Google, Amazon';
    let finalGoal = (userGoal || '').trim() || 'Full Stack Web Development';
    let safeEmail = (authEmail || '').trim().toLowerCase();
    
    if (authMode === 'login') {
      const savedUserStr = localStorage.getItem('careercraft_users');
      const savedUsers = savedUserStr ? JSON.parse(savedUserStr) : { 'student@careercraft.com': { password: 'password123', name: 'Student', goal: 'Full Stack', company: 'Google' } };
      
      if (savedUsers[safeEmail] && savedUsers[safeEmail].password === authPassword) {
        finalName = savedUsers[safeEmail].name;
        finalGoal = savedUsers[safeEmail].goal || finalGoal;
        finalCompany = savedUsers[safeEmail].company || finalCompany;
        setUserGoal(finalGoal);
      } else {
        setAuthError('Invalid email or password or account not found.');
        return;
      }
    } else {
      finalName = authName || 'Student';
      const savedUserStr = localStorage.getItem('careercraft_users');
      const savedUsers = savedUserStr ? JSON.parse(savedUserStr) : { 'student@careercraft.com': { password: 'password123', name: 'Student', goal: 'Full Stack', company: 'Google' } };
      
      if (savedUsers[safeEmail]) {
        setAuthError('Account already created! You need to sign in.');
        return;
      }

      savedUsers[safeEmail] = {
         password: authPassword, 
         name: finalName,
         goal: finalGoal,
         company: finalCompany
      };
      localStorage.setItem('careercraft_users', JSON.stringify(savedUsers));
    }
    
    setUserName(finalName);
    setDreamCompany(finalCompany);
    setShowLanding(false);
    setIsGeneratingRoadmap(true);
    
    // Fetch real roadmap from AI backend
    try {
      const res = await fetch('http://localhost:8000/api/roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_goal: finalGoal, dream_company: finalCompany })
      });
      const data = await res.json();
      if (data.modules) {
        setRoadmapModules(data.modules);
      } else {
        throw new Error('Invalid roadmap data');
      }
    } catch (err) {
      console.error(err);
      // Fallback if backend is down
      setRoadmapModules([
        { 
          id: 1, 
          title: `Introduction to ${finalGoal}`, 
          status: 'In Progress', 
          desc: `Foundation concepts for landing a job at ${finalCompany}. (Offline Fallback)`, 
          pct: 0, 
          lessons: ['Basics', 'Core Workflows', 'Setup and Tooling'] 
        }
      ]);
    } 

    // Concurrently fetch completely unique dynamically generated AI tests tailored to the specific User!
    try {
      const testRes = await fetch('http://localhost:8000/api/generate_test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_goal: finalGoal, dream_company: finalCompany })
      });
      const testData = await testRes.json();
      if (testData && testData.tests) {
        setDynamicTests(testData.tests);
      }
    } catch (err) {
      console.error('Test generation API error, falling back to cached local tests:', err);
    }

    // Concurrently fetch completely unique dynamically generated Internship Simulation Tasks
    try {
      const internRes = await fetch('http://localhost:8000/api/generate_internship', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_goal: finalGoal, dream_company: finalCompany })
      });
      const internData = await internRes.json();
      if (internData && internData.tasks) {
        setInternshipTasks(internData.tasks);
      }
    } catch (err) {
      console.error('Internship generation API error, falling back to cached tasks:', err);
    }
    
    // Inject realistic contextual awareness to the AI chatbot directly based on the user's authenticated profile
    setMessages([
      { role: 'bot', text: `Namaste ${finalName}! 🙏 I've fully customized your workspace for landing a ${finalGoal} role at ${finalCompany}. I'm here to review your code, run mock interviews, or explain technical concepts!` }
    ]);
    
    setIsGeneratingRoadmap(false);
    setIsAuthenticated(true);
  };

  if (isGeneratingRoadmap) {
    return (
      <div className="auth-page" style={{ flexDirection: 'column', color: 'white', textAlign: 'center' }}>
        <Bot size={64} color="var(--primary)" style={{ marginBottom: '24px', animation: 'bounce 2s infinite' }} />
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>AI is building your personalized roadmap...</h2>
        <p style={{ color: 'var(--text-muted)' }}>Analyzing {dreamCompany} requirements for your goal...</p>
        <div style={{ width: '300px', height: '4px', background: 'rgba(255,255,255,0.1)', marginTop: '24px', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ width: '50%', height: '100%', background: 'linear-gradient(90deg, var(--primary), var(--secondary))', animation: 'slideRight 2s infinite' }}></div>
        </div>
        <style>{`
          @keyframes slideRight { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }
          @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        `}</style>
      </div>
    );
  }

  if (showLanding) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', padding: '24px 48px', alignItems: 'center', background: 'rgba(9, 9, 11, 0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border-color)', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="logo-icon"><Bot size={24} color="white" /></div>
            <div className="logo-text" style={{ fontSize: '24px' }}>CareerCraft</div>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button className="btn btn-secondary" onClick={() => { setAuthMode('login'); setShowLanding(false); }}>Log In</button>
            <button className="btn btn-primary" onClick={() => { setAuthMode('signup'); setShowLanding(false); }}>Get Started Free</button>
          </div>
        </header>

        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '100px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          
          {/* Animated Background Elements */}
          <div style={{ position: 'absolute', top: '10%', left: '15%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)', filter: 'blur(40px)', animation: 'pulse 4s infinite alternate' }}></div>
          <div style={{ position: 'absolute', bottom: '10%', right: '15%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)', filter: 'blur(40px)', animation: 'pulse 5s infinite alternate-reverse' }}></div>
          <div style={{ position: 'absolute', top: '40%', right: '25%', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)', filter: 'blur(30px)' }}></div>

          <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="tag accent" style={{ marginBottom: '24px', fontSize: '15px', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(139, 92, 246, 0.3)', boxShadow: '0 0 20px rgba(139, 92, 246, 0.2)' }}>
              <Sparkles size={16} /> 🚀 Built by Students, for Students
            </div>
            <h1 style={{ fontSize: '72px', fontWeight: 800, marginBottom: '24px', maxWidth: '900px', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              From Campus to Dream Job via <br/><span className="logo-text" style={{ textShadow: '0 0 40px rgba(139, 92, 246, 0.4)', fontSize: 'inherit' }}>AI Career Mentorship</span>
            </h1>
            <p style={{ fontSize: '20px', color: 'var(--text-muted)', maxWidth: '700px', marginBottom: '48px', lineHeight: 1.6 }}>
              No more getting lost in endless tutorials. CareerCraft uses AI to build the exact step-by-step roadmap you need to crack tier-1 interviews. Practice coding, get 24/7 help, and land your dream role.
            </p>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button className="btn btn-primary" style={{ padding: '18px 36px', fontSize: '18px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 10px 25px rgba(139, 92, 246, 0.4)' }} onClick={() => { setAuthMode('signup'); setShowLanding(false); }}>
                Start Your Journey Now <ChevronRight size={20} />
              </button>
              <button className="btn btn-secondary" style={{ padding: '18px 36px', fontSize: '18px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => { setAuthMode('login'); setShowLanding(false); }}>
                Log in to Dashboard
              </button>
            </div>

            <div style={{ display: 'flex', gap: '32px', marginTop: '100px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '1200px' }}>
              
              <div className="card glass-panel" style={{ width: '320px', textAlign: 'left', transition: 'all 0.3s ease', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.border = '1px solid rgba(139, 92, 246, 0.5)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.border = '1px solid var(--border-color)'; }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <Target size={28} color="var(--primary)" />
                </div>
                <h3 style={{ fontSize: '22px', marginBottom: '12px', color: 'white' }}>Custom AI Roadmaps</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: 1.6 }}>Tell us your branch and dream company, and our AI generates a personalized day-by-day plan so you only study what actually matters.</p>
              </div>

              <div className="card glass-panel" style={{ width: '320px', textAlign: 'left', transition: 'all 0.3s ease', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.border = '1px solid rgba(59, 130, 246, 0.5)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.border = '1px solid var(--border-color)'; }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <Code2 size={28} color="var(--secondary)" />
                </div>
                <h3 style={{ fontSize: '22px', marginBottom: '12px', color: 'white' }}>Helping Hands AI</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: 1.6 }}>Stuck on a bug at 2 AM? Our AI acts like a senior student mentor—guiding you to understand the problem instead of just giving away the code.</p>
              </div>
              
              <div className="card glass-panel" style={{ width: '320px', textAlign: 'left', transition: 'all 0.3s ease', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.border = '1px solid rgba(16, 185, 129, 0.5)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.border = '1px solid var(--border-color)'; }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <Briefcase size={28} color="var(--accent)" />
                </div>
                <h3 style={{ fontSize: '22px', marginBottom: '12px', color: 'white' }}>Job Simulation Hub</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: 1.6 }}>Can't get past resume screening? Prove your skills by practicing highly-demanded engineering challenges directly from real world internships.</p>
              </div>

            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="auth-page">
        <div className="card glass-panel auth-card">
          <div className="auth-header">
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
              <div className="logo-icon" style={{ width: '56px', height: '56px', fontSize: '28px' }}>
                <Bot size={36} color="white" />
              </div>
            </div>
            <h2>{authMode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
            <p>{authMode === 'login' ? 'Enter your details to access your learning path.' : 'Start your hyper-personalized learning journey.'}</p>
          </div>

          <form className="auth-form" onSubmit={handleAuthSubmit}>
            {authError && <div style={{ color: '#ef4444', fontSize: '13px', padding: '10px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)', textAlign: 'center' }}>{authError}</div>}
            
            {authMode === 'signup' && (
              <>
                <div className="auth-input-group">
                  <label>Your Name</label>
                  <div className="auth-input-wrapper">
                    <User size={18} className="auth-icon" />
                    <input 
                      type="text" 
                      className="auth-input" 
                      placeholder="Your Name" 
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      required 
                    />
                  </div>
                </div>
                <div className="auth-input-group">
                  <label>What do you want to learn?</label>
                  <div className="auth-input-wrapper">
                    <Target size={18} className="auth-icon" />
                    <input 
                      type="text" 
                      className="auth-input" 
                      placeholder="e.g. Full Stack Web Development" 
                      value={userGoal}
                      onChange={(e) => setUserGoal(e.target.value)}
                      required 
                    />
                  </div>
                </div>
                <div className="auth-input-group">
                  <label>Dream Company</label>
                  <div className="auth-input-wrapper">
                    <Building size={18} className="auth-icon" />
                    <input 
                      type="text" 
                      className="auth-input" 
                      placeholder="e.g. Google, Amazon" 
                      value={dreamCompany}
                      onChange={(e) => setDreamCompany(e.target.value)}
                      required 
                    />
                  </div>
                </div>
              </>
            )}

            <div className="auth-input-group">
              <label>Email Address</label>
              <div className="auth-input-wrapper">
                <Mail size={18} className="auth-icon" />
                <input 
                  type="email" 
                  className="auth-input" 
                  placeholder="you@example.com" 
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="auth-input-group">
              <label>Password</label>
              <div className="auth-input-wrapper">
                <Lock size={18} className="auth-icon" />
                <input 
                  type="password" 
                  className="auth-input" 
                  placeholder="••••••••" 
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  required 
                />
              </div>
            </div>

            {authMode === 'login' && (
              <div style={{ textAlign: 'right', marginTop: '8px' }}>
                <span 
                  className="auth-toggle-link" 
                  onClick={handleForgotPassword}
                  style={{ fontSize: '14px', cursor: 'pointer', color: 'var(--primary)', opacity: 0.8, transition: 'opacity 0.2s' }}
                  onMouseEnter={(e) => e.target.style.opacity = 1}
                  onMouseLeave={(e) => e.target.style.opacity = 0.8}
                >
                  Forgot Password?
                </span>
              </div>
            )}

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', fontSize: '16px', marginTop: '16px' }}>
              {authMode === 'login' ? 'Sign In' : 'Create Free Account'}
            </button>
          </form>

          <div className="auth-toggle">
            {authMode === 'login' ? (
              <span>New to CareerCraft? <span className="auth-toggle-link" onClick={() => { setAuthMode('signup'); setAuthError(''); setAuthPassword(''); }}>Sign up here</span></span>
            ) : (
              <span>Already have an account? <span className="auth-toggle-link" onClick={() => { setAuthMode('login'); setAuthError(''); setAuthPassword(''); }}>Sign in here</span></span>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-container">
          <div className="logo-icon"><Bot size={24} color="white" /></div>
          <div className="logo-text">CareerCraft</div>
        </div>

        <nav className="nav-menu">
          <a className={`nav-item ${activeTab === 'roadmap' ? 'active' : ''}`} onClick={() => setActiveTab('roadmap')}>
            <Map size={20} /> Learning Roadmap
          </a>
          <a className={`nav-item ${activeTab === 'predictor' ? 'active' : ''}`} onClick={() => setActiveTab('predictor')}>
            <Target size={20} /> Knowledge Predictor
          </a>
          <a className={`nav-item ${activeTab === 'internship' ? 'active' : ''}`} onClick={() => setActiveTab('internship')}>
            <Briefcase size={20} /> Internship Prep
          </a>
          <a className={`nav-item ${activeTab === 'mentorship' ? 'active' : ''}`} onClick={() => setActiveTab('mentorship')}>
            <GraduationCap size={20} /> Live Mentorship
          </a>
        </nav>

        <div className="user-profile-mini">
          <div className="avatar"></div>
          <div>
            <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-main)', textTransform: 'capitalize' }}>{(userName || '').trim()}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Target: {dreamCompany}</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <div>
            <h1 style={{ fontSize: '28px', marginBottom: '8px', textTransform: 'capitalize' }}>Welcome back, {(userName || '').trim()}! 👋</h1>
            <p style={{ color: 'var(--text-muted)' }}>Here is your hyper-personalized daily learning plan.</p>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
              <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '16px' }} />
              <input type="text" className="search-bar" placeholder="Search courses, mentors..." style={{ paddingLeft: '44px' }} />
            </div>
            <button className="btn btn-secondary" style={{ padding: '12px', borderRadius: '50%' }}><Bell size={20} /></button>
            <button className="btn btn-secondary" style={{ padding: '12px', borderRadius: '50%' }}><Settings size={20} /></button>
          </div>
        </header>

        {/* Dashboard Content */}
        {activeTab === 'roadmap' && (
          <div className="dashboard-grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="card glass-panel">
                <div className="card-title">
                  <Target color="var(--primary)" size={24} /> 
                  Custom Learning Roadmap
                  <span className="tag" style={{ marginLeft: 'auto' }}>Company Specific</span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                  AI-generated path aligned with your B.Tech degree and target companies.
                </p>
                
                <div className="roadmap">
                  {roadmapModules.map((mod) => (
                    <div key={mod.id} className={`roadmap-item ${mod.status !== 'Locked' ? 'active' : ''}`}>
                      <div className="roadmap-dot">
                        {mod.status === 'Completed' ? (
                          <CheckCircle2 size={16} color="white" />
                        ) : mod.status === 'In Progress' ? (
                          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary)' }}></div>
                        ) : (
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }}></div>
                        )}
                      </div>
                      <div className="roadmap-content" style={{ borderColor: mod.status === 'In Progress' ? 'var(--primary)' : 'rgba(255, 255, 255, 0.05)', background: mod.status === 'In Progress' ? 'rgba(139, 92, 246, 0.05)' : 'rgba(255, 255, 255, 0.03)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <h3 style={{ fontSize: '16px', color: mod.status === 'Locked' ? 'var(--text-muted)' : 'white' }}>{mod.title}</h3>
                          {mod.status === 'Completed' && <span className="tag accent">Completed</span>}
                          {mod.status === 'In Progress' && <span className="tag" style={{ background: 'var(--primary)', color: 'white', borderColor: 'var(--primary)' }}>In Progress</span>}
                          {mod.status === 'Locked' && <span className="tag" style={{ color: 'var(--text-muted)', border: '1px solid rgba(255,255,255,0.1)' }}>Locked</span>}
                        </div>
                        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px' }}>{mod.desc}</p>
                        
                        {/* What you will learn section */}
                        <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', marginBottom: mod.status === 'In Progress' ? '16px' : '0' }}>
                          <div style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            What you will learn:
                          </div>
                          <ul style={{ paddingLeft: '20px', fontSize: '13px', color: 'var(--text-muted)', margin: 0, lineHeight: '1.6' }}>
                            {mod.lessons.map((lesson, idx) => (
                              <li key={idx} style={{ color: mod.status === 'Completed' ? '#34d399' : 'var(--text-muted)' }}>{lesson}</li>
                            ))}
                          </ul>
                        </div>
                        
                        {mod.status === 'In Progress' && (
                          <>
                            <div className="progress-bg" style={{ marginTop: '16px' }}>
                              <div className="progress-fill" style={{ width: `${mod.pct}%` }}></div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
                              <span>Lesson Progress</span>
                              <span>{mod.pct}%</span>
                            </div>
                            
                            <button className="btn btn-primary" style={{ marginTop: '16px', width: '100%' }} onClick={() => { setSelectedCourse(mod); setShowCourseModal(true); setIsVideoPlaying(false); }}>
                              <PlayCircle size={18} /> Continue Learning
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="card glass-panel">
                <div className="card-title">
                  <Award color="var(--accent)" size={24} /> 
                  Skill Tracker
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '8px' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '14px' }}>
                      <span>Fundamentals of {userGoal || 'Tech'}</span>
                      <span style={{ color: 'var(--text-muted)' }}>0% (Not Started)</span>
                    </div>
                    <div className="progress-bg"><div className="progress-fill" style={{ width: '0%' }}></div></div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '14px' }}>
                      <span>Advanced {userGoal || 'Core'}</span>
                      <span style={{ color: 'var(--text-muted)' }}>0% (Locked)</span>
                    </div>
                    <div className="progress-bg"><div className="progress-fill" style={{ width: '0%' }}></div></div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '14px' }}>
                      <span>{dreamCompany || 'Target'} Interview Prep</span>
                      <span style={{ color: 'var(--text-muted)' }}>0% (Locked)</span>
                    </div>
                    <div className="progress-bg"><div className="progress-fill" style={{ width: '0%' }}></div></div>
                  </div>
                </div>
                <button className="btn btn-secondary" style={{ marginTop: '16px', fontSize: '14px', width: '100%' }} onClick={() => setActiveTab('predictor')}>
                  Take Initial Assessment Test
                </button>
              </div>

              <div className="card glass-panel" style={{ background: 'linear-gradient(180deg, rgba(24, 24, 27, 0.6) 0%, rgba(139, 92, 246, 0.1) 100%)' }}>
                <div className="card-title">
                  <Target color="white" size={24} /> 
                  Knowledge Predictor
                </div>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '8px' }}>
                  AI detected a lack of starting data for <strong>{userGoal || 'your new field'}</strong>. Let's build your baseline profile!
                </p>
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '8px', marginTop: '12px', fontSize: '13px', color: '#a78bfa' }}>
                  💡 Tip: Take the initial assessment test to calibrate your roadmap and skip modules you already know.
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'predictor' && (
          <div className="dashboard-grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="card glass-panel">
                <div className="card-title">
                  <BrainCircuit color="var(--primary)" size={24} /> 
                  Knowledge Predictor Tests
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '16px' }}>
                  AI-based assessments to identify your weak areas based on your current goal of cracking {dreamCompany || 'top companies'}.
                </p>
                
                <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
                  {dynamicTests.map((test, index) => {
                    const score = testScores[test.name];
                    const hasScore = score !== undefined;
                    const isPassed = hasScore && score > 60;

                    return (
                      <div 
                        key={index}
                        className="test-card"
                        style={{ padding: '20px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)', cursor: 'pointer', transition: 'transform 0.2s, background 0.2s', position: 'relative', overflow: 'hidden' }}
                        onClick={() => { setSelectedTest(test.name); setShowTestModal(true); }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'; }}
                      >
                        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: hasScore ? (isPassed ? 'var(--primary)' : 'var(--accent)') : 'var(--primary)' }}></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <h3 style={{ fontSize: '18px', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}><Code2 size={18} color={hasScore ? (isPassed ? "var(--primary)" : "var(--accent)") : "var(--primary)"}/> {test.name}</h3>
                          {hasScore ? (
                            <span className={isPassed ? "tag" : "tag accent"} style={{ fontWeight: 'bold', ...(isPassed && { background: 'var(--primary)', color: 'white', borderColor: 'var(--primary)' })}}>Score: {score}%</span>
                          ) : (
                            <span className="tag" style={{ background: 'var(--primary)', color: 'white', borderColor: 'var(--primary)', fontWeight: 'bold' }}>Pending</span>
                          )}
                        </div>
                        <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>{hasScore ? (!isPassed ? "Weakness detected based on incorrect responses. Re-test recommended." : "Solid knowledge foundation detected.") : test.desc}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '12px', color: '#a78bfa', display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={14} /> {test.time} mins</span>
                          <button className={hasScore ? "btn btn-secondary" : "btn btn-primary"} style={{ padding: '8px 16px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <PlayCircle size={14} /> {hasScore ? "Retake Assessment" : "Start Test"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="card glass-panel" style={{ background: 'linear-gradient(180deg, rgba(24, 24, 27, 0.6) 0%, rgba(16, 185, 129, 0.1) 100%)' }}>
                <div className="card-title">
                  <Activity color="var(--accent)" size={24} /> 
                  AI Improvement Tips
                </div>
                <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)', fontSize: '14px', marginTop: '12px', lineHeight: '2' }}>
                  <li style={{ marginBottom: '8px' }}><strong style={{ color: 'white' }}>{userGoal || 'Core'} Skills:</strong> Practice more code implementation problems based on previous {dreamCompany || 'target'} interviews.</li>
                  <li style={{ marginBottom: '8px' }}><strong style={{ color: 'white' }}>System Design:</strong> Review how to vertically vs horizontally scale microservices.</li>
                  <li style={{ marginBottom: '8px' }}><strong style={{ color: 'white' }}>Performance:</strong> Watch the recommended AI video on application lifecycle optimization.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'internship' && (
          <div className="dashboard-grid">
             <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Internship Profile Progress */}
              <div className="card glass-panel" style={{ background: 'linear-gradient(135deg, rgba(24, 24, 27, 0.8) 0%, rgba(59, 130, 246, 0.1) 100%)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                   <div>
                      <h2 style={{ fontSize: '20px', color: 'white', fontWeight: 'bold' }}>Your Engineering Profile</h2>
                      <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '4px' }}>Level up to skip {dreamCompany || 'BigTech'} introductory rounds.</p>
                   </div>
                   <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '28px', color: '#60a5fa', fontWeight: 'bold', fontFamily: 'monospace' }}>{userXp.toLocaleString()} XP</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Level 4 Engineer</div>
                   </div>
                </div>
                <div className="progress-bg" style={{ height: '8px', background: 'rgba(255,255,255,0.05)' }}>
                   <div className="progress-fill" style={{ width: `${Math.min(100, (userXp / 5000) * 100)}%`, background: 'linear-gradient(90deg, #3b82f6, #60a5fa)', transition: 'width 1s ease-in-out' }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
                   <span>Current Tier: Silver</span>
                   <span>Gold Tier: 5,000 XP</span>
                </div>
              </div>

              <div className="card glass-panel" style={{ background: 'linear-gradient(180deg, rgba(24, 24, 27, 0.6) 0%, rgba(59, 130, 246, 0.05) 100%)' }}>
                <div className="card-title">
                  <Briefcase color="#60a5fa" size={24} /> 
                  <span style={{ fontSize: '20px', color: 'white', fontWeight: 'bold' }}>{dreamCompany || 'Top Tech'} Job Simulation</span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px', lineHeight: '1.5' }}>
                  Complete real-world tasks curated from actual {dreamCompany || 'industry'} engineering teams to earn completion badges and skip initial recruiter screens.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                  {internshipTasks.map((task, idx) => {
                    const colorMap = {
                       "blue": { bg: "rgba(59, 130, 246, 0.1)", border: "rgba(59, 130, 246, 0.3)", hex: "#3b82f6", tagHex: "#60a5fa" },
                       "green": { bg: "rgba(16, 185, 129, 0.1)", border: "rgba(16, 185, 129, 0.3)", hex: "#10b981", tagHex: "#34d399" },
                       "purple": { bg: "rgba(139, 92, 246, 0.1)", border: "rgba(139, 92, 246, 0.3)", hex: "#8b5cf6", tagHex: "#a78bfa" },
                       "orange": { bg: "rgba(245, 158, 11, 0.1)", border: "rgba(245, 158, 11, 0.3)", hex: "#f59e0b", tagHex: "#fbbf24" }
                    };
                    const c = colorMap[task.color] || colorMap["blue"];

                    return (
                      <div 
                        key={idx}
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '20px', cursor: 'pointer', transition: 'all 0.2s ease', position: 'relative', overflow: 'hidden' }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.border = `1px solid ${c.border}`; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.border = '1px solid rgba(255,255,255,0.05)'; }}
                      >
                        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', background: c.hex }}></div>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '12px' }}>
                          <div style={{ width: '48px', height: '48px', background: '#ffffff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'black', fontSize: '20px', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>{dreamCompany ? dreamCompany.charAt(0).toUpperCase() : 'C'}</div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                              <h3 style={{ fontSize: '16px', color: 'white', fontWeight: 'bold' }}>{task.title}</h3>
                              <span className="tag" style={{ background: c.bg, color: c.tagHex, border: `1px solid ${c.border}` }}>{task.xp}</span>
                            </div>
                            <p style={{ fontSize: '13px', color: c.tagHex }}>{task.type}</p>
                          </div>
                        </div>
                        <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: '1.5' }}>{task.desc}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '12px', color: '#a78bfa', display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={14} /> {task.est_time}</span>
                          <button className={idx === 0 ? "btn btn-primary" : "btn btn-secondary"} style={{ padding: '8px 20px', fontSize: '13px' }} onClick={() => handleLaunchTask(task)}>Launch Work Environment</button>
                        </div>
                      </div>
                    )
                  })}
                  
                </div>
              </div>
             </div>

             <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="card glass-panel" style={{ background: 'linear-gradient(180deg, rgba(24, 24, 27, 0.6) 0%, rgba(139, 92, 246, 0.05) 100%)' }}>
                <div className="card-title">
                  <Video color="var(--primary)" size={24} /> 
                  <span style={{ fontSize: '20px', color: 'white', fontWeight: 'bold' }}>AI Mock Interviews</span>
                </div>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px' }}>Simulate real high-pressure behavioral and technical interviews with responsive AI interviewers conditioned on {dreamCompany || 'tier-1'} standards.</p>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button className="btn btn-primary" style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: '8px', padding: '12px' }}>
                    <Video size={18} /> Start Now
                  </button>
                  <button className="btn btn-secondary" style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: '8px', padding: '12px' }}>
                    <Calendar size={18} /> Schedule
                  </button>
                </div>
                
                <div style={{ marginTop: '32px' }}>
                  <div style={{ fontSize: '13px', color: '#a78bfa', marginBottom: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Your Upcoming Sessions:</div>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Activity size={20} color="#60a5fa" />
                    </div>
                    <div>
                      <div style={{ fontSize: '15px', color: 'white', fontWeight: 'bold', marginBottom: '4px' }}>Technical Round: {userGoal || 'System Design'}</div>
                      <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Today at 4:30 PM (IST)</div>
                    </div>
                  </div>
                </div>
              </div>
             </div>
          </div>
        )}

        {activeTab === 'mentorship' && (
          <div className="dashboard-grid" style={{ gridTemplateColumns: '1fr' }}>
            <div className="card glass-panel" style={{ background: 'linear-gradient(135deg, rgba(24, 24, 27, 0.8) 0%, rgba(139, 92, 246, 0.05) 100%)', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
               <div className="card-title" style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <GraduationCap color="var(--primary)" size={28} /> 
                    <span style={{ fontSize: '24px', fontWeight: 'bold', background: 'linear-gradient(90deg, #fff, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Elite 1-on-1 Mentorship</span>
                  </div>
                  <span className="tag" style={{ background: 'rgba(139, 92, 246, 0.2)', color: '#c4b5fd', border: '1px solid rgba(139, 92, 246, 0.3)' }}>Verified Experts Only</span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginBottom: '32px', lineHeight: '1.6', maxWidth: '800px' }}>
                  Accelerate your career by connecting directly with Senior Engineers and Hiring Managers from your dream companies. Gain insider knowledge, secure direct referrals, and perfect your interview strategy.
                </p>
                <button className="btn btn-primary" style={{ marginBottom: '24px', alignSelf: 'flex-start' }} onClick={() => setShowMentorEnrollModal(true)}>
                  Become a Mentor
                </button>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                  {mentorsList.map((m, idx) => (
                    <div 
                      key={idx}
                      style={{ padding: '24px', background: 'rgba(0, 0, 0, 0.4)', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.05)', cursor: 'pointer', transition: 'all 0.3s ease', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.border = `1px solid ${m.themeBorder}`; e.currentTarget.style.boxShadow = `0 10px 30px rgba(0,0,0,0.5)`; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.05)'; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                      <div style={{ position: 'absolute', top: 0, right: 0, padding: '8px 16px', background: m.badgeBg, color: m.badgeColor, fontSize: '12px', fontWeight: 'bold', borderBottomLeftRadius: '16px' }}>{m.badge}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', marginTop: '8px' }}>
                        <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${m.themeBorder}` }}>
                          <User size={32} color={m.badgeColor} />
                        </div>
                        <div>
                          <h3 style={{ fontSize: '20px', color: 'white', marginBottom: '4px' }}>{m.name}</h3>
                          <p style={{ fontSize: '14px', color: m.badgeColor, fontWeight: '500' }}>{m.role}</p>
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fbbf24', fontSize: '14px', marginBottom: '16px' }}>
                        <Star size={16} fill="#fbbf24" /><Star size={16} fill="#fbbf24" /><Star size={16} fill="#fbbf24" /><Star size={16} fill="#fbbf24" /><Star size={16} fill="#fbbf24" />
                        <span style={{ color: 'white', fontWeight: 'bold', marginLeft: '4px' }}>{m.rating}</span>
                        <span style={{ color: 'var(--text-muted)', marginLeft: '4px' }}>({m.sessions} sessions)</span>
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                        {m.expertise.map((exp, i) => (
                           <span key={i} style={{ padding: '4px 10px', background: 'rgba(255,255,255,0.05)', borderRadius: '100px', fontSize: '12px', color: 'var(--text-muted)' }}>{exp}</span>
                        ))}
                      </div>
                      
                      <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.5', flex: 1 }}>"{m.bio}"</p>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>1-on-1 Session</span>
                          <span style={{ fontSize: '18px', color: 'white', fontWeight: 'bold' }}>{m.price}<span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 'normal' }}> / 45m</span></span>
                        </div>
                        <button className="btn btn-secondary" onClick={() => handleBookMentor(m)} style={{ padding: '10px 24px', background: m.badgeBg, color: m.badgeColor, border: `1px solid rgba(255,255,255,0.05)` }}>Book Mentor</button>
                      </div>
                    </div>
                  ))}

                </div>
            </div>
          </div>
        )}

        {/* Floating AI Helper */}
        <div className="bot-button" onClick={() => setIsBotOpen(!isBotOpen)}>
          <Code2 size={28} />
        </div>

        {/* AI Chat Window */}
        <div className={`glass-panel ai-chat-window ${isBotOpen ? 'open' : ''}`}>
          <div className="chat-header">
            <Bot size={24} color="var(--primary)" />
            <div style={{ fontWeight: 600 }}>Helping Hands AI</div>
            <button 
              className="btn" 
              style={{ background: 'transparent', padding: '4px', marginLeft: 'auto', border: 'none', color: 'white', fontSize: '20px' }}
              onClick={() => setIsBotOpen(false)}
            >
              ×
            </button>
          </div>
          
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-bubble ${msg.role}`}>
                 <ReactMarkdown 
                    components={{
                      code: ({className, children, ...props}) => {
                        return (
                          <code className={className} style={{background: 'rgba(0,0,0,0.3)', padding: '2px 4px', borderRadius: '4px'}} {...props}>
                            {children}
                          </code>
                        )
                      },
                      pre: ({children, ...props}) => (
                        <pre style={{background: 'rgba(0,0,0,0.4)', padding: '12px', borderRadius: '8px', overflowX: 'auto', marginTop: '8px', marginBottom: '8px', border: '1px solid rgba(255,255,255,0.1)'}} {...props}>
                          {children}
                        </pre>
                      )
                    }}
                  >
                   {msg.text}
                 </ReactMarkdown>
              </div>
            ))}
            {isTyping && (
              <div className="typing-indicator">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input-area" onSubmit={handleChatSubmit}>
            <input 
              type="text" 
              className="chat-input" 
              placeholder="Ask for coding help..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
            />
            <button className="btn btn-primary" style={{ padding: '10px' }} type="submit">
              <ChevronRight size={18} />
            </button>
          </form>
        </div>

      </main>
      {/* Mentorship Booking Modal */}
      {showBookingModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
          background: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(8px)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.2s'
        }}>
          <div className="card glass-panel" style={{ width: '450px', padding: '32px', display: 'flex', flexDirection: 'column', position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', overflow: 'hidden' }}>
            <button 
              onClick={() => setShowBookingModal(false)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '24px', cursor: 'pointer', transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.target.style.color = 'white'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
              disabled={bookingStatus === 'confirming'}
            >
              &times;
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Calendar color="var(--primary)" size={28} />
              </div>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>Book Session</h2>
                <p style={{ color: 'var(--primary)', fontSize: '14px', marginTop: '4px' }}>{selectedMentor?.name}</p>
              </div>
            </div>

            {bookingStatus === '' && (
              <div style={{ animation: 'fadeIn 0.3s' }}>
                <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '12px', padding: '16px', marginBottom: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px' }}>Select Date</div>
                  <input type="date" className="auth-input" style={{ marginBottom: '16px', padding: '12px', background: 'rgba(255,255,255,0.05)', colorScheme: 'dark' }} value={selectedDate} onChange={e => setSelectedDate(e.target.value)} />
                  <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px' }}>Select Time (IST)</div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {['10:00 AM', '02:00 PM', '06:30 PM', '09:00 PM'].map((time) => (
                      <button key={time} onClick={() => setSelectedTime(time)} className={`btn ${selectedTime === time ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '8px 16px', fontSize: '13px', flex: 1 }}>{time}</button>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', padding: '0 8px' }}>
                     <span style={{ color: 'var(--text-muted)' }}>Total Amount</span>
                     <span style={{ fontSize: '20px', color: 'white', fontWeight: 'bold' }}>{selectedMentor?.price}</span>
                </div>
                <button 
                  className="btn btn-primary" 
                  style={{ width: '100%', padding: '14px', fontSize: '16px', opacity: (!selectedTime || !selectedDate) ? 0.5 : 1, cursor: (!selectedTime || !selectedDate) ? 'not-allowed' : 'pointer' }} 
                  disabled={!selectedTime || !selectedDate} 
                  onClick={handleProceedToPayment}
                >
                  Proceed to Payment
                </button>
              </div>
            )}

            {bookingStatus === 'payment' && (
              <div style={{ animation: 'fadeIn 0.3s' }}>
                <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '12px', padding: '16px', marginBottom: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px' }}>Select Payment Method</div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                    <div style={{ padding: '16px', border: '1px solid var(--primary)', borderRadius: '8px', background: 'rgba(139, 92, 246, 0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <Smartphone color="var(--primary)" size={24} />
                      <span style={{ fontSize: '14px', fontWeight: 'bold' }}>UPI / QR</span>
                    </div>
                    <div style={{ padding: '16px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', background: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer', opacity: 0.7 }}>
                      <CreditCard color="var(--text-muted)" size={24} />
                      <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Card</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px', padding: '16px', background: 'transparent', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '12px' }}>
                    <div style={{ background: 'white', padding: '12px', borderRadius: '12px', marginBottom: '12px' }}>
                      <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=${selectedMentor?.upiId || 'mentor@okicici'}&pn=${encodeURIComponent(selectedMentor?.name || '')}&am=${(selectedMentor?.price || '').replace(/[^0-9]/g, '')}`} alt="Scan to Pay Mentor" style={{ width: '130px', height: '130px', display: 'block' }} />
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Scan with GPay, PhonePe, or Paytm</div>
                    <div style={{ fontSize: '15px', fontWeight: 'bold', color: 'white', marginTop: '6px', background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '100px' }}>{selectedMentor?.upiId || 'mentor@okicici'}</div>
                  </div>

                  <div className="auth-input-group" style={{ marginBottom: '0' }}>
                    <label>Enter Reference / Transaction ID after paying</label>
                    <input type="text" className="auth-input" placeholder="e.g. 123456789012" style={{ background: 'rgba(255,255,255,0.05)', color: 'white' }} />
                  </div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', padding: '0 8px' }}>
                     <span style={{ color: 'var(--text-muted)' }}>Amount to Pay</span>
                     <span style={{ fontSize: '20px', color: '#10b981', fontWeight: 'bold' }}>{selectedMentor?.price}</span>
                </div>
                
                <button 
                  className="btn btn-primary" 
                  style={{ width: '100%', padding: '14px', fontSize: '16px', background: '#10b981', borderColor: '#10b981', display: 'flex', justifyContent: 'center', alignItems: 'center' }} 
                  onClick={confirmBooking}
                >
                  <Lock size={16} style={{ marginRight: '8px' }} />
                  Secure Pay {selectedMentor?.price}
                </button>
                <button className="btn" style={{ width: '100%', padding: '12px', marginTop: '12px', background: 'transparent', color: 'var(--text-muted)', border: 'none' }} onClick={() => setBookingStatus('')}>
                  Back to Calendar
                </button>
              </div>
            )}

            {bookingStatus === 'confirming' && (
              <div style={{ textAlign: 'center', padding: '40px 0', animation: 'fadeIn 0.3s' }}>
                <div className="typing-indicator" style={{ display: 'inline-flex', marginBottom: '24px' }}>
                  <div className="typing-dot" style={{ width: '12px', height: '12px' }}></div>
                  <div className="typing-dot" style={{ width: '12px', height: '12px' }}></div>
                  <div className="typing-dot" style={{ width: '12px', height: '12px' }}></div>
                </div>
                <h3 style={{ fontSize: '18px', color: 'white', marginBottom: '8px' }}>Securing your slot...</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Connecting with {selectedMentor?.name}'s calendar</p>
              </div>
            )}

            {bookingStatus === 'success' && (
              <div style={{ textAlign: 'center', padding: '30px 0', animation: 'fadeIn 0.4s' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', marginBottom: '16px' }}>
                  <CheckCircle2 color="#10b981" size={40} />
                </div>
                <h3 style={{ fontSize: '22px', color: 'white', marginBottom: '8px' }}>Booking Confirmed!</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.6' }}>
                  You are all set for a session with <strong style={{ color: 'white' }}>{selectedMentor?.name}</strong> on <strong style={{ color: 'white' }}>{selectedDate} at {selectedTime}</strong>. A Google Meet link has been sent to your email.
                </p>
                <button className="btn btn-secondary" style={{ width: '100%', padding: '12px' }} onClick={() => setShowBookingModal(false)}>Back to Dashboard</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mentor Enrollment Modal */}
      {showMentorEnrollModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
          background: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(8px)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.2s'
        }}>
          <div className="card glass-panel" style={{ width: '450px', padding: '32px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <button 
               onClick={() => setShowMentorEnrollModal(false)}
               style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '24px', cursor: 'pointer' }}
            >
              &times;
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <Briefcase color="#60a5fa" size={24} />
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Register as Mentor</h2>
            </div>
            
            <form onSubmit={handleEnrollMentor} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="auth-input-group">
                  <label>Display Name</label>
                  <input type="text" className="auth-input" placeholder="e.g. Aditi P." value={newMentor.name} onChange={e => setNewMentor({...newMentor, name: e.target.value})} required />
                </div>
                <div className="auth-input-group">
                  <label>Professional Role & Company</label>
                  <input type="text" className="auth-input" placeholder="e.g. Prompt Engineer at OpenAI" value={newMentor.role} onChange={e => setNewMentor({...newMentor, role: e.target.value})} required />
                </div>
                <div className="auth-input-group">
                  <label>Pricing per 45min Session (₹)</label>
                  <input type="text" className="auth-input" placeholder="e.g. ₹999" value={newMentor.price} onChange={e => setNewMentor({...newMentor, price: e.target.value})} required />
                </div>
                <div className="auth-input-group">
                  <label>Your receiving UPI ID (For getting paid)</label>
                  <input type="text" className="auth-input" placeholder="e.g. aditi.mentor@okicici" value={newMentor.upiId} onChange={e => setNewMentor({...newMentor, upiId: e.target.value})} required />
                </div>
                <div className="auth-input-group">
                  <label>Expertise Categories (comma separated)</label>
                  <input type="text" className="auth-input" placeholder="e.g. Next.js, Architecture, Rust" value={newMentor.expertise} onChange={e => setNewMentor({...newMentor, expertise: e.target.value})} required />
                </div>
                <div className="auth-input-group">
                  <label>Short Bio Profile</label>
                  <input type="text" className="auth-input" placeholder="e.g. I help candidates excel in highly scalable projects." value={newMentor.bio} onChange={e => setNewMentor({...newMentor, bio: e.target.value})} required />
                </div>
                
                <button type="submit" className="btn btn-primary" style={{ marginTop: '8px', padding: '14px' }}>Create Mentor Profile</button>
            </form>
          </div>
        </div>
      )}

      {/* Course Modal (Working Prototype Demo) */}
      {showCourseModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
          background: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(8px)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className="card glass-panel" style={{ width: '900px', height: '600px', padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px 24px', background: 'rgba(255, 255, 255, 0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Video color="var(--primary)" size={24} />
                <h2 style={{ fontSize: '18px' }}>{selectedCourse ? selectedCourse.title : 'Interactive Module'}</h2>
              </div>
              <button 
                onClick={() => { setShowCourseModal(false); setIsVideoPlaying(false); }}
                style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer', zIndex: 10 }}
              >
                &times;
              </button>
            </div>
            
            <div style={{ flex: 1, display: 'flex' }}>
              <div style={{ flex: 2, background: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                {isVideoPlaying ? (
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/rvqwJ_Fkixg?autoplay=1" 
                    title={selectedCourse?.title ? `Lesson: ${selectedCourse.title}` : "Interactive Lesson"}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen>
                  </iframe>
                ) : (
                  <>
                    <div style={{ textAlign: 'center', cursor: 'pointer', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} onClick={() => setIsVideoPlaying(true)}>
                      <PlayCircle size={64} color="var(--primary)" style={{ opacity: 0.8 }} />
                      <p style={{ color: 'var(--text-muted)', marginTop: '16px' }}>Click to Play Interactive Lesson</p>
                    </div>
                    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '4px', background: 'rgba(255, 255, 255, 0.2)' }}>
                      <div style={{ width: '35%', height: '100%', background: 'var(--primary)' }}></div>
                    </div>
                  </>
                )}
              </div>
              <div style={{ flex: 1, padding: '24px', background: 'rgba(24, 24, 27, 0.8)', overflowY: 'auto' }}>
                <h3 style={{ fontSize: '16px', marginBottom: '16px', color: 'var(--text-muted)' }}>AI Track Curriculum</h3>
                <ul className="nav-menu" style={{ gap: '12px' }}>
                  {selectedCourse?.lessons ? selectedCourse.lessons.map((lesson, idx) => (
                    <li key={idx} style={{ padding: '12px', background: idx === 0 ? 'rgba(255, 255, 255, 0.05)' : 'transparent', borderRadius: '8px', fontSize: '14px', borderLeft: idx === 0 ? '3px solid var(--primary)' : '3px solid transparent' }}>
                      {idx + 1}. {lesson} 
                      {idx === 0 && <span className="tag accent" style={{ marginLeft: '8px', fontSize: '10px' }}>Playing</span>}
                    </li>
                  )) : (
                    <>
                      <li style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', fontSize: '14px', borderLeft: '3px solid var(--primary)' }}>1. Fallback Lesson (10:24)</li>
                      <li style={{ padding: '12px', background: 'transparent', borderRadius: '8px', fontSize: '14px', borderLeft: '3px solid transparent' }}>2. Load Balancing Concepts (15:30)</li>
                    </>
                  )}
                </ul>
                <button className="btn btn-primary" style={{ marginTop: '32px', width: '100%' }} onClick={() => { setShowCourseModal(false); setIsVideoPlaying(false); }}>
                  Mark as Complete & Return
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Test Modal (Premium Concept Demo) */}
      {showTestModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
          background: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(8px)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.2s'
        }}>
          <div className="card glass-panel" style={{ width: '600px', padding: '32px', display: 'flex', flexDirection: 'column', position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
            <button 
              onClick={closeTestModal}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '24px', cursor: 'pointer', transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.target.style.color = 'white'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
            >
              &times;
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BrainCircuit color="var(--primary)" size={28} />
              </div>
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: 'white' }}>{selectedTest}</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>AI Adaptive Assessment</p>
              </div>
            </div>

            {!isTestActive && !showTestResults && (
              <>
                <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '12px', padding: '20px', marginBottom: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Questions</span>
                    <span style={{ color: 'white', fontWeight: 'bold' }}>{currentQuestions.length} Multiple Choice</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Time Limit</span>
                    <span style={{ color: 'white', fontWeight: 'bold' }}>30 Minutes</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Difficulty</span>
                    <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>Adaptive</span>
                  </div>
                </div>
                
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '32px', textAlign: 'center', lineHeight: '1.6' }}>
                  This test dynamically adjusts its difficulty based on your answers to quickly and accurately predict your knowledge level. Make sure you have a quiet environment.
                </p>

                <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
                  <button className="btn btn-secondary" style={{ padding: '12px 24px' }} onClick={closeTestModal}>
                    Cancel
                  </button>
                  <button className="btn btn-primary" style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={startTest}>
                    <PlayCircle size={18} /> Begin Assessment
                  </button>
                </div>
              </>
            )}

            {isTestActive && (
              <>
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Question {currentQuestionIndex + 1} of {currentQuestions.length}</span>
                  </div>
                  <div className="progress-bg" style={{ height: '6px' }}>
                    <div className="progress-fill" style={{ width: `${((currentQuestionIndex + 1) / currentQuestions.length) * 100}%` }}></div>
                  </div>
                </div>
                
                <h3 style={{ fontSize: '18px', color: 'white', marginBottom: '24px', lineHeight: '1.5' }}>
                  {currentQuestions[currentQuestionIndex].question}
                </h3>
  
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                  {currentQuestions[currentQuestionIndex].options.map((option, idx) => (
                    <button 
                      key={idx}
                      style={{ 
                        padding: '16px', 
                        background: testAnswers[currentQuestionIndex] === option ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255, 255, 255, 0.05)', 
                        border: testAnswers[currentQuestionIndex] === option ? '1px solid var(--primary)' : '1px solid rgba(255, 255, 255, 0.1)', 
                        borderRadius: '8px', 
                        textAlign: 'left', 
                        color: 'white',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onClick={() => handleAnswerSelect(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button 
                    className="btn btn-primary" 
                    style={{ padding: '12px 32px' }} 
                    onClick={handleNextQuestion}
                    disabled={!testAnswers[currentQuestionIndex]}
                  >
                    {currentQuestionIndex === currentQuestions.length - 1 ? 'Submit Assessment' : 'Next Question'}
                  </button>
                </div>
              </>
            )}

            {showTestResults && (
              <div style={{ textAlign: 'center', padding: '24px 0', animation: 'fadeIn 0.4s' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', borderRadius: '50%', background: testScores[selectedTest] > 70 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)', marginBottom: '16px' }}>
                  <Award color={testScores[selectedTest] > 70 ? '#10b981' : '#f59e0b'} size={40} />
                </div>
                <h3 style={{ fontSize: '24px', color: 'white', marginBottom: '8px' }}>Assessment Complete</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Predictive Score: <strong style={{ color: testScores[selectedTest] > 70 ? '#10b981' : '#f59e0b', fontSize: '20px' }}>{testScores[selectedTest]}%</strong></p>
                
                <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '12px', padding: '16px', marginBottom: '32px', textAlign: 'left', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                    {testScores[selectedTest] > 70 
                      ? "Great job! You have a solid grasp of these concepts. We have updated your skill tracker and unlocked the next module in your roadmap." 
                      : "We noticed some knowledge gaps. We've added personalized refresher tasks to your plan to get you up to speed quickly."}
                  </p>
                </div>

                <button className="btn btn-primary" style={{ width: '100%', padding: '14px', fontSize: '16px' }} onClick={closeTestModal}>
                  Return to Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Interactive IDE Task Modal for Internship Prep */}
      {activeInternshipTask && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
          background: 'rgba(0, 0, 0, 0.9)', backdropFilter: 'blur(10px)', zIndex: 1100,
          display: 'flex', flexDirection: 'column'
        }}>
          {/* Editor Header */}
          <div style={{ padding: '12px 24px', background: '#1e1e1e', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Code2 color="#60a5fa" size={20} />
                <span style={{ color: '#d4d4d4', fontSize: '14px', fontFamily: 'monospace' }}>{dreamCompany || 'BigTech'}_Secure_Environment.tsx</span>
             </div>
             <button onClick={() => setActiveInternshipTask(null)} style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer', fontSize: '24px' }}>&times;</button>
          </div>
          
          <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
             {/* Sidebar Problem statement */}
             <div style={{ width: '400px', background: '#252526', borderRight: '1px solid #333', padding: '24px', overflowY: 'auto' }}>
                 <div className="tag" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa', marginBottom: '16px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>{activeInternshipTask.xp}</div>
                 <h2 style={{ color: 'white', fontSize: '20px', marginBottom: '12px', fontWeight: 'bold' }}>{activeInternshipTask.title}</h2>
                 <p style={{ color: '#ccc', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
                    {activeInternshipTask.desc}
                 </p>
                 <div style={{ background: '#1e1e1e', padding: '16px', borderRadius: '8px', border: '1px solid #333' }}>
                    <h3 style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.5px' }}>Production Requirements</h3>
                    <ul style={{ color: '#d4d4d4', fontSize: '13px', paddingLeft: '20px', lineHeight: '2', margin: 0 }}>
                       <li>Must handle network failures natively.</li>
                       <li>O(1) time complexity cache lookup.</li>
                       <li>Deploy via secure VPC endpoints.</li>
                       <li>99.99% Guaranteed uptime metrics.</li>
                    </ul>
                 </div>
             </div>

             {/* Code Area */}
             <div style={{ flex: 1, background: '#1e1e1e', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                <div style={{ flex: 1, padding: '24px', color: '#d4d4d4', fontFamily: 'monospace', fontSize: '15px', lineHeight: '1.6', overflowY: 'auto' }}>
                   <span style={{ color: '#569cd6' }}>import</span> {'{ '} <span style={{ color: '#9cdcfe' }}>SystemDesign</span> {' }'} <span style={{ color: '#569cd6' }}>from</span> <span style={{ color: '#ce9178' }}>'@company/core'</span>;<br/><br/>
                   <span style={{ color: '#6a9955' }}>// Initialize your robust scalable service here</span><br/>
                   <span style={{ color: '#569cd6' }}>export class</span> <span style={{ color: '#4ec9b0' }}>ScalableService</span> {'{'}<br/>
                   &nbsp;&nbsp;<span style={{ color: '#569cd6' }}>async</span> <span style={{ color: '#dcdcaa' }}>handleRequest</span>(payload: <span style={{ color: '#4ec9b0' }}>any</span>) {'{'}<br/>
                   &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#6a9955' }}>// TODO: Implement {activeInternshipTask.type} structure</span><br/>
                   &nbsp;&nbsp;&nbsp;&nbsp;console.<span style={{ color: '#dcdcaa' }}>log</span>(<span style={{ color: '#ce9178' }}>"Optimizing systems..."</span>);<br/>
                   <div style={{ position: 'relative', marginTop: '8px' }}>
                      <textarea 
                        className="custom-scrollbar"
                        style={{ width: '100%', height: '200px', background: 'rgba(0,0,0,0.2)', border: '1px solid #333', borderRadius: '4px', padding: '12px', color: '#d4d4d4', outline: 'none', resize: 'none', fontFamily: 'monospace', fontSize: '15px', lineHeight: '1.6' }}
                        placeholder="// Type your implementation code here to pass the constraints..."
                      ></textarea>
                   </div>
                   &nbsp;&nbsp;{'}'}<br/>
                   {'}'}
                </div>
                
                {/* Console Output Block */}
                <div style={{ height: '220px', background: '#000', borderTop: '1px solid #333', padding: '16px 24px', display: 'flex', flexDirection: 'column' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                       <div style={{ display: 'flex', gap: '16px' }}>
                           <span style={{ color: '#fff', fontSize: '13px', textTransform: 'uppercase', borderBottom: '1px solid #fff', paddingBottom: '4px' }}>Terminal</span>
                           <span style={{ color: '#888', fontSize: '13px', textTransform: 'uppercase' }}>Output</span>
                           <span style={{ color: '#888', fontSize: '13px', textTransform: 'uppercase' }}>Debug Console</span>
                       </div>
                       <button onClick={handleSubmitTask} disabled={isTaskSimulating} className="btn btn-primary" style={{ padding: '8px 24px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <PlayCircle size={16} /> {isTaskSimulating ? 'Executing CIA Tests...' : 'Run Simulation Tests'}
                       </button>
                   </div>
                   
                   <div style={{ flex: 1, fontFamily: 'monospace', fontSize: '14px', color: '#ccc', overflowY: 'auto' }}>
                      {isTaskSimulating ? (
                         <div style={{ animation: 'pulse 1s infinite', color: '#eab308' }}>
                            [build] compiling typescript serverless functions...<br/>
                            [test] running high-concurrency payload simulator (100,000 req/s)...<br/>
                            [test] evaluating big-O memory constraints...
                         </div>
                      ) : taskResult === 'success' ? (
                         <div style={{ color: '#10b981' }}>
                            ✓ 100/100 Test Cases Passed!<br/>
                            ✓ Zero memory leaks detected.<br/>
                            ✓ Distributed architecture holds scalable load.<br/>
                            <br/>
                            <span style={{ color: '#3b82f6' }}>=====================================================</span><br/>
                            SUCCESS! Company integration task completed natively.<br/>
                            <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>You earned {activeInternshipTask.xp}! Validating metrics...</span><br/>
                            <span style={{ color: '#3b82f6' }}>=====================================================</span>
                         </div>
                      ) : (
                         <span style={{ color: '#555' }}>&gt; Platform ready. Awaiting user compilation...</span>
                      )}
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
