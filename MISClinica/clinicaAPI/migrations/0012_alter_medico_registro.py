# Generated by Django 4.1.1 on 2022-09-24 04:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clinicaAPI', '0011_alter_paciente_birthday'),
    ]

    operations = [
        migrations.AlterField(
            model_name='medico',
            name='registro',
            field=models.CharField(max_length=50),
        ),
    ]
