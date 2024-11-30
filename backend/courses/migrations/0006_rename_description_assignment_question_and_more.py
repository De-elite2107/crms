# Generated by Django 5.1.3 on 2024-11-29 00:30

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0005_alter_resource_image'),
    ]

    operations = [
        migrations.RenameField(
            model_name='assignment',
            old_name='description',
            new_name='question',
        ),
        migrations.CreateModel(
            name='AssignmentResponse',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('submission_date', models.DateTimeField(auto_now_add=True)),
                ('response_text', models.TextField()),
                ('assignment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='responses', to='courses.assignment')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='responses', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('assignment', 'user')},
            },
        ),
    ]
