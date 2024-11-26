from django.contrib import admin
from .models import *
from django import forms

admin.site.site_header = "Course Resources Management System"
admin.site.site_title = "Admin Title"
admin.site.index_title = "Welcome to Your CRMS Admin Panel"

class ModelAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'role', 'is_active', 'is_superuser')  # Columns to display
    list_filter = ('is_active', 'is_superuser', 'is_staff', 'role')
    search_fields = ('username', 'email', 'role')

class CourseForm(forms.ModelForm):
    class Meta:
        model = Course
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Limit queryset for instructor field to only users with admin role
        self.fields['instructor'].queryset = User.objects.filter(role='admin') | User.objects.filter(role='lecturer')

class CourseAdmin(admin.ModelAdmin):
    form = CourseForm

# Register your models here.
admin.site.register(User, ModelAdmin)
admin.site.register(Course, CourseAdmin)
admin.site.register(Resource)
admin.site.register(Assignment)