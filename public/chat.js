let selectedPlan = null;
let messages = [];

function getInitialGreeting(planName) {
  switch (planName) {
    case 'Foundation':
      return `Welcome! I see you're interested in our Foundation plan. This is perfect for small businesses starting their AI journey. The setup fee ranges from $99-$350, and monthly costs are $50-$199. Would you like to know more about what's included?`;
    case 'Advance':
      return `Hello! Great choice looking into our Advance plan. This comprehensive solution is ideal for growing businesses ready to fully embrace AI. The setup fee starts at $800, with monthly costs between $349-$900. What aspects would you like to explore?`;
    case 'Custom':
      return `Welcome! You're looking at our Custom plan, designed for businesses with unique requirements. We'll create a tailored solution just for you. What specific challenges would you like to address?`;
    default:
      return `Hey there! I'm here to help you schedule a free consultation. What's your name?`;
  }
}

function generateResponse(input, planName) {
  input = input.toLowerCase();
  
  if (input.includes('schedule') || input.includes('book') || input.includes('consultation')) {
    showSchedulerForm();
    return "I'll help you schedule a free consultation. Please fill out the form below:";
  }

  if (input.includes('price') || input.includes('cost')) {
    switch (planName) {
      case 'Foundation':
        return "The Foundation plan starts at $50/month with a one-time setup fee of $99-$350. This includes our core AI assistant and standard integration support. Would you like to schedule a consultation to discuss the details?";
      case 'Advance':
        return "The Advance plan ranges from $349-$900/month with a setup fee starting at $800. This includes our full suite of AI tools and priority support. Shall we schedule a call to explore how this fits your needs?";
      case 'Custom':
        return "Our Custom plan is tailored to your specific needs. We'll provide detailed pricing after understanding your requirements during a consultation. Would you like to schedule one?";
    }
  }

  if (input.includes('feature') || input.includes('include')) {
    switch (planName) {
      case 'Foundation':
        return "The Foundation plan includes our 24/7 AI Assistant, standard integration capabilities, and email support. Would you like me to elaborate on any of these features?";
      case 'Advance':
        return "The Advance plan includes advanced AI tools, full suite integration, and priority support. Plus, you get access to our premium features. Would you like to know more about any specific feature?";
      case 'Custom':
        return "Our Custom plan can include any combination of our features, plus custom development for your specific needs. What kind of features are you looking for?";
    }
  }

  return "I'd be happy to tell you more about our " + planName + " plan. What specific aspects would you like to know about - pricing, features, or implementation process? Or would you like to schedule a free consultation?";
}

function addMessage(text, sender) {
  const messagesContainer = document.getElementById('chatMessages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-message ${sender}`;
  
  messageDiv.innerHTML = `
    <div class="chat-avatar ${sender === 'user' ? 'user' : 'bot'}">
      ${sender === 'user' ? '👤' : '<i class="fas fa-robot"></i>'}
    </div>
    <div class="chat-bubble ${sender === 'user' ? 'user' : 'bot'}">
      ${text}
    </div>
  `;
  
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function openChatModal(planName) {
  selectedPlan = planName;
  document.getElementById('planName').textContent = planName;
  document.getElementById('chatModal').classList.remove('hidden');
  document.getElementById('chatMessages').innerHTML = '';
  addMessage(getInitialGreeting(planName), 'bot');
}

function closeChatModal() {
  document.getElementById('chatModal').classList.add('hidden');
  selectedPlan = null;
  document.getElementById('chatMessages').innerHTML = '';
}

function sendMessage(event) {
  event.preventDefault();
  const input = document.getElementById('messageInput');
  const message = input.value.trim();
  
  if (!message) return;
  
  addMessage(message, 'user');
  input.value = '';
  
  setTimeout(() => {
    const response = generateResponse(message, selectedPlan);
    addMessage(response, 'bot');
  }, 500);
}

function showSchedulerForm() {
  const form = document.createElement('div');
  form.className = 'scheduler-form';
  form.innerHTML = `
    <h4>Schedule Consultation</h4>
    <form onsubmit="handleScheduleSubmit(event)" class="form-group">
      <input type="text" class="form-input" placeholder="Your Name" required />
      <input type="email" class="form-input" placeholder="Your Email" required />
      <input type="date" class="form-input" required />
      <input type="time" class="form-input" required />
      <textarea class="form-input" placeholder="Any specific topics you'd like to discuss?" rows="3"></textarea>
      <button type="submit" class="form-submit">Schedule Consultation</button>
    </form>
  `;
  
  const messagesContainer = document.getElementById('chatMessages');
  messagesContainer.appendChild(form);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function handleScheduleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  
  // Here you would typically send this data to your backend
  console.log('Schedule data:', Object.fromEntries(formData));
  
  addMessage("Thank you! I've scheduled a consultation for you. You'll receive a confirmation email shortly with meeting details.", 'bot');
  form.parentElement.remove();
}

// Close modal when clicking outside
document.getElementById('chatModal').addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    closeChatModal();
  }
});
