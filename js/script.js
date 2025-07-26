// Validação do formulário de contato
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    // Elementos do formulário
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    // Elementos de erro
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');
    
    // Função para limpar mensagens de erro
    function clearErrors() {
        nameError.textContent = '';
        emailError.textContent = '';
        subjectError.textContent = '';
        messageError.textContent = '';
        
        // Remove classes de erro dos inputs
        nameInput.style.borderColor = '#ddd';
        emailInput.style.borderColor = '#ddd';
        subjectInput.style.borderColor = '#ddd';
        messageInput.style.borderColor = '#ddd';
    }
    
    // Função para validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Função para validar um campo individual
    function validateField(input, errorElement, fieldName) {
        const value = input.value.trim();
        
        if (value === '') {
            errorElement.textContent = `${fieldName} é obrigatório.`;
            input.style.borderColor = '#e74c3c';
            return false;
        }
        
        // Validação específica para email
        if (input.type === 'email' && !isValidEmail(value)) {
            errorElement.textContent = 'Por favor, insira um email válido.';
            input.style.borderColor = '#e74c3c';
            return false;
        }
        
        // Validação de tamanho mínimo
        if (fieldName === 'Nome' && value.length < 2) {
            errorElement.textContent = 'Nome deve ter pelo menos 2 caracteres.';
            input.style.borderColor = '#e74c3c';
            return false;
        }
        
        if (fieldName === 'Assunto' && value.length < 3) {
            errorElement.textContent = 'Assunto deve ter pelo menos 3 caracteres.';
            input.style.borderColor = '#e74c3c';
            return false;
        }
        
        if (fieldName === 'Mensagem' && value.length < 10) {
            errorElement.textContent = 'Mensagem deve ter pelo menos 10 caracteres.';
            input.style.borderColor = '#e74c3c';
            return false;
        }
        
        // Se chegou até aqui, o campo é válido
        errorElement.textContent = '';
        input.style.borderColor = '#27ae60';
        return true;
    }
    
    // Validação em tempo real
    nameInput.addEventListener('blur', function() {
        validateField(nameInput, nameError, 'Nome');
    });
    
    emailInput.addEventListener('blur', function() {
        validateField(emailInput, emailError, 'E-mail');
    });
    
    subjectInput.addEventListener('blur', function() {
        validateField(subjectInput, subjectError, 'Assunto');
    });
    
    messageInput.addEventListener('blur', function() {
        validateField(messageInput, messageError, 'Mensagem');
    });
    
    // Limpar erros quando o usuário começar a digitar
    nameInput.addEventListener('input', function() {
        if (nameError.textContent !== '') {
            nameError.textContent = '';
            nameInput.style.borderColor = '#ddd';
        }
    });
    
    emailInput.addEventListener('input', function() {
        if (emailError.textContent !== '') {
            emailError.textContent = '';
            emailInput.style.borderColor = '#ddd';
        }
    });
    
    subjectInput.addEventListener('input', function() {
        if (subjectError.textContent !== '') {
            subjectError.textContent = '';
            subjectInput.style.borderColor = '#ddd';
        }
    });
    
    messageInput.addEventListener('input', function() {
        if (messageError.textContent !== '') {
            messageError.textContent = '';
            messageInput.style.borderColor = '#ddd';
        }
    });
    
    // Validação no envio do formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Previne o envio padrão do formulário
        
        // Limpa erros anteriores
        clearErrors();
        
        // Valida todos os campos
        const isNameValid = validateField(nameInput, nameError, 'Nome');
        const isEmailValid = validateField(emailInput, emailError, 'E-mail');
        const isSubjectValid = validateField(subjectInput, subjectError, 'Assunto');
        const isMessageValid = validateField(messageInput, messageError, 'Mensagem');
        
        // Se todos os campos são válidos
        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            // Simula o envio do formulário
            simulateFormSubmission();
        } else {
            // Foca no primeiro campo com erro
            const firstErrorField = document.querySelector('input[style*="border-color: rgb(231, 76, 60)"], textarea[style*="border-color: rgb(231, 76, 60)"]');
            if (firstErrorField) {
                firstErrorField.focus();
            }
        }
    });
    
    // Função para simular o envio do formulário
    function simulateFormSubmission() {
        // Desabilita o botão de envio
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        
        // Simula um delay de envio
        setTimeout(function() {
            // Esconde o formulário
            form.style.display = 'none';
            
            // Mostra a mensagem de sucesso
            successMessage.style.display = 'block';
            
            // Scroll suave para a mensagem de sucesso
            successMessage.scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
            
            // Opcional: Resetar o formulário após alguns segundos
            setTimeout(function() {
                form.reset();
                clearErrors();
                form.style.display = 'flex';
                successMessage.style.display = 'none';
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 5000); // Mostra a mensagem por 5 segundos
            
        }, 1500); // Simula 1.5 segundos de processamento
    }
    
    // Função para resetar o formulário (caso necessário)
    function resetForm() {
        form.reset();
        clearErrors();
        successMessage.style.display = 'none';
    }
    
    // Adiciona animação suave aos campos quando focados
    const formInputs = form.querySelectorAll('input, textarea');
    formInputs.forEach(function(input) {
        input.addEventListener('focus', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

