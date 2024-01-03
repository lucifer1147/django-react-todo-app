from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TodoSerializer

from .models import Todo

# Create your views here.

@api_view(['GET'])
def OverView(request):
    api_urls = {
        'List': '/task-list/',
        'Detail-View': '/task-detail/<str:id>',
        'Create': '/task-create/',
        'Update': '/task-update/<str:id>',
        'Delete': '/task-delete/<str:id>'
    }

    return Response(api_urls)

@api_view(['GET'])
def TaskList(request):
    tasks = Todo.objects.all().order_by('-id')
    serializer = TodoSerializer(tasks, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def TaskDetail(request, id):
    task = Todo.objects.filter(id=id)[0]
    serializer = TodoSerializer(task)

    return Response(serializer.data)


@api_view(['POST'])
def TaskCreate(request):
    serializer = TodoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['POST'])
def TaskUpdate(request, id):
    task = Todo.objects.filter(id=id)[0]
    serializer = TodoSerializer(instance=task, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['DELETE'])
def TaskDelete(request, id):
    task = Todo.objects.filter(id=id)[0]
    task.delete()

    return Response('Item successfully deleted!')
