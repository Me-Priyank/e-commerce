import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, ChevronLeft, ChevronRight, Check, ChevronDown } from 'lucide-react';

interface TimeSlot {
  id: string;
  time: string;
}

interface AppointmentVariant {
  id: string;
  name: string;
}

interface Location {
  id: string;
  name: string;
  timezone: string;
}

const BookAppointment: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string>('Studio Appointment');
  const [isVariantDropdownOpen, setIsVariantDropdownOpen] = useState<boolean>(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<string>('Chennai: GMT+05:30');
  
  // Calendar navigation functions
  const goToPreviousMonth = (): void => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setSelectedDate(newDate);
  };

  const goToNextMonth = (): void => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setSelectedDate(newDate);
  };

  // Generate calendar days
  const generateCalendarDays = (): JSX.Element[] => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    
    // First day of the month
    const firstDayOfMonth = new Date(year, month, 1);
    const dayOfWeek = firstDayOfMonth.getDay();
    
    // Last day of the month
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
    
    // Days from previous month
    const daysFromPrevMonth = dayOfWeek;
    
    const calendarDays: JSX.Element[] = [];
    
    // Add empty slots for days from previous month
    for (let i = 0; i < daysFromPrevMonth; i++) {
      calendarDays.push(<div key={`prev-${i}`} className="text-center py-2 text-gray-300"></div>);
    }
    
    // Current month's days
    const currentDay = new Date().getDate();
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    for (let day = 1; day <= lastDayOfMonth; day++) {
      const isToday = day === currentDay && month === currentMonth && year === currentYear;
      const isPast = new Date(year, month, day) < new Date(currentYear, currentMonth, currentDay);
      const isSelected = day === 21; // Example selected date (21st)
      
      calendarDays.push(
        <div 
          key={`day-${day}`} 
          className={`text-center py-2 cursor-pointer ${
            isToday ? 'font-bold' : ''
          } ${
            isPast ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gold/10'
          } ${
            isSelected ? 'bg-gold/80 text-white rounded-md' : ''
          }`}
          onClick={() => !isPast && setSelectedDate(new Date(year, month, day))}
        >
          {day}
        </div>
      );
    }
    
    return calendarDays;
  };

  // Available time slots
  const timeSlots: TimeSlot[] = [
    { id: '1', time: '11:00 AM' },
    { id: '2', time: '12:00 PM' },
    { id: '3', time: '01:00 PM' },
    { id: '4', time: '02:00 PM' },
    { id: '5', time: '03:00 PM' },
    { id: '6', time: '04:00 PM' },
  ];

  // Appointment variants
  const variants: AppointmentVariant[] = [
    { id: '1', name: 'Studio Appointment' },
    { id: '2', name: 'Virtual Consultation' },
    { id: '3', name: 'Bridal Consultation' },
    { id: '4', name: 'Custom Design Appointment' }
  ];

  // Store locations
  const locations: Location[] = [
    { id: '1', name: 'Chennai', timezone: 'GMT+05:30' },
    { id: '2', name: 'Mumbai', timezone: 'GMT+05:30' },
    { id: '3', name: 'Delhi', timezone: 'GMT+05:30' },
    { id: '4', name: 'Bangalore', timezone: 'GMT+05:30' }
  ];

  // Handle form submission
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      date: selectedDate,
      time: selectedTime,
      variant: selectedVariant,
      location: selectedLocation
    });
    // You would typically send this data to your backend
  };

  return (
    <div className="bg-[#f9f2e8] min-h-screen pb-16">
      {/* Page Header */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-heading">Book Your Appointment</h1>
        <div className="flex items-center justify-center gap-2 mt-4 text-gray-600">
          <Link to="/" className="hover:text-gold">Home</Link>
          <span>&gt;</span>
          <span>Book Your Appointment</span>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Calendar */}
          <div className="bg-gray-50 p-6 rounded-md h-[80vh] shadow-sm ">
            <h2 className="text-2xl font-heading mb-4">Appointment Booking</h2>
            
            {/* Store Address */}
            <div className="flex items-start mb-6 h-[10vh] text-gray-600">
              <MapPin size={20} className="mr-2 mt-1 text-gold flex-shrink-0 " />
              <p className="text-sm">
                Pankti Chheda, 1st floor, Johnson house, Opp Swagat building, Shraddhanand road no 1, Vile Parle East, 
                Mumbai, MH, India 400057
              </p>
            </div>
            
            {/* Calendar */}
            <div className="border rounded-md overflow-hidden bg-white lg:h-[50vh]">
              {/* Calendar Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <button 
                  onClick={goToPreviousMonth}
                  className="p-1 hover:bg-gray-100 rounded-full"
                  aria-label="Previous month"
                >
                  <ChevronLeft size={20} />
                </button>
                <h3 className="font-medium">
                  {selectedDate.toLocaleString('default', { month: 'long' })}{' '}
                  {selectedDate.getFullYear()}
                </h3>
                <button 
                  onClick={goToNextMonth}
                  className="p-1 hover:bg-gray-100 rounded-full"
                  aria-label="Next month"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              
              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-0">
                {/* Day Headers */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center py-2 text-gray-500 text-sm border-b">
                    {day}
                  </div>
                ))}
                
                {/* Calendar Days */}
                {generateCalendarDays()}
              </div>
            </div>
          </div>
          
          {/* Right Column - Booking Options */}
          <div>
            <form onSubmit={handleSubmit}>
              {/* Appointment Type Selection */}
              <div className="mb-6">
                <label className="block text-gray-600 mb-2 uppercase text-sm font-medium">
                  Choose a variant
                </label>
                <div className="relative">
                  <button
                    type="button"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md flex items-center justify-between bg-white"
                    onClick={() => setIsVariantDropdownOpen(!isVariantDropdownOpen)}
                  >
                    <span className="text-gray-800">{selectedVariant}</span>
                    <ChevronDown size={20} className={`transition-transform ${isVariantDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isVariantDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                      {variants.map(variant => (
                        <div
                          key={variant.id}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                          onClick={() => {
                            setSelectedVariant(variant.name);
                            setIsVariantDropdownOpen(false);
                          }}
                        >
                          {selectedVariant === variant.name && (
                            <Check size={16} className="mr-2 text-gold" />
                          )}
                          <span className={selectedVariant === variant.name ? 'ml-0' : 'ml-6'}>
                            {variant.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Location Selection */}
              <div className="mb-6">
                <label className="block text-gray-600 mb-2 uppercase text-sm font-medium">
                  Available Slots
                </label>
                <div className="relative">
                  <button
                    type="button"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md flex items-center justify-between bg-white"
                    onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                  >
                    <span className="text-gray-800">{selectedLocation}</span>
                    <ChevronDown size={20} className={`transition-transform ${isLocationDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isLocationDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                      {locations.map(location => {
                        const locationText = `${location.name}: ${location.timezone}`;
                        return (
                          <div
                            key={location.id}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                            onClick={() => {
                              setSelectedLocation(locationText);
                              setIsLocationDropdownOpen(false);
                            }}
                          >
                            {selectedLocation === locationText && (
                              <Check size={16} className="mr-2 text-gold" />
                            )}
                            <span className={selectedLocation === locationText ? 'ml-0' : 'ml-6'}>
                              {locationText}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Time Slots */}
              <div className="space-y-3">
                {timeSlots.map(slot => (
                  <button
                    type="button"
                    key={slot.id}
                    className={`w-full py-3 border rounded-md flex items-center justify-center transition
                      ${selectedTime === slot.time 
                        ? 'bg-gold text-white border-gold' 
                        : 'bg-white hover:bg-gold/5 border-gray-300'
                      }`}
                    onClick={() => setSelectedTime(slot.time)}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
              
             
              
              {/* Submit Button */}
              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full bg-gold hover:bg-gold/90 text-white py-3 px-6 rounded-md transition flex items-center justify-center"
                >
                  <Calendar size={18} className="mr-2" />
                  Confirm Appointment
                </button>
                <p className="text-xs text-gray-500 text-center mt-3">
                  By confirming, you agree to our booking and cancellation policies.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;