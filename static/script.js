let chatHistory = [];
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const messageContainer = document.getElementById('messageContainer');
const loadingIndicator = document.getElementById('loadingIndicator');
const emptyState = document.getElementById('emptyState');
const chatArea = document.getElementById('chatArea');

// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 300,
    once: true,
    anchorPlacement: 'top-bottom'
});

// Initialize Tooltips (Tippy)
tippy('#sendBtn', { content: 'Send message', placement: 'top', animation: 'fade' });
tippy('#clearChatBtn', { content: 'Clear Chat', placement: 'bottom', animation: 'fade' });

// Clear Chat Confirmation
document.getElementById('clearChatBtn').addEventListener('click', () => {
    Swal.fire({
        title: 'Clear conversation?',
        text: "This will reset your chat history.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#18181b', // matching theme zinc-900
        cancelButtonColor: '#71717a', // zinc-500
        confirmButtonText: 'Clear',
        customClass: {
            container: 'swal2-custom',
            popup: 'swal2-minimal-popup'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            chatHistory = [];
            messageContainer.innerHTML = '';
            if (emptyState) {
                emptyState.style.display = 'flex';
                emptyState.classList.remove('hidden');
                AOS.refresh();
            }
        }
    });
});


// Handle Textarea Autosize & Enable Button
messageInput.addEventListener('input', () => {
    // Enable/Disable Send Button
    sendBtn.disabled = messageInput.value.trim() === '';

    // Adjust Height
    messageInput.style.height = 'auto';
    messageInput.style.height = (messageInput.scrollHeight) + 'px';
});

// Send Message on Enter
messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

sendBtn.addEventListener('click', sendMessage);

function hideEmptyState() {
    if (emptyState && !emptyState.classList.contains('hidden')) {
        emptyState.style.display = 'none';
        emptyState.classList.add('hidden');
    }
}

function sendSuggestion(text) {
    messageInput.value = text;
    sendBtn.disabled = false;
    sendMessage();
}

async function sendMessage() {
    const text = messageInput.value.trim();
    if (!text) return;

    hideEmptyState();

    // Clear input
    messageInput.value = '';
    sendBtn.disabled = true;
    messageInput.style.height = 'auto';

    // Append User Message
    appendMessage(text, 'user');
    chatHistory.push({ role: 'user', content: text });

    // Show Loading
    loadingIndicator.classList.remove('hidden');
    scrollToBottom();

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ messages: chatHistory })
        });

        if (!response.ok) {
            throw new Error('Failed to communicate with Yashvi.');
        }

        const data = await response.json();
        const reply = data.reply;

        // Hide Loading
        loadingIndicator.classList.add('hidden');

        // Append Assistant Message
        appendMessage(reply, 'assistant');
        chatHistory.push({ role: 'assistant', content: reply });
    } catch (error) {
        loadingIndicator.classList.add('hidden');
        appendMessage('Something went wrong. Please try again.', 'assistant error');
    }

    scrollToBottom();
}

function appendMessage(text, role) {
    const bubble = document.createElement('div');
    bubble.className = `message-bubble ${role}`;
    bubble.setAttribute('data-aos', 'fade-up');
    bubble.setAttribute('data-aos-duration', '250');
    
    const content = document.createElement('div');
    content.className = 'message-content';
    
    if (role.includes('assistant')) {
        content.innerHTML = formatResponse(text);

        // Copy Bot Response Action
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>';
        
        tippy(copyBtn, { content: 'Copy text', placement: 'left', animation: 'fade' });

        copyBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            // To strip HTML tags from string correctly
            const cleanText = content.innerText || text;
            navigator.clipboard.writeText(cleanText).then(() => {
                Swal.fire({
                    toast: true,
                    position: 'top',
                    icon: 'success',
                    title: 'Copied!',
                    showConfirmButton: false,
                    timer: 1500
                });
            });
        });

        bubble.appendChild(copyBtn);
    } else {
        content.innerText = text;
    }

    const timestamp = document.createElement('span');
    timestamp.className = 'timestamp';
    // Luxon Formatting
    timestamp.innerText = luxon.DateTime.now().toFormat('h:mm a');

    bubble.appendChild(content);
    bubble.appendChild(timestamp);

    messageContainer.appendChild(bubble);
    AOS.refresh();
    
    scrollToBottom();
}

function scrollToBottom() {
    chatArea.scrollTop = chatArea.scrollHeight;
}

// Simple Formatter to handle bullet points and bolding
function formatResponse(text) {
    // 1. Escaping HTML tags, then formatting
    let formatted = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    // 2. Bold: **text** -> <strong>text</strong>
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // 3. Lists:
    const lines = formatted.split('\n');
    let inList = false;
    const listFormatted = lines.map(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            const content = trimmed.substring(2);
            if (!inList) {
                inList = true;
                return `<ul><li>${content}</li>`;
            }
            return `<li>${content}</li>`;
        } else {
            if (inList) {
                inList = false;
                return `</ul>${line}<br>`;
            }
            return line ? `${line}<br>` : '<br>';
        }
    });

    if (inList) {
        listFormatted.push('</ul>');
    }

    return listFormatted.join('\n');
}
