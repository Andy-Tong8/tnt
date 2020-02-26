from django.urls import path
from . import views

urlpatterns = [
    path('',views.index),
    path('dkp-system',views.dkp_system),
    path('faq',views.faq),
    path('json',views.json),
    path('darkmode',views.darkmode),
]
