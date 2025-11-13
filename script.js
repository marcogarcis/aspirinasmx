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
    // 1. Obtener valores
    const nombre = document.getElementById('register-nombre').value;
    const apellidos = document.getElementById('register-apellidos').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    const estado = document.getElementById('register-estado').value;
    const institucionSelect = document.getElementById('register-institucion');
    const errorMessage = document.getElementById('register-error');

    // 2. Obtener instituciones seleccionadas (ahora es múltiple)
    const selectedInstituciones = Array.from(institucionSelect.selectedOptions).map(option => option.value);

    // 3. Obtener carreras seleccionadas (de los campos inyectados dinámicamente)
    let selectedCarreras = [];
    selectedInstituciones.forEach(inst => {
        const selectElement = document.getElementById(`register-carrera-${inst}`);
        if (selectElement && selectElement.value) {
            selectedCarreras.push({
                institucion: inst,
                carrera: selectElement.value
            });
        }
    });

    // 4. Validaciones
    if (password !== confirmPassword) {
        errorMessage.textContent = 'Las contraseñas no coinciden.';
        return;
    }

    if (!nombre || !apellidos || !email || !password || !estado || selectedInstituciones.length === 0 || selectedCarreras.length === 0) {
        errorMessage.textContent = 'Por favor, completa todos los campos y selecciona al menos una carrera.';
        return;
    }

    // 5. Simulación de almacenamiento
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
        institucion: selectedInstituciones, // Guardamos todas las instituciones seleccionadas
        carrera: selectedCarreras,        // Guardamos las carreras seleccionadas con su institución
        registrationDate: new Date().toISOString(),
        progress: 0, 
        attempts: []
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    console.log('Registro exitoso. Redirigiendo para iniciar sesión.');
    window.location.href = 'index.html';
}

/**
 * Redirige al dashboard.
 */
function navigateToHome() {
    window.location.href = 'dashboard.html';
}

/**
 * CORREGIDA: Función para alternar la visibilidad de un campo de contraseña.
 * Ahora recibe el ID del ícono para actualizarlo.
 * @param {string} inputId ID del campo de input (e.g., 'register-password')
 * @param {string} iconId ID del span del icono (e.g., 'toggle-icon-register-password')
 */
function togglePasswordVisibility(inputId, iconId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);

    if (input.type === 'password') {
        input.type = 'text';
        icon.textContent = 'visibility'; // Cambia a ojo abierto
    } else {
        input.type = 'password';
        icon.textContent = 'visibility_off'; // Cambia a ojo cerrado
    }
}

/**
 * Carga las opciones de estados y añade el listener al select de instituciones.
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
        // Escucha el cambio en la institución para cargar carreras de forma dinámica
        institucionSelect.addEventListener('change', updateCareerDropdown);
        // Llama una vez para asegurar que esté limpio al inicio
        updateCareerDropdown();
    }
}

/**
 * REESCRITA: Actualiza el contenedor de selección de carreras basado en las instituciones seleccionadas.
 */
function updateCareerDropdown() {
    const institucionSelect = document.getElementById('register-institucion');
    const container = document.getElementById('career-selection-container');
    
    // Obtener un array de las instituciones seleccionadas
    const selectedInstitutions = Array.from(institucionSelect.selectedOptions).map(option => option.value);

    // Limpiar el contenedor dinámico
    container.innerHTML = ''; 

    // Si no hay instituciones seleccionadas, no hacemos nada más
    if (selectedInstitutions.length === 0) {
        return;
    }

    // Recorrer las instituciones seleccionadas e inyectar el HTML de cada select
    selectedInstitutions.forEach(inst => {
        const instName = inst === 'SEDENA' ? 'SEDENA (Ejército)' : 'SEMAR (Marina)';
        const selectId = `register-carrera-${inst}`;
        const carrerasLista = CARRERAS_INSTITUCION[inst];

        let selectHtml = `
            <div class="career-select-group">
                <label for="${selectId}" class="block text-sm font-medium text-gray-700 mb-1">
                    Carrera de Interés en ${instName}
                </label>
                <select id="${selectId}" required 
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 transition duration-150">
                    <option value="" disabled selected>Selecciona una carrera de ${inst}</option>
        `;
        
        // Agregar opciones
        carrerasLista.forEach(carrera => {
            selectHtml += `<option value="${carrera}">${carrera}</option>`;
        });

        selectHtml += `
                </select>
            </div>
        `;

        // Inyectar el grupo de select en el contenedor
        container.innerHTML += selectHtml;
    });
}

/**
 * Verifica el estado de autenticación al cargar una página.
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
 * NOTA: Esta función necesitará ser ajustada en el futuro para manejar el nuevo formato de carreras (array)
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
        
        // Muestra las instituciones y carreras seleccionadas (simplificado para el dashboard inicial)
        const instText = user.institucion.map(i => i === 'SEDENA' ? 'Ejército (SEDENA)' : 'Marina (SEMAR)').join(' y ');
        document.getElementById('summary-institucion').textContent = instText;
        
        const carrerasText = user.carrera.map(c => `${c.carrera} (${c.institucion})`).join(' / ');
        document.getElementById('summary-carrera').textContent = carrerasText;
        
        document.getElementById('summary-estado').textContent = user.estado;

        const progressCard = document.getElementById('progress-summary-card');
        if (progressCard) {
             progressCard.classList.remove('hidden'); 
        }

    } else {
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
