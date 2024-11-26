from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from django.contrib.auth.models import BaseUserManager

class User(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Administrator'),
        ('lecturer', 'Lecturer'),
        ('student', 'Student'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default="student")

    def __str__(self):
        return self.username

class CustomUserManager(BaseUserManager):
    def create_user(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError("The Username must be set")
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(username, password, **extra_fields)

class Course(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    instructor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='courses')

    def save(self, *args, **kwargs):
        # Check if the instructor has an admin role
        if self.instructor.role == 'student':
            raise ValidationError("Only users with 'admin' and 'lecturer' role can be assigned as instructors.")
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

class Resource(models.Model):
    RESOURCE_TYPE = (
        ('document', 'Document'),
        ('video', 'Video'),
        ('link', 'Link'),
    )
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='resources')
    resource_type = models.CharField(max_length=50, choices=RESOURCE_TYPE)  # e.g., document, video, link
    file = models.FileField(upload_to='resources/')
    image = models.ImageField(upload_to='images/')
    url = models.URLField(blank=True, null=True)
    title = models.CharField(max_length=200)
    description = models.TextField()

    def __str__(self):
        return self.title

class Assignment(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='assignments')
    title = models.CharField(max_length=200)
    description = models.TextField()
    due_date = models.DateTimeField()

    def __str__(self):
        return self.title