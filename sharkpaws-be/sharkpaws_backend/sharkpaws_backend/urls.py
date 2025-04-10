"""
URL configuration for sharkpaws_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from api.views import crear_reserva, lista_mascotas, detalle_reserva, crear_mascota
from django.http import HttpResponse

def home(request):
    return HttpResponse("""
        <h1>Backend de SharkPaws</h1>
        <p>Endpoints disponibles:</p>
        <ul>
            <li><a href="/admin/">Admin</a></li>
            <li><a href="/api/crear-reserva/">API Reservas</a></li>
        </ul>
    """)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/crear-reserva/', crear_reserva, name='crear_reserva'),
    path('', home, name='home'),  # Agrega esta línea
    path('api/mascotas/', lista_mascotas, name='lista_mascotas'),
    path('api/crear-mascota/', crear_mascota, name='crear_mascota'),
    path('api/reservas/<int:id>/', detalle_reserva, name='detalle_reserva'),
]
 