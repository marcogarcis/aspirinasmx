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
    // Funciones Comunes y Auxiliares
    // ----------------------------------------------------

    function checkLoginStatus() { return localStorage.getItem('aspiranteSoyMX_sesion_activa') !== null; }
    function getActiveUserData() { const userData = localStorage.getItem('aspiranteSoyMX_sesion_activa'); return userData ? JSON.parse(userData) : null; }
    function getUsuarios() { const usuariosJSON = localStorage.getItem('aspiranteSoyMX_usuarios'); return usuariosJSON ? JSON.parse(usuariosJSON) : []; }
    function formatBold(text) { return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); }

    // Función global para manejar el cierre de sesión
    window.logout = function() {
        localStorage.removeItem('aspiranteSoyMX_sesion_activa');
        alert('Has cerrado sesión exitosamente.');
        window.location.href = 'index.html';
    }

    // Función global de navegación y seguridad (se llama en onload del <body>)
    window.navigateToHome = function() {
        const isLoggedIn = checkLoginStatus();
        const currentPage = window.location.pathname.split("/").pop(); 

        const loggedInPages = ['dashboard.html', 'simulador.html', 'convocatorias.html', 'herramientas.html', 'profile.html'];

        if (isLoggedIn) {
            // Si está logueado, redirigir desde login/registro al dashboard
            if (currentPage === 'index.html' || currentPage === 'registro.html') {
                 window.location.href = 'dashboard.html';
            }
        } else {
            // Si NO está logueado, redirigir desde páginas protegidas al login
            if (loggedInPages.includes(currentPage)) {
                 window.location.href = 'index.html';
            }
        }
    }

    // Función que se ejecuta al cargar la página para forzar el login (ACCESO CORREGIDO)
    function requireLogin() {
        const currentPage = window.location.pathname.split("/").pop(); 
        
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
        } else {
            timerElement.classList.remove('timer-warning');
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
        document.getElementById('simulator-interface').style.display = 'none';
        document.getElementById('results-screen').style.display = 'block';

        const durationMin = Math.floor(durationSeg / 60);
        const durationSec = durationSeg % 60;
        const durationFormatted = `${durationMin < 10 ? '0' : ''}${durationMin}:${durationSec < 10 ? '0' : ''}${durationSec}`;

        const user = getActiveUserData();
        const history = user.simulationHistory || [];
        
        const localStats = renderLocalStats(history, correct, percentage);
        const globalStats = renderGlobalStats(user);


        document.getElementById('results-content').innerHTML = `
            <h2 class="result-title">Simulador Finalizado</h2>
            <p class="result-subtitle">Tiempo utilizado: ${durationFormatted} de ${SIMULATOR_DURATION_MINUTES}:00 minutos</p>

            <div class="result-summary">
                <div class="summary-block correct-block">
                    <strong>${correct}</strong>
                    <span>Aciertos</span>
                </div>
                <div class="summary-block wrong-block">
                    <strong>${wrong}</strong>
                    <span>Errores (${unanswered} Omitidas)</span>
                </div>
                <div class="summary-block percentage-block">
                    <strong>${percentage}%</strong>
                    <span>Porcentaje</span>
                </div>
            </div>
            
            <div class="results-stats-grid">
                ${localStats}
                ${globalStats}
            </div>

            <div class="results-actions">
                <button onclick="window.location.href='dashboard.html'" class="btn-secondary">
                    <i class="material-icons">home</i> Ir a Inicio
                </button>
                <button onclick="startExam()" class="btn-primary">
                    <i class="material-icons">refresh</i> Intentar de Nuevo
                </button>
            </div>
        `;

        document.getElementById('question-content').innerHTML = `
            <p class="data-hint" style="text-align: center; color: var(--color-principal); margin-top: 50px;">
                Examen finalizado. Las respuestas no pueden ser modificadas.
            </p>
        `;
        const buttonsContainer = document.getElementById('question-buttons');
        if (buttonsContainer) {
             buttonsContainer.innerHTML = '';
        }
    }
    
    function renderLocalStats(history, currentCorrect, currentPercentage) {
        if (history.length <= 1) {
            return `<div class="stats-card"><h4 class="stats-title">Estadísticas Locales (Mi Historial)</h4><p>Este es tu primer intento. ¡Sigue practicando para ver tu progreso!</p></div>`;
        }

        const totalAttempts = history.length;
        const previousScore = history[history.length - 2]; 
        
        let comparisonHTML;
        if (currentCorrect > previousScore.correct) {
            comparisonHTML = `<p class="progress-indicator ideal"><i class="material-icons">arrow_upward</i> Mejoraste ${currentCorrect - previousScore.correct} aciertos respecto al intento anterior.</p>`;
        } else if (currentCorrect < previousScore.correct) {
            comparisonHTML = `<p class="progress-indicator high"><i class="material-icons">arrow_downward</i> Empeoraste ${previousScore.correct - currentCorrect} aciertos respecto al intento anterior.</p>`;
        } else {
            comparisonHTML = `<p class="progress-indicator low">Tu puntaje fue igual al intento anterior.</p>`;
        }

        return `<div class="stats-card"><h4 class="stats-title">Estadísticas Locales (Mi Historial)</h4><p><strong>Intentos realizados:</strong> ${totalAttempts}</p>${comparisonHTML}<p class="data-hint">Último intento: ${previousScore.correct}/${previousScore.total} (${previousScore.percentage}%)</p></div>`;
    }
    
    function renderGlobalStats(user) {
        const totalUsers = 1500; // Valor simulado
        const hcmUsers = Math.floor(totalUsers * 0.35); // Valor simulado
        
        let ranking;
        if (user.simulationHistory && user.simulationHistory.length > 0) {
            const latestScore = user.simulationHistory[user.simulationHistory.length - 1];
            if (latestScore.percentage >= 80) {
                ranking = "Top 5%";
            } else if (latestScore.percentage >= 60) {
                ranking = "Top 20%";
            } else {
                ranking = "Debajo del Promedio";
            }
        } else {
            ranking = "No Rankeado";
        }


        return `<div class="stats-card"><h4 class="stats-title">Estadísticas Globales (Simuladas)</h4><p><strong>Usuarios Activos (Sim.):</strong> ${totalUsers.toLocaleString()}</p><p><strong>Aspirantes a HCM:</strong> ${hcmUsers.toLocaleString()}</p><p><strong>Tu Ranking:</strong> <span class="ranking-text">${ranking}</span></p><p class="data-hint">El ranking global se basa en el porcentaje de aciertos promedio de todos los usuarios.</p></div>`;
    }
    
    // Función para renderizar el Dashboard (llamada desde dashboard.html)
    window.renderDashboardStats = function() {
        const user = getActiveUserData();
        if (!user) return;
        
        const history = user.simulationHistory || [];
        const totalIntentos = history.length;
        
        let totalAciertos = 0;
        let mejorPorcentaje = 0;
        let historyListHTML = '';
        
        if (totalIntentos > 0) {
            history.forEach((score, index) => {
                totalAciertos += score.correct;
                if (score.percentage > mejorPorcentaje) {
                    mejorPorcentaje = score.percentage;
                }
                
                const date = new Date(score.date).toLocaleDateString();
                historyListHTML += `
                    <div class="history-item">
                        <span>Intento ${index + 1} (${date})</span>
                        <div>
                            <span class="score">${score.correct}/${score.total}</span>
                            <span class="percentage">(${score.percentage}%)</span>
                        </div>
                    </div>
                `;
            });
            
            document.getElementById('total-aciertos').textContent = totalAciertos;
            document.getElementById('mejor-porcentaje').textContent = `${mejorPorcentaje}%`;
            document.getElementById('total-intentos').textContent = totalIntentos;
            document.getElementById('history-list').innerHTML = historyListHTML;
        } else {
            document.getElementById('total-aciertos').textContent = 0;
            document.getElementById('mejor-porcentaje').textContent = `0%`;
            document.getElementById('total-intentos').textContent = 0;
            document.getElementById('history-list').innerHTML = `<p class="history-placeholder">Realiza tu primer simulador para ver tu historial aquí.</p>`;
        }
    }


    // ----------------------------------------------------
    // Lógica Específica de cada Página
    // ----------------------------------------------------

    const currentPage = window.location.pathname.split("/").pop();

    // --- Lógica de Registro (registro.html) ---
    const registroForm = document.getElementById('registro-form');
    if (registroForm) {
        const instSedena = document.getElementById('inst_sedena');
        const instSemar = document.getElementById('inst_semar');
        const carrerasContainer = document.getElementById('carreras-container');
        const carrerasSedenaDiv = document.getElementById('carreras-sedena');
        const carrerasSemarDiv = document.getElementById('carreras-semar');
        const carreraSedenaSelect = document.getElementById('carrera_sedena');
        const carreraSemarSelect = document.getElementById('carrera_semar');

        // FUNCIÓN GLOBAL PARA TOGGLE CARRERAS 
        window.toggleCarreras = function() {
            if (!instSedena || !instSemar || !carrerasContainer) return; 
            
            const sedenaChecked = instSedena.checked;
            const semarChecked = instSemar.checked;
            
            carrerasContainer.style.display = (sedenaChecked || semarChecked) ? 'block' : 'none';

            // Lógica SEDENA
            carrerasSedenaDiv.style.display = sedenaChecked ? 'block' : 'none';
            if (carreraSedenaSelect) carreraSedenaSelect.required = sedenaChecked;
            if (!sedenaChecked && carreraSedenaSelect) carreraSedenaSelect.value = ""; 

            // Lógica SEMAR
            carrerasSemarDiv.style.display = semarChecked ? 'block' : 'none';
            if (carreraSemarSelect) carreraSemarSelect.required = semarChecked;
            if (!semarChecked && carreraSemarSelect) carreraSemarSelect.value = ""; 
        }

        window.toggleCarreras(); // Ejecutar al cargar la página por si hay estados predefinidos
        
        if (instSedena) instSedena.addEventListener('change', window.toggleCarreras);
        if (instSemar) instSemar.addEventListener('change', window.toggleCarreras);


        registroForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            if (!registroForm.checkValidity()) { 
                console.error("Fallo de validación nativa del formulario.");
                return; 
            }
            const nuevoCorreo = document.getElementById('reg_correo').value;
            const nuevaContrasena = document.getElementById('reg_contrasena').value;
            const usuarios = getUsuarios();
            const usuarioExistente = usuarios.find(u => u.correo === nuevoCorreo);

            if (usuarioExistente) {
                alert('Error: Este correo electrónico ya se encuentra registrado. Por favor, inicia sesión o usa otro correo.');
                return;
            }

            // Crear el objeto del nuevo usuario
            const nuevoUsuario = {
                correo: nuevoCorreo,
                contrasena: nuevaContrasena,
                nombre: document.getElementById('nombre').value.trim(),
                residencia: document.getElementById('residencia').value,
                genero: document.querySelector('input[name="genero"]:checked') ? document.querySelector('input[name="genero"]:checked').value : null,
                institucion: Array.from(document.querySelectorAll('input[name="institucion"]:checked')).map(c => c.value),
                carrera_sedena: instSedena && instSedena.checked ? carreraSedenaSelect.value : null,
                carrera_semar: instSemar && instSemar.checked ? carreraSemarSelect.value : null,
                simulationHistory: [] 
            };
            
            // Validar que al menos una institución o carrera haya sido seleccionada si se marcó la institución
            if (nuevoUsuario.institucion.length === 0) {
                 alert('Por favor, selecciona al menos una institución de interés (SEDENA o SEMAR).');
                 return;
            }

            if (nuevoUsuario.institucion.includes('SEDENA') && !nuevoUsuario.carrera_sedena) {
                alert('Por favor, selecciona la carrera de interés para SEDENA.');
                return;
            }
            if (nuevoUsuario.institucion.includes('SEMAR') && !nuevoUsuario.carrera_semar) {
                alert('Por favor, selecciona la carrera de interés para SEMAR.');
                return;
            }


            usuarios.push(nuevoUsuario);
            localStorage.setItem('aspiranteSoyMX_usuarios', JSON.stringify(usuarios));

            alert('✅ ¡Registro Exitoso! Ahora puedes iniciar sesión.');
            window.location.href = 'index.html'; 
        });
    }

    // --- Lógica de Login (index.html) ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            // 🚨 FUNCIÓN CLAVE: Evita que el formulario se envíe de forma tradicional y recargue la página.
            e.preventDefault(); 
            
            if (!loginForm.checkValidity()) { return; }
            
            const correo = document.getElementById('correo').value;
            const contrasena = document.getElementById('contrasena').value;
            const usuarios = getUsuarios();
            const usuarioEncontrado = usuarios.find(u => u.correo === correo && u.contrasena === contrasena);

            if (usuarioEncontrado) {
                localStorage.setItem('aspiranteSoyMX_sesion_activa', JSON.stringify(usuarioEncontrado));
                alert(`¡Bienvenido(a), ${usuarioEncontrado.nombre.split(' ')[0]}! Inicio de Sesión Exitoso. Redirigiendo al Dashboard.`);
                window.location.href = 'dashboard.html'; 
            } else {
                alert('❌ Error de Inicio de Sesión: Correo o contraseña incorrectos, o no estás registrado.');
            }
        });
    }

    // --- Lógica del Dashboard (dashboard.html) ---
    if (currentPage === 'dashboard.html') {
        window.renderDashboardStats();
    }

    // --- Lógica de Simulador (simulador.html) ---
    if (currentPage === 'simulador.html') {
        document.getElementById('simulator-interface').style.display = 'none';
        document.getElementById('instructions-screen').style.display = 'none';
        document.getElementById('results-screen').style.display = 'none';
        
        if (document.getElementById('welcome-screen')) {
             document.getElementById('welcome-screen').style.display = 'block';
        } 
    }

    // --- Lógica de Perfil (profile.html) ---
    if (currentPage === 'profile.html') {
        const user = getActiveUserData();
        const profileContainer = document.getElementById('profile-data');
        const logoutBtn = document.getElementById('logout-btn');

        if (user && profileContainer) {
            const institucionText = user.institucion.join(' y ');
            
            let carrerasText = '';
            if (user.carrera_sedena) { carrerasText += `<li>${formatBold('SEDENA (Carrera)')}: ${user.carrera_sedena}</li>`; }
            if (user.carrera_semar) { carrerasText += `<li>${formatBold('SEMAR (Carrera)')}: ${user.carrera_semar}</li>`; }
            if (!user.carrera_sedena && !user.carrera_semar) { carrerasText += `<li>(No se seleccionó ninguna carrera específica)</li>`; }

            profileContainer.innerHTML = `
                <h2>Hola, ${user.nombre.split(' ')[0]}</h2>
                <ul class="data-list">
                    <li>${formatBold('Nombre Completo')}: ${user.nombre}</li>
                    <li>${formatBold('Correo')}: ${user.correo}</li>
                    <li>${formatBold('Residencia')}: ${user.residencia}</li>
                    <li>${formatBold('Género')}: ${user.genero === 'H' ? 'Hombre' : 'Mujer'}</li>
                    <li>${formatBold('Institución(es) de Interés')}: ${institucionText}</li>
                    ${carrerasText}
                </ul>
                <p class="data-hint">Estos son los datos que proporcionaste en tu registro. Solo la institución tiene acceso a esta información.</p>
            `;
        }
        
        // El botón de cierre de sesión en profile.html
        if (logoutBtn) {
            logoutBtn.addEventListener('click', window.logout);
        }
    }

    // --- Lógica de Herramientas (herramientas.html) ---
    if (currentPage === 'herramientas.html') {
        const imcForm = document.getElementById('imc-form');
        const imcResultado = document.getElementById('imc-resultado');

        if (imcForm) {
            imcForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const peso = parseFloat(document.getElementById('peso').value);
                const estatura = parseFloat(document.getElementById('estatura').value);
                if (isNaN(peso) || isNaN(estatura) || estatura <= 0) {
                    imcResultado.innerHTML = '<p class="imc-status high">Por favor, introduce valores válidos.</p>';
                    return;
                }
                const imc = peso / (estatura * estatura);
                const imcRedondeado = imc.toFixed(2);
                let status = ''; let recomendacion = ''; let className = '';
                if (imc < 18.5) { status = 'Bajo Peso'; recomendacion = '¡Cuidado! Debes aumentar de peso. Tu índice es inferior al mínimo requerido (18.5).'; className = 'low'; } 
                else if (imc >= 18.5 && imc <= 27.9) { status = 'APTO'; recomendacion = '¡Felicidades! Tu IMC está dentro del rango ideal (18.5 a 27.9) para las convocatorias.'; className = 'ideal'; } 
                else { status = 'Sobrepeso / Obesidad'; recomendacion = 'Debes reducir tu peso. Tu índice supera el límite máximo permitido (27.9).'; className = 'high'; }

                imcResultado.innerHTML = `<div class="imc-result ${className}"><p class="imc-value">IMC: <strong>${imcRedondeado}</strong></p><h3 class="imc-status">${status}</h3><p class="imc-recommendation">${recomendacion}</p></div>`;
            });
        }
        
        const pistaForm = document.getElementById('pista-form');
        const pistaResultado = document.getElementById('pista-resultado');

        if (pistaForm) {
            pistaForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const distancia = parseFloat(document.getElementById('distancia').value);
                const minutos = parseFloat(document.getElementById('minutos').value);
                const segundos = parseFloat(document.getElementById('segundos').value);
                if (isNaN(distancia) || isNaN(minutos) || isNaN(segundos) || distancia <= 0 || (minutos === 0 && segundos === 0)) {
                    pistaResultado.innerHTML = '<p class="imc-status high">Por favor, introduce valores válidos.</p>';
                    return;
                }

                const tiempoTotalSeg = (minutos * 60) + segundos;
                const tiempoLimiteSeg = 13 * 60; 
                const velocidadMs = distancia / tiempoTotalSeg;
                const tiempoPruebaSeg = (distancia === 2500) ? tiempoTotalSeg : (2500 / velocidadMs);
                const tiempoMinutos = Math.floor(tiempoPruebaSeg / 60);
                const tiempoSegundos = Math.round(tiempoPruebaSeg % 60);
                const tiempoFormato = `${tiempoMinutos}:${tiempoSegundos < 10 ? '0' : ''}${tiempoSegundos} min.`;

                let status = ''; let recomendacion = ''; let className = '';
                if (tiempoPruebaSeg <= tiempoLimiteSeg) { status = 'APTO'; recomendacion = `¡Excelente! Tu ritmo estimado es de ${tiempoFormato} para 2,500m, lo cual es inferior al límite (13:00).`; className = 'ideal'; } 
                else { status = 'NO APTO'; recomendacion = `Necesitas mejorar tu tiempo. Tu ritmo estimado es de ${tiempoFormato} para 2,500m, lo cual supera el límite (13:00).`; className = 'high'; }

                pistaResultado.innerHTML = `<div class="imc-result ${className}"><p class="imc-value">Tiempo Estimado (2,500m): <strong>${tiempoFormato}</strong></p><h3 class="imc-status">${status}</h3><p class="imc-recommendation">${recomendacion}</p></div>`;
            });
        }
    }
});
