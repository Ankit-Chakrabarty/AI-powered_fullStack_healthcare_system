import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useChat } from 'ai/react';
import './About.css'; // We'll add some styles here

// About page component
const About = () => {
  const [activeTab, setActiveTab] = useState("free");
  
  useEffect(() => {
    // GSAP animation for background color change
    gsap.to('body', {
      backgroundColor: '#ff7e5f', // Change background color
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-amber-500 to-amber-900">
      <header className="py-6 px-4 text-white">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">MediConsult AI</h1>
          <p className="text-lg">Your AI-Powered Medical Assistant</p>
        </div>
      </header>
      
      <main className="container mx-auto p-4 md:p-8">
        <div className="tabs">
          
          <div className="tab-content">
            {activeTab === "free" && (
              <div className="card">
                <div className="card-header">
                  <h2 className="card-title">Free Health Consultation</h2>
                  <p className="card-description">
                    Ask any health-related questions and get instant AI-powered answers.
                  </p>
                </div>
                <div className="card-content">
                  <ChatInterface />
                </div>
              </div>
            )}
            
            {activeTab === "paid" && (
              <div className="card">
                <div className="card-header">
                  <h2 className="card-title">Premium Consultation</h2>
                  <p className="card-description">
                    Schedule a one-on-one consultation with our medical professionals.
                  </p>
                </div>
                <div className="card-content">
                  <div className="benefits-box">
                    <h3 className="font-medium text-lg">Benefits of Premium Service:</h3>
                    <ul className="benefits-list">
                      <li>Direct access to licensed medical professionals</li>
                      <li>Personalized treatment recommendations</li>
                      <li>Prescription assistance when appropriate</li>
                      <li>Follow-up consultations and continuous care</li>
                      <li>Priority scheduling and extended session times</li>
                    </ul>
                  </div>
                  
                  <button className="primary-button w-full">
                    Book Premium Consultation
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

function ChatInterface() {
  const [chatMessages, setChatMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputText.trim()) return;
    
    // Add user message to the chat
    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setInputText('');
    
    try {
      // Send all messages to maintain context
      const response = await fetch('http://localhost:4000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...chatMessages, userMessage]
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get response');
      }
      
      const data = await response.json();
      
      // Add AI response to chat
      setChatMessages(prev => [...prev, {
        id: Date.now().toString() + '-ai',
        role: 'assistant',
        content: data.content || data.text || "Sorry, I couldn't process that request."
      }]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message to chat
      setChatMessages(prev => [...prev, {
        id: Date.now().toString() + '-error',
        role: 'assistant',
        content: "Sorry, there was an error processing your request."
      }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="chat-container">
      <div className="chat-messages">
        {chatMessages.length === 0 ? (
          <div className="welcome-message">
            <p className="mb-2">👋 Welcome to our free health consultation service!</p>
            <p>Ask any health-related questions to get started.</p>
          </div>
        ) : (
          chatMessages.map((message) => (
            <div 
              key={message.id} 
              className={`message ${message.role === 'user' ? 'user-message' : 'ai-message'}`}
            >
              <div className="avatar">
                {message.role === 'user' ? 'U' : 'AI'}
              </div>
              <div className="message-content">
                {message.content}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="message ai-message">
            <div className="avatar">AI</div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSendMessage} className="chat-input-form">
        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your health question here..."
          className="chat-input"
          disabled={isLoading}
        />
        <button 
          type="submit" 
          className="send-button"
          disabled={isLoading || !inputText.trim()}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}

export default About;
