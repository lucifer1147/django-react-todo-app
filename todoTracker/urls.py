from django.urls import path
from todoTracker import views

urlpatterns = [
    path('', views.OverView, name='overview'),
    path('task-list/', views.TaskList, name='task-list'),
    path('task-detail/<str:id>/', views.TaskDetail, name="task-detail"),
    path('task-create/', views.TaskCreate, name="create-task"),
    path('task-update/<str:id>/', views.TaskUpdate, name="update-task"),
    path('task-delete/<str:id>/', views.TaskDelete, name="delete-task")
]
