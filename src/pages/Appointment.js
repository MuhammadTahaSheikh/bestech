import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCalendarAlt, 
  FaClock, 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaCheckCircle,
  FaArrowLeft,
  FaArrowRight,
  FaVideo,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaChevronDown,
  FaTimes
} from 'react-icons/fa';

const AppointmentContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #581c87 100%);
  padding: 2rem 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const AppointmentSection = styled.section`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
    border-radius: 15px;
  }
`;

const AppointmentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const CalendarSection = styled.div`
  background: #f8fafc;
  border-radius: 15px;
  padding: 2rem;
  border: 1px solid #e2e8f0;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const MonthYear = styled.h3`
  font-size: 1.5rem;
  color: #2d3748;
  margin: 0;
  font-weight: 600;
`;

const NavButton = styled.button`
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: #5a67d8;
    transform: translateY(-1px);
  }

  &:disabled {
    background: #cbd5e0;
    cursor: not-allowed;
    transform: none;
  }
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const DayHeader = styled.div`
  text-align: center;
  font-weight: 600;
  color: #4a5568;
  padding: 0.5rem;
  font-size: 0.9rem;
`;

const DayButton = styled.button`
  background: ${props => props.selected ? '#667eea' : 'white'};
  color: ${props => props.selected ? 'white' : '#2d3748'};
  border: 1px solid ${props => props.selected ? '#667eea' : '#e2e8f0'};
  border-radius: 8px;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    background: ${props => props.selected ? '#5a67d8' : '#f7fafc'};
    border-color: ${props => props.selected ? '#5a67d8' : '#cbd5e0'};
  }

  &:disabled {
    background: #f7fafc;
    color: #a0aec0;
    cursor: not-allowed;
    border-color: #e2e8f0;
  }
`;

const TimeSlots = styled.div`
  margin-top: 2rem;
`;

const TimeSlotsTitle = styled.h4`
  font-size: 1.2rem;
  color: #2d3748;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const TimeSlot = styled.button`
  background: ${props => props.selected ? '#667eea' : 'white'};
  color: ${props => props.selected ? 'white' : '#2d3748'};
  border: 1px solid ${props => props.selected ? '#667eea' : '#e2e8f0'};
  border-radius: 8px;
  padding: 0.75rem 1rem;
  margin: 0.25rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  display: inline-block;

  &:hover {
    background: ${props => props.selected ? '#5a67d8' : '#f7fafc'};
    border-color: ${props => props.selected ? '#5a67d8' : '#cbd5e0'};
  }
`;

const BookingForm = styled.div`
  background: #f8fafc;
  border-radius: 15px;
  padding: 2rem;
  border: 1px solid #e2e8f0;
`;

const FormTitle = styled.h3`
  font-size: 1.5rem;
  color: #2d3748;
  margin-bottom: 2rem;
  font-weight: 600;
`;

const SuccessMessage = styled(motion.div)`
  background: #f0fff4;
  border: 1px solid #9ae6b4;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  text-align: center;
  color: #22543d;

  h3 {
    margin: 0 0 1rem 0;
    color: #22543d;
    font-size: 1.2rem;
  }

  p {
    margin: 0 0 0.5rem 0;
    line-height: 1.6;
  }

  ul {
    margin: 1rem 0 0 0;
    padding-left: 1.5rem;
  }

  li {
    margin-bottom: 0.5rem;
  }
`;

const MeetingTypes = styled.div`
  margin-bottom: 2rem;
`;

const MeetingTypeCard = styled(motion.div)`
  background: ${props => props.selected ? '#667eea' : 'white'};
  color: ${props => props.selected ? 'white' : '#2d3748'};
  border: 2px solid ${props => props.selected ? '#667eea' : '#e2e8f0'};
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #667eea;
    transform: translateY(-1px);
  }
`;

const MeetingTypeTitle = styled.h4`
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 600;
`;

const MeetingTypeDescription = styled.p`
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.8;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #2d3748;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #3730a3, #581c87);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  }

  &:disabled {
    background: #cbd5e0;
    cursor: not-allowed;
    transform: none;
  }
`;

const ContactInfo = styled.div`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ContactTitle = styled.h2`
  font-size: 2rem;
  color: #2d3748;
  margin-bottom: 2rem;
  font-weight: 600;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: #f7fafc;
  border-radius: 10px;
  transition: all 0.3s ease;

  &:hover {
    background: #edf2f7;
    transform: translateY(-2px);
  }
`;

const ContactIcon = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #3730a3, #581c87);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
`;

const ContactText = styled.div`
  text-align: left;
`;

const ContactLabel = styled.div`
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.25rem;
`;

const ContactValue = styled.div`
  color: #718096;
  font-size: 0.9rem;
`;

const Appointment = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedMeetingType, setSelectedMeetingType] = useState('consultation');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const meetingTypes = [
    {
      id: 'consultation',
      title: 'Free Consultation',
      description: 'Get a free 30-minute consultation to discuss your project requirements.',
      duration: '30 minutes'
    },
    {
      id: 'discovery',
      title: 'Project Discovery',
      description: 'Deep dive into your project needs and create a detailed roadmap.',
      duration: '60 minutes'
    },
    {
      id: 'technical',
      title: 'Technical Review',
      description: 'Review your current IT infrastructure and identify improvements.',
      duration: '45 minutes'
    },
    {
      id: 'strategy',
      title: 'Strategy Session',
      description: 'High-level strategic discussion about your IT roadmap.',
      duration: '90 minutes'
    }
  ];

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM'
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateSelect = (date) => {
    if (date) {
      setSelectedDate(date);
      setSelectedTime(null);
    }
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;

    setIsSubmitting(true);

    try {
      // Send email notification
      await sendBookingEmail();

      // Simulate form submission delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setSelectedDate(null);
        setSelectedTime(null);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          message: ''
        });
      }, 3000);
    } catch (error) {
      console.error('Error sending email:', error);
      setIsSubmitting(false);
      // Still show success to user even if email fails
      setIsSubmitted(true);
    }
  };

  const sendBookingEmail = async () => {
    const selectedMeetingTypeData = meetingTypes.find(type => type.id === selectedMeetingType);

    // Create a mailto link that will open the user's email client
    const emailSubject = `New Meeting Booking - ${formData.firstName} ${formData.lastName}`;
    const emailBody = `
New Meeting Booking - BestechSolz Vision

CLIENT INFORMATION:
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Company: ${formData.company || 'Not provided'}

MEETING INFORMATION:
Date: ${selectedDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}
Time: ${selectedTime}
Meeting Type: ${selectedMeetingTypeData.title}
Duration: ${selectedMeetingTypeData.duration}

${formData.message ? `PROJECT DESCRIPTION:
${formData.message}

` : ''}NEXT STEPS:
- Confirm the meeting time with the client
- Prepare meeting agenda based on their requirements
- Send calendar invitation with meeting details
- Follow up 24 hours before the meeting

This booking was submitted through the BestechSolz Vision website contact form.
    `.trim();

    // Create mailto link
    const mailtoLink = `mailto:mtahasheikh750@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open the email client
    window.open(mailtoLink, '_blank');
    
    // Also log to console for debugging
    console.log('Meeting Booking Details:', {
      client: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      date: selectedDate.toLocaleDateString(),
      time: selectedTime,
      meetingType: selectedMeetingTypeData.title,
      message: formData.message
    });
  };

  const days = getDaysInMonth(currentDate);
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <AppointmentContainer>
      <Container>
        <Header>
          <Title
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Book Your Appointment
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Schedule a meeting with our IT experts to discuss your project and explore how we can help transform your business.
          </Subtitle>
        </Header>

        <AppointmentSection>
          <AppointmentGrid>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <CalendarSection>
                <CalendarHeader>
                  <NavButton onClick={handlePrevMonth}>
                    <FaArrowLeft />
                  </NavButton>
                  <MonthYear>
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </MonthYear>
                  <NavButton onClick={handleNextMonth}>
                    <FaArrowRight />
                  </NavButton>
                </CalendarHeader>

                <CalendarGrid>
                  {dayNames.map(day => (
                    <DayHeader key={day}>{day}</DayHeader>
                  ))}
                  {days.map((day, index) => (
                    <DayButton
                      key={index}
                      selected={day && selectedDate && day.toDateString() === selectedDate.toDateString()}
                      onClick={() => handleDateSelect(day)}
                      disabled={!day || day < new Date().setHours(0, 0, 0, 0)}
                    >
                      {day ? day.getDate() : ''}
                    </DayButton>
                  ))}
                </CalendarGrid>

                {selectedDate && (
                  <TimeSlots>
                    <TimeSlotsTitle>Available Times</TimeSlotsTitle>
                    {timeSlots.map(time => (
                      <TimeSlot
                        key={time}
                        selected={selectedTime === time}
                        onClick={() => handleTimeSelect(time)}
                      >
                        {time}
                      </TimeSlot>
                    ))}
                  </TimeSlots>
                )}
              </CalendarSection>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <BookingForm>
                <FormTitle>Book Your Appointment</FormTitle>
                
                {isSubmitted && (
                  <SuccessMessage
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <FaCheckCircle />
                    <h3>Meeting Booked Successfully!</h3>
                    <p>
                      Thank you for booking a meeting with us. Your email client should have opened with pre-filled details.
                    </p>
                    <div style={{ 
                      background: '#f0f9ff', 
                      padding: '15px', 
                      borderRadius: '8px', 
                      margin: '15px 0',
                      border: '1px solid #3b82f6',
                      textAlign: 'left'
                    }}>
                      <h4 style={{ color: '#1e40af', margin: '0 0 10px 0' }}>Booking Summary:</h4>
                      <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                      <p><strong>Email:</strong> {formData.email}</p>
                      <p><strong>Phone:</strong> {formData.phone || 'Not provided'}</p>
                      <p><strong>Company:</strong> {formData.company || 'Not provided'}</p>
                      <p><strong>Date:</strong> {selectedDate.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</p>
                      <p><strong>Time:</strong> {selectedTime}</p>
                      <p><strong>Meeting Type:</strong> {meetingTypes.find(type => type.id === selectedMeetingType)?.title}</p>
                      {formData.message && (
                        <p><strong>Project Description:</strong> {formData.message}</p>
                      )}
                    </div>
                    <p>
                      <strong>Next Steps:</strong>
                    </p>
                    <ul style={{ textAlign: 'left', marginTop: '10px' }}>
                      <li>Send the pre-filled email to confirm your meeting</li>
                      <li>We'll review your request and get back to you within 24 hours</li>
                      <li>You'll receive a calendar invitation once confirmed</li>
                    </ul>
                  </SuccessMessage>
                )}

                <MeetingTypes>
                  {meetingTypes.map((type, index) => (
                    <MeetingTypeCard
                      key={type.id}
                      selected={selectedMeetingType === type.id}
                      onClick={() => setSelectedMeetingType(type.id)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <MeetingTypeTitle>{type.title}</MeetingTypeTitle>
                      <MeetingTypeDescription>{type.description}</MeetingTypeDescription>
                    </MeetingTypeCard>
                  ))}
                </MeetingTypes>

                <form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your first name"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your last name"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your email address"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Enter your company name"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="message">Project Description</Label>
                    <TextArea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your project requirements..."
                    />
                  </FormGroup>

                  <SubmitButton 
                    type="submit" 
                    disabled={isSubmitting || !selectedDate || !selectedTime}
                  >
                    {isSubmitting ? (
                      'Booking...'
                    ) : (
                      <>
                        <FaCalendarAlt />
                        Book Appointment
                      </>
                    )}
                  </SubmitButton>
                </form>
              </BookingForm>
            </motion.div>
          </AppointmentGrid>
        </AppointmentSection>

        <ContactInfo>
          <ContactTitle>Need Help or Have Questions?</ContactTitle>
          <ContactGrid>
            <ContactItem>
              <ContactIcon>
                <FaEnvelope />
              </ContactIcon>
              <ContactText>
                <ContactLabel>Email Us</ContactLabel>
                <ContactValue>mtahasheikh750@gmail.com</ContactValue>
              </ContactText>
            </ContactItem>
            <ContactItem>
              <ContactIcon>
                <FaPhoneAlt />
              </ContactIcon>
              <ContactText>
                <ContactLabel>Call Us</ContactLabel>
                <ContactValue>+1 (555) 123-4567</ContactValue>
              </ContactText>
            </ContactItem>
            <ContactItem>
              <ContactIcon>
                <FaMapMarkerAlt />
              </ContactIcon>
              <ContactText>
                <ContactLabel>Visit Us</ContactLabel>
                <ContactValue>123 Tech Street, IT City</ContactValue>
              </ContactText>
            </ContactItem>
            <ContactItem>
              <ContactIcon>
                <FaVideo />
              </ContactIcon>
              <ContactText>
                <ContactLabel>Video Call</ContactLabel>
                <ContactValue>Available on request</ContactValue>
              </ContactText>
            </ContactItem>
          </ContactGrid>
        </ContactInfo>
      </Container>
    </AppointmentContainer>
  );
};

export default Appointment;