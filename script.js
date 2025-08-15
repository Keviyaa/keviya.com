document.addEventListener('DOMContentLoaded', function () {
    // 1. INITIALIZE CODEMIRROR EDITOR
    const editor = CodeMirror.fromTextArea(document.getElementById('code-editor'), {
        lineNumbers: true,
        mode: 'javascript', // Default language
        theme: 'material-darker',
        lineWrapping: true,
        autofocus: true,
    });

    // Auto-adjust editor height
    editor.setSize(null, 'auto');
    editor.on('change', () => {
        editor.setSize(null, 'auto');
    });
    
    // 2. GET DOM ELEMENTS
    const sendButton = document.getElementById('send-button');
    const chatHistory = document.getElementById('chat-history');

    // 3. EVENT LISTENER FOR THE SEND BUTTON
    sendButton.addEventListener('click', handleSend);
    
    // Allow submitting with Ctrl+Enter or Cmd+Enter
    editor.setOption("extraKeys", {
        "Ctrl-Enter": handleSend,
        "Cmd-Enter": handleSend,
    });


    // 4. CORE FUNCTION TO HANDLE SENDING A MESSAGE
    function handleSend() {
        const code = editor.getValue().trim();

        if (code === '') {
            return; // Don't send empty messages
        }

        // Display user's message
        displayMessage(code, 'user');

        // Clear the editor
        editor.setValue('');
        editor.focus();

        // Simulate a bot response after a short delay
        setTimeout(() => {
            displayBotResponse(code);
        }, 800);
    }

    // 5. FUNCTION TO CREATE AND DISPLAY A MESSAGE IN THE CHAT HISTORY
    function displayMessage(content, sender) {
        const messageWrapper = document.createElement('div');
        messageWrapper.classList.add('chat-message', `${sender}-message`);

        const avatar = document.createElement('div');
        avatar.classList.add('avatar');
        
        // Use a generic letter for user avatar for simplicity
        if (sender === 'user') {
            avatar.textContent = 'U';
            avatar.style.display = 'flex';
            avatar.style.alignItems = 'center';
            avatar.style.justifyContent = 'center';
            avatar.style.fontWeight = 'bold';
        } else {
            const botImg = document.createElement('img');
            botImg.src = 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_light_color_272x92dp.png';
            botImg.alt = 'bot';
            botImg.classList.add('avatar');
            avatar.replaceWith(botImg); // Replace the div with the image
        }

        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');
        
        // IMPORTANT: For code, wrap it in <pre><code> for highlighting
        // We use a simple regex to detect the language for highlighting
        let language = 'plaintext';
        if (content.trim().startsWith('<') || content.trim().startsWith('<!DOCTYPE')) language = 'xml';
        if (content.includes('function') || content.includes('const') || content.includes('let')) language = 'javascript';
        if (content.includes('def ') || content.includes('import ')) language = 'python';
        if (content.includes('#include') || content.includes('int main')) language = 'cpp';

        const pre = document.createElement('pre');
        const codeBlock = document.createElement('code');
        codeBlock.className = `language-${language}`;
        codeBlock.textContent = content; // Set text content to avoid HTML injection
        pre.appendChild(codeBlock);
        messageContent.appendChild(pre);

        // Append avatar and content to the wrapper
        if (sender === 'user') {
            messageWrapper.appendChild(messageContent);
            messageWrapper.appendChild(avatar);
        } else {
            messageWrapper.appendChild(avatar);
            messageWrapper.appendChild(messageContent);
        }
        
        chatHistory.appendChild(messageWrapper);
        
        // Apply syntax highlighting to the newly added block
        hljs.highlightElement(codeBlock);

        // Scroll to the bottom
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }
    
    // 6. FUNCTION TO SIMULATE BOT'S RESPONSE
    function displayBotResponse(userCode) {
        const messageWrapper = document.createElement('div');
        messageWrapper.classList.add('chat-message', 'bot-message');

        const botImg = document.createElement('img');
        botImg.src = 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_light_color_272x92dp.png';
        botImg.alt = 'bot';
        botImg.classList.add('avatar');

        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');

        // This is a simple placeholder response.
        // For a real application, this would come from an API.
        const lineCount = userCode.split('\n').length;
        messageContent.innerHTML = `<p>Code received! It contains ${lineCount} line(s). This is a front-end only demonstration. The code is not executed.</p>`;

        messageWrapper.appendChild(botImg);
        messageWrapper.appendChild(messageContent);
        chatHistory.appendChild(messageWrapper);
        
        // Scroll to the bottom
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }
});
