from .models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model =User
        fields=['id','username','email','profile_img','is_active']
        # fields = '__all__'
       
    def create(self, validated_data):
        password=validated_data.pop('password',None)
        instance=self.Meta.model(**validated_data)  
        if password:
            instance.set_password(password)
        instance.save()
        return instance