from django.urls import path
from . import views
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('',views.getRoutes),

    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    path('register/',RegisterView.as_view()),
    path('user-list/',views.userList,name="user-list"),
    path('user-details/<int:pk>/',views.userDetails,name="user-details"),
    path('user-update/<int:pk>/',views.userUpdate,name="user-update"),
    path('user-delete/<int:pk>/',views.userDelete,name="user-delete"),
    path('class-userlist/',ClassUserList.as_view(),name='class-user-list'),
    
]


