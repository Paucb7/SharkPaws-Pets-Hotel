# 🦈 SharkPaws

**SharkPaws** es un sistema web ficticio desarrollado como proyecto universitario para la gestión integral de un hotel y guardería premium para mascotas. Permite a los usuarios realizar reservaciones, registrar a sus mascotas, consultar reportes veterinarios y simular pagos en línea. También incluye un panel administrativo para el personal del negocio.

## Contexto

SharkPaws es un hotel y guardería de mascotas premium ubicado en Providencia, Guadalajara. El equipo está conformado por veterinarios disponibles 24/7, 5 cuidadores certificados y 2 administrativos. Cada mascota recibe atención personalizada con planes específicos de alimentación y ejercicio, bajo supervisión veterinaria constante.

## Problematica

La gestión operativa actual se realiza mediante WhatsApp y Excel, con reservaciones 48 horas antes. Las temporadas de mayor demanda coinciden con periodos vacacionales y días festivos.
SharkPaws enfrenta múltiples desafíos operativos que comprometen su escalabilidad y estándar de servicio premium. La gestión manual mediante WhatsApp y Excel genera ineficiencias críticas en varios aspectos: el registro y actualización de información médica y comportamental de las mascotas carece de estructura y trazabilidad; el historial de vacunación, alergias y condiciones especiales no está centralizado, lo que representa un riesgo en la atención

## Propuesta de solucion

La solución web para SharkPaws se centra en tres partes principales: rediseño del sitio actual, sistema de reservas en línea y gestión de mascotas por parte de los administradores y veterinarios.

El nuevo sitio web necesita mostrar los servicios de SharkPaws de forma clara. Los precios, horarios y servicios deben estar visibles desde la página principal. La sección de servicios debe detallar los cuidados veterinarios. El sistema de reservas permite a los dueños elegir fechas, tipo de habitación y servicios adicionales como baños o cortes de pelo. El calendario muestra la disponibilidad real y permite pagos con tarjeta. Al hacer una reserva, los dueños llenan un formulario con datos de su mascota: alergias, medicamentos y horarios de comida.

Los veterinarios y cuidadores usan un panel de control para compartir fotos de la mascota, actualizar el estado de las mascotas y programar servicios. Esta parte permite crear reportes de comportamiento y salud que se comparten con los dueños.

La implementación requiere un nuevo diseño responsive del sitio, integración con un sistema de pagos, base de datos para información de mascotas y clientes, almacenamiento para fotos y documentos.

## 🌐 Tecnologías utilizadas

### 🔧 Backend
- Django 4.x
- Django REST Framework
- PostgreSQL
- JWT (djangorestframework-simplejwt)
- CORS Headers

### 🎨 Frontend
- Vue 3 + Vite
- Vue Router
- Pinia
- Axios

### 💳 Simulación de pagos
- Stripe (simulado)
- PayPal (simulado)

---

## 🧭 Estructura del proyecto

SharkPaws/
├── sharkpaws-fe/   ← Frontend con Vue
└── sharkpaws-be/   ← Backend con Django

## ⚙️ Instalación local

### 🐍 Backend (Django)

```bash
cd sharkpaws/sharkpaws-be
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver 

```

---

## 🖥️ Frontend (Vue)
``` bash
Copiar
Editar
cd sharkpaws/sharkpaws-fe
npm install
npm run dev

```
Vue correrá en http://localhost:5173 y Django en http://localhost:8000

## 🔐 Funcionalidades principales
✅ Landing page atractiva y responsive
✅ Formulario de reserva con datos de la mascota
✅ Registro e inicio de sesión con JWT
✅ Panel del cliente para ver reservas, mensajes y reportes veterinarios
✅ Panel administrativo para empleados (reservas, mascotas, reportes)
✅ Simulación visual de pagos con Stripe y PayPal
✅ Conexión frontend-backend con Axios y REST API

## 👩‍💻 Autor
Desarrollado por Lukas (Rosa Paulina Corona Barba)
Estudiante de Licenciatura en Desarrollo Web - UDG Virtual
GitHub: @Paucb7

## 📚 Nota
Este proyecto es ficticio y fue creado con fines académicos.
SharkPaws no representa un servicio real.

## ⭐ Licencia
MIT License