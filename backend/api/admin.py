# from django.contrib import admin
# from .models import User

# # Register your models here.
# admin.site.register(User)
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

class CustomUserAdmin(UserAdmin):
    list_display = ('id', 'username', 'email', 'is_active', 'profile_img','date_joined')
    list_display_links = ('id', 'username')  

# Register your models here.
admin.site.register(User, CustomUserAdmin)
