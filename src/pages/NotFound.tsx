import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { ArrowLeft } from 'lucide-react';

const NOT_FOUND_CONTENT = {
  errorCode: "404",
  title: "Destination Unknown",
  description: "The architectural endpoint you are attempting to access cannot be resolved. It may have been deprecated, relocated, or never existed in the repository.",
  buttonText: "Return to previous domain"
};

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-lg w-full flex flex-col items-center space-y-6">
        
        {/* Large Aesthetic Error Code Background */}
        <h1 className="text-8xl md:text-[150px] font-bold text-accent/10 tracking-tighter select-none">
          {NOT_FOUND_CONTENT.errorCode}
        </h1>
        
        <div className="flex flex-col items-center space-y-4 -mt-12 md:-mt-20 relative z-10 w-full">
          <h2 className="text-2xl md:text-4xl font-semibold text-primary tracking-tight">
            {NOT_FOUND_CONTENT.title}
          </h2>
          
          <p className="text-secondary text-base md:text-lg max-w-sm mx-auto font-light leading-relaxed">
            {NOT_FOUND_CONTENT.description}
          </p>
          
          <div className="pt-8">
            <Button 
              onClick={() => navigate(-1)}
              className="group bg-transparent text-accent hover:bg-transparent shadow-none transition-all duration-300 p-8 text-base font-medium flex items-center justify-center focus:outline-none focus:ring-0"
            >
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
              {NOT_FOUND_CONTENT.buttonText}
            </Button>
          </div>
        </div>
        
      </div>
    </div>
  );
}
