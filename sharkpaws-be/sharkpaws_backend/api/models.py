from django.db import models

class Mascota(models.Model):
    nombre = models.CharField(max_length=100)
    tipo = models.CharField(max_length=10)  # Ej: "Perro", "Gato"
    alergias = models.TextField(blank=True)

class Reserva(models.Model):
    mascota = models.ForeignKey(Mascota, on_delete=models.CASCADE)
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()
    servicios = models.JSONField()  # Ej: ["baño", "corte"]