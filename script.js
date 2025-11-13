Este código contiene la lógica de datos, la función `togglePasswordVisibility` y la corrección clave en `updateCareerDropdown` que habilita el selector de carrera.

```javascript:Script de Funcionalidades:script.js
// --- CONFIGURACIÓN DE DATOS ---
const ESTADOS_MX = [
    "Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas",
    "Chihuahua", "Ciudad de México", "Coahuila", "Colima", "Durango", "Guanajuato",
    "Guerrero", "Hidalgo", "Jalisco", "México", "Michoacán", "Morelos", "Nayarit",
    "Nuevo León", "Oaxaca", "Puebla", "Querétaro", "Quintana Roo", "San Luis Potosí",
    "Sinaloa", "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas"
];

// Carreras completas para SEDENA y SEMAR (Ejército y Marina)
const CARRERAS_INSTITUCION = {
    SEDENA: [
        "Heroica Escuela Militar de Aviación (Piloto Aviador)",
        "Heroica Escuela Militar de Aviación (Mantenimiento de Aviación)",
        "Escuela Militar de Ingeniería (Ingeniero Constructor)",
        "Escuela Militar de Ingeniería (Comunicaciones y Electrónica)",
        "Escuela Militar de Ingeniería (Ingeniero Industrial)",
        "Escuela Militar de Ingeniería (Mecánico Automotriz)",
        "Escuela Militar de Ingeniería (Sistemas de Armamento)",
        "Escuela Militar de Medicina",
        "Escuela Militar de Odontología",
        "Escuela Militar de Enfermería",
        "Escuela Militar de Oficiales de Sanidad",
        "Colegio Militar (Armas y Servicios)",
        "Escuela Militar de Transmisiones",
        "Escuela Militar de Materiales de Guerra",
        "Escuela Militar de Clases de Transmisiones",
    ],
    SEMAR: [
        "Heroica Escuela Naval Militar (Cuerpo General)",
        "Heroica Escuela Naval Militar (Infantería de Marina)",
        "Heroica Escuela Naval Militar (Aeronáutica Naval)",
        "Heroica Escuela Naval Militar (Logística Naval)",
        "Heroica Escuela Naval Militar (Ingeniería en Sistemas Navales)",
        "Escuela Médico Naval (Medicina)",
        "Escuela Médico Naval (Enfermería)",
        "Escuela de Electrónica Naval (Ingeniería en Electrónica y Computación Naval)",
        "Escuela de Intendencia Naval (Administración Naval)",
        "Escuela de Maquinaria Naval (Ingeniería Mecánica Naval)",
        "Escuela de Búsqueda, Rescate y Buceo"
    ]
};

// --- FUNCIONES DE AUTENTICACIÓN Y REGISTRO ---

/**
 * Función para simular el inicio de sesión.
 */
function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorMessage = document.getElementById('login-error');

    // Recupera la lista de usuarios. Si no existe, es un array vacío.
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Busca el usuario por email y contraseña.
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Simula el éxito del login
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('currentUserEmail', email);
        navigateToHome();
    } else {
        errorMessage.textContent = 'Credenciales inválidas. Intenta de nuevo.';
    }
}

/**
 * Función para simular el registro de un nuevo usuario.
 */
function registerUser() {
    // 1. Obtener valores de los nuevos campos de Nombre/Apellido
    const nombre = document.getElementById('register-nombre').value;
    const apellidos = document.getElementById('register-apellidos').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    const estado = document.getElementById('register-estado').value;
    const institucion = document.getElementById('register-institucion').value;
    const carrera = document.getElementById('register-carrera').value;
    const errorMessage = document.getElementById('register-error');

    // 2. Validaciones básicas
    if (password !== confirmPassword) {
        errorMessage.textContent = 'Las contraseñas no coinciden.';
        return;
    }

    if (!nombre || !apellidos || !email || !password || !estado || !institucion || !carrera) {
        errorMessage.textContent = 'Por favor, completa todos los campos.';
        return;
    }

    // 3. Simulación de almacenamiento
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (users.some(u => u.email === email)) {
        errorMessage.textContent = 'El correo electrónico ya está registrado.';
        return;
    }

    const newUser = {
        nombre: nombre,
        apellidos: apellidos,
        email: email,
        password: password,
        estado: estado,
        institucion: institucion,
        carrera: carrera,
        registrationDate: new Date().toISOString(),
        progress: 0, // Nuevo usuario inicia con 0 progreso
        attempts: [] // Array para historial de intentos
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Simulación de éxito, redirigir al login (usamos console.log en lugar de alert)
    console.log('Registro exitoso. Redirigiendo para iniciar sesión.');
    window.location.href = 'index.html';
}

/**
 * Redirige al dashboard o al login dependiendo del estado.
 */
function navigateToHome() {
    window.location.href = 'dashboard.html';
}

/**
 * Función para alternar la visibilidad de un campo de contraseña.
 * @param {string} inputId ID del campo de input (e.g., 'register-password')
 */
function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(`toggle-icon-${inputId}`);

    if (input.type === 'password') {
        input.type = 'text';
        icon.textContent = 'visibility';
    } else {
        input.type = 'password';
        icon.textContent = 'visibility_off';
    }
}

/**
 * Carga las opciones de estados y carreras al cargar la página de registro.
 */
function loadRegistrationData() {
    const estadoSelect = document.getElementById('register-estado');
    const institucionSelect = document.getElementById('register-institucion');
    
    if (estadoSelect) {
        // Cargar los 32 estados
        ESTADOS_MX.forEach(estado => {
            const option = document.createElement('option');
            option.value = estado;
            option.textContent = estado;
            estadoSelect.appendChild(option);
        });
    }

    if (institucionSelect) {
        // Escucha el cambio en la institución para cargar carreras
        institucionSelect.addEventListener('change', updateCareerDropdown);
        // Llama una vez para inicializar o en caso de edición
        updateCareerDropdown();
    }
}

/**
 * Actualiza el dropdown de carreras basado en la institución seleccionada y lo habilita.
 */
function updateCareerDropdown() {
    const institucion = document.getElementById('register-institucion').value;
    const carreraSelect = document.getElementById('register-carrera');
    
    // Limpiar opciones previas
    carreraSelect.innerHTML = '<option value="" disabled selected>Selecciona tu carrera de interés</option>';

    const carrerasLista = CARRERAS_INSTITUCION[institucion];

    if (carrerasLista && institucion !== "") { 
        carrerasLista.forEach(carrera => {
            const option = document.createElement('option');
            option.value = carrera;
            option.textContent = carrera;
            carreraSelect.appendChild(option);
        });
        // HABILITAR EL DROPDOWN
        carreraSelect.removeAttribute('disabled');
        carreraSelect.classList.remove('bg-gray-100'); // Quita el estilo de "deshabilitado"
        carreraSelect.classList.add('bg-white'); // Añade el estilo de "habilitado"
    } else {
        // DESHABILITAR si no hay una institución seleccionada
        carreraSelect.setAttribute('disabled', 'true');
        carreraSelect.classList.add('bg-gray-100'); // Añade el estilo de "deshabilitado"
        carreraSelect.classList.remove('bg-white');
    }
}

/**
 * Verifica el estado de autenticación al cargar una página protegida.
 */
function checkLoginStatus() {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const currentPage = window.location.pathname.split('/').pop();

    if (isAuthenticated === 'true') {
        // Si está autenticado y está en login/registro, redirigir al dashboard
        if (currentPage === 'index.html' || currentPage === 'registro.html' || currentPage === '') {
            navigateToHome();
        }
        // Si está en dashboard, cargar los datos del usuario
        if (currentPage === 'dashboard.html') {
            loadDashboardData();
        }
    } else {
        // Si NO está autenticado y NO está en login/registro, redirigir al login
        if (currentPage !== 'index.html' && currentPage !== 'registro.html' && currentPage !== '') {
            window.location.href = 'index.html';
        }
    }
}

/**
 * Carga los datos del usuario actual en el Dashboard.
 */
function loadDashboardData() {
    const userEmail = localStorage.getItem('currentUserEmail');
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === userEmail);

    if (user) {
        document.getElementById('welcome-message').textContent = `Hola, ${user.nombre}`;
        document.getElementById('user-progress').textContent = `${user.progress}% completado`;
        document.getElementById('progress-bar').style.width = `${user.progress}%`;
        
        // Cargar datos de perfil en el dashboard para mostrar el resumen
        document.getElementById('summary-nombre').textContent = `${user.nombre} ${user.apellidos}`;
        document.getElementById('summary-institucion').textContent = user.institucion === 'SEDENA' ? 'Ejército (SEDENA)' : 'Marina (SEMAR)';
        document.getElementById('summary-carrera').textContent = user.carrera;
        document.getElementById('summary-estado').textContent = user.estado;

        // Mostrar u ocultar el Resumen del Progreso si es 0 (opcional, aquí siempre se muestra)
        const progressCard = document.getElementById('progress-summary-card');
        if (progressCard) {
             progressCard.classList.remove('hidden'); 
        }

    } else {
        // Si el usuario no se encuentra, desautenticar y redirigir
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('currentUserEmail');
        window.location.href = 'index.html';
    }
}

// --- INICIALIZACIÓN ---

// Escucha el evento DOMContentLoaded para inicializar la lógica en todas las páginas
document.addEventListener('DOMContentLoaded', () => {
    // Si la página es registro.html, carga los datos (estados y listener de carreras)
    if (document.location.pathname.includes('registro.html')) {
        loadRegistrationData();
    }
    
    // Verifica el estado de login en todas las páginas
    checkLoginStatus();
});
