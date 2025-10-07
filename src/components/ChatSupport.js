import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaComments,
  FaTimes,
  FaPaperPlane
} from 'react-icons/fa';

// Chat Support Styles
const ChatContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
`;

const ChatButton = styled(motion.button)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 12px 35px rgba(59, 130, 246, 0.6);
  }
`;

const ChatWidget = styled(motion.div)`
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 350px;
  height: 500px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media (max-width: 480px) {
    width: 320px;
    height: 450px;
    right: -10px;
  }
`;

const ChatHeader = styled.div`
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  padding: 1rem 1.5rem;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ChatTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const ChatBody = styled.div`
  flex: 1;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const WelcomeMessage = styled.div`
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 12px;
  border-left: 4px solid #3b82f6;
  font-size: 0.9rem;
  color: #374151;
  line-height: 1.5;
`;

const ChatInputContainer = styled.form`
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #3b82f6;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const SendButton = styled.button`
  padding: 0.75rem;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  border: none;
  border-radius: 12px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ChatSupport = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      // Here you would typically send the message to your chat service
      console.log('Chat message:', chatMessage);
      setChatMessage('');
    }
  };

  return (
    <ChatContainer>
      <ChatButton
        onClick={toggleChat}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ 
          scale: isChatOpen ? 0.9 : 1,
          rotate: isChatOpen ? 45 : 0 
        }}
        transition={{ duration: 0.3 }}
      >
        {isChatOpen ? <FaTimes /> : <FaComments />}
      </ChatButton>

      <AnimatePresence>
        {isChatOpen && (
          <ChatWidget
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <ChatHeader>
              <ChatTitle>Chat Support</ChatTitle>
              <CloseButton onClick={toggleChat}>
                <FaTimes />
              </CloseButton>
            </ChatHeader>
            
            <ChatBody>
              <WelcomeMessage>
                👋 Hi! I'm here to help you with any questions about our IT services. 
                How can I assist you today?
              </WelcomeMessage>
              
              <ChatInputContainer onSubmit={handleChatSubmit}>
                <ChatInput
                  type="text"
                  placeholder="Type your message..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  autoFocus
                />
                <SendButton 
                  type="submit" 
                  disabled={!chatMessage.trim()}
                >
                  <FaPaperPlane />
                </SendButton>
              </ChatInputContainer>
            </ChatBody>
          </ChatWidget>
        )}
      </AnimatePresence>
    </ChatContainer>
  );
};

export default ChatSupport;
