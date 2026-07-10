import React from 'react';
import { 
  Users, Sliders, Calendar, MapPin, BarChart3, Building2, 
  BookOpen, MessageSquare, ShieldCheck, Zap 
} from 'lucide-react';

export const renderIcon = (name: string, className: string = 'w-5 h-5') => {
  switch (name) {
    case 'Users': 
      return <Users className={className} />;
    case 'Sliders': 
      return <Sliders className={className} />;
    case 'Calendar': 
      return <Calendar className={className} />;
    case 'MapPin': 
      return <MapPin className={className} />;
    case 'BarChart3': 
      return <BarChart3 className={className} />;
    case 'Building2': 
      return <Building2 className={className} />;
    case 'BookOpen': 
      return <BookOpen className={className} />;
    case 'MessageSquare': 
      return <MessageSquare className={className} />;
    case 'ShieldCheck': 
      return <ShieldCheck className={className} />;
    case 'Zap': 
      return <Zap className={className} />;
    default: 
      return <Zap className={className} />;
  }
};
