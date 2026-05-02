import { useState, useRef, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import type { ContactSection as ContactSectionType, PortfolioBrandIcon } from '../../types';
import { Input } from '../common/Input';
import { Textarea } from '../common/Textarea';
import { toast } from 'sonner';
import { Send, FileCheck, Loader2, Mail } from 'lucide-react';
import { cn } from '../../utils/cn';
import emailjs from '@emailjs/browser';
import { SocialIcon } from '../common/SocialIcon';
export function ContactSection({ contact, brand }: { contact: ContactSectionType, brand?: PortfolioBrandIcon }) {
  const [status, setStatus] = useState<'IDLE' | 'SUBMITTING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [cooldown, setCooldown] = useState(0);
  const [honey, setHoney] = useState('');

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(c => c - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  const sanitizeInput = (input: string) => {
    return input.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  };

  const checkRateLimit = () => {
    const history = JSON.parse(localStorage.getItem('emailjs_history') || '[]');
    const now = Date.now();
    const recent = history.filter((timestamp: number) => now - timestamp < 24 * 60 * 60 * 1000);
    return recent.length < 3;
  };

  const addRateLimit = () => {
    const history = JSON.parse(localStorage.getItem('emailjs_history') || '[]');
    const now = Date.now();
    const recent = history.filter((timestamp: number) => now - timestamp < 24 * 60 * 60 * 1000);
    recent.push(now);
    localStorage.setItem('emailjs_history', JSON.stringify(recent));
  };

  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  
  const [subject, setSubject] = useState(contact.formOptions?.[0] || 'Hello');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [content, setContent] = useState('');

  const isValid = email.includes('@') && content.trim().length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || cooldown > 0) return;

    if (honey) {
      setStatus('SUCCESS');
      return;
    }

    if (!checkRateLimit()) {
      toast.error('Limit exceeded', {
        description: `You can only send up to 3 messages per 24 hours. Please directly email me at ${contact.email}`
      });
      return;
    }

    let recaptchaToken = '';
    if (siteKey && recaptchaRef.current) {
      recaptchaToken = recaptchaRef.current.getValue() || '';
      if (!recaptchaToken) {
        toast.error('Verification required.', {
          description: 'Please verify you are human before sending.'
        });
        return;
      }
    }

    setStatus('SUBMITTING');
    
    try {
      const templateParams = {
        name: sanitizeInput(name || 'Anonymous'),
        email: email,
        phone: sanitizeInput(phone || 'Not provided'),
        subject: sanitizeInput(subject),
        content: sanitizeInput(content),
        site_name: brand?.portfolioBrandName || 'My Portfolio',
        brand_logo_url: brand?.image?.assetUrl || '',
        'g-recaptcha-response': recaptchaToken,
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_placeholder',
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      
      addRateLimit();
      setCooldown(60);
      
      toast.success('System message dispatched!', {
        description: 'I will get back to you securely as soon as possible.',
      });
      
      setStatus('SUCCESS');
      recaptchaRef.current?.reset();
    } catch (error) {
      console.error('EmailJS transmission error:', error);
      toast.error('Transmission failed.', {
        description: 'Failed to securely relay the message. Please try again.'
      });
      setStatus('ERROR');
      recaptchaRef.current?.reset();
    }
  };

  return (
    <section id="contact" className="w-full bg-background py-24 flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full flex flex-col md:flex-row gap-16 lg:gap-24">
        
        {/* Left Column */}
        <div className="w-full md:w-5/12 flex flex-col space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">Let's connect!</h2>
            <p className="text-lg text-secondary leading-relaxed">
              Let's build high-impact systems starts with a conversation. Currently <span className="text-primary font-medium">{contact.availability}</span>.
            </p>
          </div>

          {contact.socials && contact.socials.length > 0 && (
            <>
              <div className="w-full flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
                <span>or message me in my other socials</span>
                <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
              </div>

              <div className="flex flex-col space-y-4 pt-2">
                <a 
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-4 text-secondary hover:text-accent transition-colors group"
                >
                  <div className="p-3 rounded-lg bg-card border border-border/20 group-hover:border-accent/50 transition-colors shadow-sm">
                    <Mail className="w-5 h-5 text-accent md:text-primary group-hover:text-accent transition-colors" />
                  </div>
                  <span className="font-medium text-primary/80 group-hover:text-primary transition-colors">{contact.email}</span>
                </a>
                
                {contact.socials.map((social) => (
                  <a 
                    key={social.platform} 
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-secondary hover:text-accent transition-colors group"
                  >
                    <div className="p-3 rounded-lg bg-card border border-border/20 group-hover:border-accent/50 transition-colors shadow-sm text-primary/80 group-hover:text-accent">
                      <SocialIcon 
                        link={social} 
                        className="w-5 h-5" 
                        imgClassName="opacity-70 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                    <span className="font-medium text-primary/80 group-hover:text-primary transition-colors">
                      {social.username || social.platform}
                    </span>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Right Column: Form State Machine */}
        <div className="w-full md:w-7/12 flex flex-col">
          {status === 'SUCCESS' ? (
            <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center bg-card rounded-2xl border border-border/20 p-8 text-center animate-in fade-in zoom-in-95 duration-500 shadow-sm">
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                <FileCheck className="w-10 h-10 text-accent" />
              </div>
              <h3 className="text-3xl font-bold text-primary mb-4">Transmission complete.</h3>
              <p className="text-secondary max-w-sm mb-8">
                Your message has been securely relayed. I highly appreciate your time and will respond shortly.
              </p>
              <button 
                onClick={() => { setStatus('IDLE'); setContent(''); }}
                className="px-6 py-2 rounded-lg bg-background shadow-sm border border-border/30 text-primary hover:border-accent/50 transition-all font-medium"
              >
                Send another dispatch
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-6 animate-in fade-in duration-500">
              
              {/* Subject Selection Pill Map */}
              {contact.formOptions && contact.formOptions.length > 0 && (
                <div className="flex flex-col space-y-3">
                  <label className="text-sm font-medium text-secondary">Subject</label>
                  <div className="flex flex-wrap gap-2">
                    {contact.formOptions.map(opt => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setSubject(opt)}
                        className={cn(
                          "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border focus:outline-none focus:ring-2 focus:ring-accent/30",
                          subject === opt 
                            ? "bg-accent border-accent text-white shadow-md shadow-accent/20" 
                            : "bg-card border-border/30 text-secondary hover:border-accent/40 hover:text-primary shadow-sm"
                        )}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Honeypot Field */}
              <input 
                type="text" 
                name="_honey" 
                style={{ display: 'none' }} 
                tabIndex={-1} 
                autoComplete="off" 
                value={honey}
                onChange={e => setHoney(e.target.value)}
              />

              <div className="space-y-6 pt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary">Hello, I am <span className="text-xs text-secondary/50 font-normal ml-1">(Optional)</span></label>
                  <Input 
                    placeholder="John Doe" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    disabled={status === 'SUBMITTING'}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary">You can email me at<span className="text-accent ml-1">*</span></label>
                  <Input 
                    type="email"
                    placeholder="john@example.com" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    disabled={status === 'SUBMITTING'}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary">Or call/Viber me at <span className="text-xs text-secondary/50 font-normal ml-1">(Optional)</span></label>
                  <Input 
                    type="tel"
                    placeholder="+1 (555) 000-0000" 
                    value={phone} 
                    onChange={e => setPhone(e.target.value)}
                    disabled={status === 'SUBMITTING'}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary">Email content<span className="text-accent ml-1">*</span></label>
                  <Textarea 
                    placeholder="Compose email..." 
                    value={content} 
                    onChange={e => setContent(e.target.value)}
                    disabled={status === 'SUBMITTING'}
                    required
                  />
                </div>
              </div>

              {siteKey && (
                <div className="pt-2">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={siteKey}
                    theme="dark"
                  />
                </div>
              )}

              <div className="pt-4 flex w-full justify-end">
                <button
                  type="submit"
                  disabled={!isValid || status === 'SUBMITTING' || cooldown > 0}
                  className={cn(
                    "flex items-center gap-2 px-8 py-3 rounded-lg font-medium transition-all duration-300 w-full sm:w-auto justify-center focus:outline-none focus:ring-2 focus:ring-accent/50",
                    (!isValid || status === 'SUBMITTING' || cooldown > 0) 
                      ? "bg-card border border-border/30 text-secondary cursor-not-allowed shadow-none" 
                      : "bg-primary text-background hover:bg-primary/90 shadow-lg hover:shadow-accent/20"
                  )}
                >
                  {status === 'SUBMITTING' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : cooldown > 0 ? (
                    <span>Wait {cooldown}s</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Email</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
    </section>
  );
}
