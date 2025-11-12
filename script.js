document.addEventListener('DOMContentLoaded', () => {
    
    // ----------------------------------------------------
    // DATOS ESTRUCTURALES DEL SIMULADOR
    // ----------------------------------------------------
    const SIMULATOR_DURATION_MINUTES = 25; 
    const MAX_QUESTIONS = 28;

    const QUESTIONS_DATA = [
        // Módulo Español (8 Preguntas)
        { id: 1, module: "Español", question: "¿Cuál es la función principal de un nexo coordinante en una oración?", options: ["Unir dos oraciones de diferente jerarquía.", "Modificar un sustantivo.", "Unir elementos del mismo nivel sintáctico.", "Actuar como sujeto tácito."], answer: 3 },
        { id: 2, module: "Español", question: "Identifica la opción con un error de concordancia verbal.", options: ["Los estudiantes y yo salimos tarde.", "La bandada de aves volaron al sur.", "Las noticias fueron difundidas.", "El reloj marcó las doce."], answer: 2 },
        { id: 3, module: "Español", question: "¿Qué figura retórica se utiliza en la frase 'La nieve cubre su cabello'?", options: ["Metáfora", "Símil", "Hipérbole", "Personificación."], answer: 1 },
        { id: 4, module: "Español", question: "Elige el sinónimo más adecuado para la palabra 'efímero'.", options: ["Eterno", "Fugaz", "Constante", "Perenne."], answer: 2 },
        { id: 5, module: "Español", question: "¿Cuál de las siguientes es una oración compuesta por subordinación?", options: ["Llovió mucho, así que nos mojamos.", "Estudia o repruebas el examen.", "La casa que compramos es grande.", "Vino, vio y venció."], answer: 3 },
        { id: 6, module: "Español", question: "Selecciona la palabra correctamente acentuada.", options: ["Exámen", "Cálculo", "Fácilmente", "Caminó."], answer: 2 },
        { id: 7, module: "Español", question: "¿Qué tipo de texto busca persuadir al lector sobre un punto de vista?", options: ["Narrativo", "Expositivo", "Descriptivo", "Argumentativo."], answer: 4 },
        { id: 8, module: "Español", question: "Identifica el sujeto en la frase: 'Le gustó mucho el pastel de chocolate'.", options: ["Le", "Gusto", "El pastel de chocolate", "Mucho."], answer: 3 },

        // Módulo Álgebra (7 Preguntas)
        { id: 9, module: "Álgebra", question: "Si $3x - 5 = 10$, ¿cuál es el valor de $x$?", options: ["$x=3$", "$x=5$", "$x=-5$", "$x=15$"], answer: 2 },
        { id: 10, module: "Álgebra", question: "¿Cuál es el resultado de la expresión $(a+b)^2$?", options: ["$a^2 + b^2$", "$a^2 + 2ab + b^2$", "$a^2 - b^2$", "$a^2 + ab + b^2$"], answer: 2 },
        { id: 11, module: "Álgebra", question: "Factoriza la expresión $x^2 - 9$.", options: ["$(x-3)(x-3)$", "$(x+3)(x-3)$", "$(x+3)(x+3)$", "$x(x-9)$"], answer: 2 },
        { id: 12, module: "Álgebra", question: "Si $y = 2x + 1$, ¿cuál es el valor de $y$ si $x = -3$?", options: ["$-5$", "$-2$", "$7$", "$4$"], answer: 1 },
        { id: 13, module: "Álgebra", question: "¿Cuál es la pendiente de la recta $2x + 4y = 8$?", options: ["$-2$", "$-1/2$", "$1/2$", "$2$"], answer: 2 },
        { id: 14, module: "Álgebra", question: "Resuelve el sistema de ecuaciones: $x+y=5$ y $x-y=1$.", options: ["$x=3, y=2$", "$x=4, y=1$", "$x=2, y=3$", "$x=5, y=0$"], answer: 1 },
        { id: 15, module: "Álgebra", question: "Calcula el logaritmo $\\log_{2}(16)$.", options: ["$2$", "$4$", "$8$", "$16$"], answer: 2 },

        // Módulo Historia (6 Preguntas)
        { id: 16, module: "Historia", question: "¿En qué año se consumó la Independencia de México?", options: ["1810", "1821", "1824", "1815"], answer: 2 },
        { id: 17, module: "Historia", question: "¿Quién fue el primer presidente de México?", options: ["Benito Juárez", "Guadalupe Victoria", "Miguel Hidalgo", "Agustín de Iturbide"], answer: 2 },
        { id: 18, module: "Historia", question: "¿Qué evento marcó el inicio de la Revolución Mexicana?", options: ["La Decena Trágica", "La expropiación petrolera", "El Plan de San Luis", "La Constitución de 1917"], answer: 3 },
        { id: 19, module: "Historia", question: "¿Quién promulgó las Leyes de Reforma?", options: ["Porfirio Díaz", "Venustiano Carranza", "Benito Juárez", "Álvaro Obregón"], answer: 3 },
        { id: 20, module: "Historia", question: "¿Cuál fue el objetivo principal de la Guerra de Reforma?", options: ["Establecer un imperio", "Separar la Iglesia del Estado", "Lograr la independencia", "Promover la dictadura"], answer: 2 },
        { id: 21, module: "Historia", question: "¿En qué año se firmó el Tratado de Guadalupe Hidalgo, donde México cedió territorio a EE. UU.?", options: ["1846", "1848", "1853", "1862"], answer: 2 },

        // Módulo Geografía (4 Preguntas)
        { id: 22, module: "Geografía", question: "¿Cuál es el volcán más alto de México?", options: ["Nevado de Toluca", "Popocatépetl", "Iztaccíhuatl", "Pico de Orizaba"], answer: 4 },
        { id: 23, module: "Geografía", question: "¿Qué país limita al norte con México?", options: ["Guatemala", "Belice", "Estados Unidos", "Canadá"], answer: 3 },
        { id: 24, module: "Geografía", question: "¿Cuál es el principal productor de petróleo en México?", options: ["Veracruz", "Tabasco", "Campeche", "Chiapas"], answer: 3 },
        { id: 25, module: "Geografía", question: "¿Qué tipo de clima predomina en la península de Yucatán?", options: ["Templado subhúmedo", "Seco y semiseco", "Cálido húmedo", "Polar"], answer: 3 },

        // Módulo Inglés (3 Preguntas)
        { id: 26, module: "Inglés", question: "Choose the correct sentence: 'I have ___ money.'", options: ["much", "many", "lots", "few"], answer: 1 },
        { id: 27, module: "Inglés", question: "Select the past tense of the verb 'to catch'.", options: ["catched", "caught", "cought", "catcht"], answer: 2 },
        { id: 28, module: "Inglés", question: "What does 'eager' mean?", options: ["Bored", "Angry", "Enthusiastic", "Tired"], answer: 3 },
    ];
    if (QUESTIONS_DATA.length !== MAX_QUESTIONS) {
        console.error(`Error: El total de preguntas (${QUESTIONS_DATA.length}) no coincide con MAX_QUESTIONS (${MAX_QUESTIONS}).`);
    }

    // ----------------------------------------------------
    // Funciones Comunes y Auxiliares (CORREGIDAS)
    // ----------------------------------------------------

    function checkLoginStatus() { return localStorage.getItem('aspiranteSoyMX_sesion_activa') !== null; }
    function getActiveUserData() { const userData = localStorage.getItem('aspiranteSoyMX_sesion_activa'); return userData ? JSON.parse(userData) : null; }
    function getUsuarios() { const usuariosJSON = localStorage.getItem('aspiranteSoyMX_usuarios'); return usuariosJSON ? JSON.parse(usuariosJSON) : []; }
    function formatBold(text) { return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); }

    // Función global de navegación y seguridad (window.navigateToHome se mantiene igual)
    window.navigateToHome = function() {
        const isLoggedIn = checkLoginStatus();
        const currentPage = window.location.pathname.split("/").pop(); 

        // Lista de páginas que requieren login
        const loggedInPages = ['dashboard.html', 'simulador.html', 'convocatorias.html', 'herramientas.html', 'profile.html'];

        if (isLoggedIn) {
            // Si el usuario está logueado y está en una página de login/registro, lo enviamos al dashboard
            if (currentPage === 'index.html' || currentPage === 'registro.html') {
                 window.location.href = 'dashboard.html';
            }
        } else {
            // Si el usuario no está logueado y está en una página que requiere login, lo enviamos al index
            if (loggedInPages.includes(currentPage)) {
                 window.location.href = 'index.html';
            }
        }
    }

    // Función que se ejecuta al cargar la página para forzar el login si es necesario. (CORREGIDA)
    function requireLogin() {
        const currentPage = window.location.pathname.split("/").pop(); 
        
        // PÁGINAS QUE REQUIEREN LOGIN:
        const pagesRequiringLogin = ['dashboard.html', 'simulador.html', 'convocatorias.html', 'herramientas.html', 'profile.html'];

        if (pagesRequiringLogin.includes(currentPage) && !checkLoginStatus()) {
            alert("Acceso denegado. Debes iniciar sesión.");
            window.location.href = 'index.html';
        }
    }
    requireLogin(); 

    // Función global para mostrar/ocultar la contraseña
    window.togglePasswordVisibility = function(fieldId, iconElement) {
        const passwordField = document.getElementById(fieldId);
        const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordField.setAttribute('type', type);

        if (type === 'text') {
            iconElement.textContent = 'visibility';
            iconElement.setAttribute('aria-label', 'Ocultar contraseña');
        } else {
            iconElement.textContent = 'visibility_off';
            iconElement.setAttribute('aria-label', 'Mostrar contraseña');
        }
    }
    
    // ----------------------------------------------------
    // Lógica del Simulador (Funciones expuestas a window)
    // ----------------------------------------------------
    let userAnswers = {};
    let currentModule = "Español";
    let currentQuestionIndex = 0;
    let timerInterval;
    let timeRemaining = SIMULATOR_DURATION_MINUTES * 60;
    let simulationFinished = false;

    function initializeAnswers() {
        userAnswers = QUESTIONS_DATA.reduce((acc, q) => {
            acc[q.id] = null;
            return acc;
        }, {});
    }
    
    window.startSimulator = function() {
        document.getElementById('welcome-screen').style.display = 'none';
        document.getElementById('instructions-screen').style.display = 'block';
    }

    window.startExam = function() {
        document.getElementById('instructions-screen').style.display = 'none';
        document.getElementById('simulator-interface').style.display = 'flex';
        document.getElementById('results-screen').style.display = 'none';
        
        simulationFinished = false;
        currentQuestionIndex = 0;
        timeRemaining = SIMULATOR_DURATION_MINUTES * 60;
        initializeAnswers();
        
        renderQuestion();
        renderNavigation();
        startTimer();
    }
    
    function renderTimer() {
        const timerElement = document.getElementById('timer-display');
        if (!timerElement) return;

        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        
        timerElement.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (timeRemaining <= 60 && timeRemaining > 0) {
            timerElement.classList.add('timer-warning');
        } else if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            finishSimulation(true); 
        }
    }

    function startTimer() {
        renderTimer(); 
        timerInterval = setInterval(() => {
            timeRemaining--;
            renderTimer();
            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
            }
        }, 1000);
    }
    
    function changeModule(moduleName) {
        currentModule = moduleName;
        const firstQuestionIndex = QUESTIONS_DATA.findIndex(q => q.module === moduleName);
        if (firstQuestionIndex !== -1) {
            currentQuestionIndex = firstQuestionIndex;
            renderQuestion();
            renderNavigation();
        }
    }
    
    function renderNavigation() {
        const navContainer = document.getElementById('module-navigation');
        const questionStatusContainer = document.getElementById('question-status');
        if (!navContainer || !questionStatusContainer) return;

        navContainer.innerHTML = '';
        questionStatusContainer.innerHTML = '';

        const modules = QUESTIONS_DATA.map(q => q.module).filter((v, i, a) => a.indexOf(v) === i);

        // 1. Navegación por módulos (pestañas)
        modules.forEach(moduleName => {
            const moduleLink = document.createElement('a');
            moduleLink.href = "#";
            moduleLink.textContent = moduleName;
            moduleLink.classList.add('module-link');
            if (moduleName === currentModule) {
                moduleLink.classList.add('active');
            }
            moduleLink.onclick = (e) => {
                e.preventDefault();
                changeModule(moduleName);
            };
            navContainer.appendChild(moduleLink);
        });

        // 2. Navegación por preguntas (botones)
        const moduleQuestions = QUESTIONS_DATA.filter(q => q.module === currentModule);
        moduleQuestions.forEach((q, index) => {
            const statusBtn = document.createElement('button');
            statusBtn.textContent = index + 1;
            statusBtn.classList.add('status-btn');
            
            const globalIndex = QUESTIONS_DATA.findIndex(globalQ => globalQ.id === q.id);
            if (userAnswers[q.id] !== null) {
                statusBtn.classList.add('answered');
            }
            if (globalIndex === currentQuestionIndex) {
                statusBtn.classList.add('current');
            }

            statusBtn.onclick = () => {
                currentQuestionIndex = globalIndex;
                renderQuestion();
                renderNavigation(); 
            };
            questionStatusContainer.appendChild(statusBtn);
        });
    }

    function renderQuestion() {
        const questionContainer = document.getElementById('question-content');
        const questionData = QUESTIONS_DATA[currentQuestionIndex];
        if (!questionContainer || !questionData) return;

        const questionNumber = currentQuestionIndex + 1;
        
        const moduleQuestions = QUESTIONS_DATA.filter(q => q.module === currentModule);
        const localIndex = moduleQuestions.findIndex(q => q.id === questionData.id);
        const moduleQuestionNumber = localIndex + 1;

        let html = `
            <div class="question-header">
                <h3>Pregunta ${questionNumber} de ${MAX_QUESTIONS} (${questionData.module} - ${moduleQuestionNumber}/${moduleQuestions.length})</h3>
            </div>
            <div class="question-text">
                <p>${questionData.question}</p>
            </div>
            <div class="options-list">
        `;

        questionData.options.forEach((optionText, index) => {
            const optionValue = index + 1;
            const isChecked = userAnswers[questionData.id] === optionValue;
            
            const displayOptionText = optionText.replace(/\$(.*?)\$/g, (match, content) => {
                return `<span class="math-formula">${content}</span>`; 
            });

            html += `
                <label class="option-card ${isChecked ? 'selected' : ''}">
                    <input type="radio" 
                           name="q${questionData.id}" 
                           value="${optionValue}" 
                           ${isChecked ? 'checked' : ''}
                           onclick="saveAnswer(${questionData.id}, ${optionValue}, this)">
                    <span class="option-label">${String.fromCharCode(65 + index)}.</span>
                    <span class="option-text">${displayOptionText}</span>
                </label>
            `;
        });
        
        html += `</div>`;
        questionContainer.innerHTML = html;

        renderQuestionButtons();
    }
    
    function renderQuestionButtons() {
        const buttonsContainer = document.getElementById('question-buttons');
        if (!buttonsContainer) return;

        const isLastQuestion = currentQuestionIndex === MAX_QUESTIONS - 1;
        const isFirstQuestion = currentQuestionIndex === 0;

        buttonsContainer.innerHTML = `
            <button onclick="navigateQuestion(-1)" ${isFirstQuestion || simulationFinished ? 'disabled' : ''} class="btn-secondary">
                <i class="material-icons">chevron_left</i> Anterior
            </button>
            <button onclick="finishSimulation(false)" ${simulationFinished ? 'disabled' : ''} class="btn-danger">
                Terminar Examen
            </button>
            <button onclick="navigateQuestion(1)" ${isLastQuestion || simulationFinished ? 'disabled' : ''} class="btn-primary">
                Siguiente <i class="material-icons">chevron_right</i>
            </button>
        `;
    }

    window.navigateQuestion = function(direction) {
        if (simulationFinished) return;
        
        const newIndex = currentQuestionIndex + direction;
        
        if (newIndex >= 0 && newIndex < MAX_QUESTIONS) {
            currentQuestionIndex = newIndex;
            
            const newModule = QUESTIONS_DATA[currentQuestionIndex].module;
            if (newModule !== currentModule) {
                currentModule = newModule;
                renderNavigation();
            }
            
            renderQuestion();
        }
    }

    window.saveAnswer = function(questionId, optionValue, element) {
        if (simulationFinished) return;
        
        userAnswers[questionId] = optionValue;
        
        document.querySelectorAll('.option-card').forEach(card => card.classList.remove('selected'));
        element.closest('.option-card').classList.add('selected');

        renderNavigation(); 
    }
    
    window.finishSimulation = function(forced = false) {
        if (simulationFinished) return;
        
        if (forced) {
             processResults();
             return;
        }

        const answeredCount = Object.values(userAnswers).filter(a => a !== null).length;
        const unansweredCount = MAX_QUESTIONS - answeredCount;
        
        const confirmation = confirm(`Estás a punto de finalizar el simulador.\n\n` +
                                     `Preguntas respondidas: ${answeredCount}\n` +
                                     `Preguntas pendientes: ${unansweredCount}\n\n` +
                                     `Una vez terminado, no podrás modificar tus respuestas. ¿Deseas continuar?`);
        
        if (confirmation) {
            processResults();
        }
    }

    function processResults() {
        simulationFinished = true;
        clearInterval(timerInterval);
        
        let correctAnswers = 0;
        QUESTIONS_DATA.forEach(q => {
            if (userAnswers[q.id] === q.answer) {
                correctAnswers++;
            }
        });

        const totalQuestions = MAX_QUESTIONS;
        const percentage = ((correctAnswers / totalQuestions) * 100).toFixed(1);
        const wrongAnswers = totalQuestions - correctAnswers;
        const unansweredCount = Object.values(userAnswers).filter(a => a === null).length;
        
        const user = getActiveUserData();
        const score = {
            date: new Date().toISOString(),
            correct: correctAnswers,
            percentage: parseFloat(percentage),
            duration: (SIMULATOR_DURATION_MINUTES * 60) - timeRemaining,
            total: totalQuestions
        };

        const usuarios = getUsuarios();
        const userIndex = usuarios.findIndex(u => u.correo === user.correo);
        
        if (userIndex !== -1) {
            if (!usuarios[userIndex].simulationHistory) {
                usuarios[userIndex].simulationHistory = [];
            }
            usuarios[userIndex].simulationHistory.push(score);
            localStorage.setItem('aspiranteSoyMX_usuarios', JSON.stringify(usuarios));
            
            user.simulationHistory = usuarios[userIndex].simulationHistory;
            localStorage.setItem('aspiranteSoyMX_sesion_activa', JSON.stringify(user));
        }

        renderResults(correctAnswers, wrongAnswers, percentage, unansweredCount, score.duration);
    }
    
    function renderResults(correct, wrong, percentage, unanswered, durationSeg) {
        document.getElementById(
