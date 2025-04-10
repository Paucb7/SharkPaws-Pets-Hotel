from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Reserva, Mascota
import json

@csrf_exempt
def crear_reserva(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            # Validación básica
            required_fields = ['mascota_id', 'fecha_inicio', 'servicios']
            for field in required_fields:
                if field not in data:
                    return JsonResponse({"status": "error", "message": f"Falta el campo: {field}"}, status=400)
            
            # Crear reserva en la base de datos
            reserva = Reserva.objects.create(
                mascota_id=data['mascota_id'],
                fecha_inicio=data['fecha_inicio'],
                fecha_fin=data.get('fecha_fin', None),  # Opcional
                servicios=data['servicios']  # Ej: ["baño", "corte"]
            )
            
            return JsonResponse({
                "status": "success",
                "id": reserva.id,
                "mascota": reserva.mascota.nombre
            })
            
        except Mascota.DoesNotExist:
            return JsonResponse({"status": "error", "message": "La mascota no existe"}, status=404)
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=500)
    
    return JsonResponse({"status": "error", "message": "Método no permitido"}, status=405)

def lista_mascotas(request):
    mascotas = Mascota.objects.all().values('id', 'nombre', 'tipo')
    return JsonResponse({"mascotas": list(mascotas)})

@csrf_exempt
def crear_mascota(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            mascota = Mascota.objects.create(
                nombre=data['nombre'],
                tipo=data['tipo']
            )
            return JsonResponse({
                "id": mascota.id,
                "nombre": mascota.nombre
            })
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=400)

def detalle_reserva(request, id):
    try:
        reserva = Reserva.objects.get(id=id)
        return JsonResponse({
            "id": reserva.id,
            "mascota": {
                "id": reserva.mascota.id,
                "nombre": reserva.mascota.nombre
            },
            "fecha_inicio": reserva.fecha_inicio,
            "fecha_fin": reserva.fecha_fin,
            "servicios": reserva.servicios
        })
    except Reserva.DoesNotExist:
        return JsonResponse({"status": "error", "message": "Reserva no encontrada"}, status=404)
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=500)