from django.contrib import admin
from .models import Mascota, Reserva

@admin.register(Mascota)
class MascotaAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'tipo', 'alergias')
    search_fields = ('nombre', 'tipo')
    list_filter = ('tipo',)

@admin.register(Reserva)
class ReservaAdmin(admin.ModelAdmin):
    list_display = ('mascota', 'fecha_inicio', 'fecha_fin', 'servicios')
    list_filter = ('fecha_inicio', 'fecha_fin')
    search_fields = ('mascota__nombre',)
