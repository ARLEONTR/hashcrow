'''
Django Urls
'''
from django.urls import path
from . import views

urlpatterns = [
    path('hashurl/', views.hashurl),
    path('showpage/',views.showpage),
    path('listpages/', views.listpages),
]
