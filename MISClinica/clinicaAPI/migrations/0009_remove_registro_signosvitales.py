# Generated by Django 4.1.1 on 2022-09-12 03:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('clinicaAPI', '0008_alter_registro_signosvitales'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='registro',
            name='signosVitales',
        ),
    ]