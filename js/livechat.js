document.addEventListener('DOMContentLoaded', () => {
    const chatButton = document.getElementById('live-chat-button');
    const chatWindow = document.getElementById('live-chat-window');
    const closeChatButton = document.getElementById('close-chat-button');
    const chatForm = chatWindow.querySelector('form');
    const chatInput = document.getElementById('chat-input');
    const chatMessagesContainer = document.getElementById('chat-messages');

    const toggleChatWindow = () => {
        if (chatWindow.classList.contains('hidden')) {
            chatWindow.classList.remove('hidden');
            // થોડીવાર પછી opacity અને transform બદલો જેથી transition દેખાય
            setTimeout(() => {
                chatWindow.classList.remove('opacity-0', 'translate-y-10');
                chatWindow.classList.add('opacity-100', 'translate-y-0');
            }, 10); // Small delay to ensure 'hidden' is removed first
        } else {
            chatWindow.classList.remove('opacity-100', 'translate-y-0');
            chatWindow.classList.add('opacity-0', 'translate-y-10');
            // transition પૂરું થયા પછી 'hidden' class ઉમેરો
            setTimeout(() => {
                chatWindow.classList.add('hidden');
            }, 300); // Duration should match Tailwind transition duration
        }
    };

    if (chatButton) {
        chatButton.addEventListener('click', toggleChatWindow);
    }

    if (closeChatButton) {
        closeChatButton.addEventListener('click', toggleChatWindow);
    }

    if (chatForm) {
        chatForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const messageText = chatInput.value.trim();
            if (messageText) {
                // Display user message
                const userMessageDiv = document.createElement('div');
                userMessageDiv.classList.add('flex', 'items-start', 'gap-2.5', 'justify-end');
                
                const userMessageContent = `
                    <div class="flex flex-col gap-1 w-full max-w-[calc(100%-3.5rem)] items-end">
                        <div class="flex items-center space-x-2 rtl:space-x-reverse">
                            <span class="text-xs font-semibold text-gray-700">أنت</span>
                        </div>
                        <div class="leading-tight p-2.5 rounded-lg rounded-ee-none bg-primary text-white shadow-sm">
                            <p class="text-sm">${messageText}</p>
                        </div>
                    </div>
                    <div class="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold text-sm shadow">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                            <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
                        </svg>
                    </div>
                `;
                userMessageDiv.innerHTML = userMessageContent;
                chatMessagesContainer.appendChild(userMessageDiv);

                // Clear input and scroll down
                chatInput.value = '';
                chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;

                // Placeholder for bot response (if any)
                // setTimeout(() => {
                //     const botResponseDiv = document.createElement('div');
                //     botResponseDiv.classList.add('flex', 'items-start', 'gap-2.5');
                //     // ... add bot response structure
                //     chatMessagesContainer.appendChild(botResponseDiv);
                //     chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
                // }, 1000);
            }
        });
    }
});


