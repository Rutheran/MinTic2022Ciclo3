# Generated by Django 4.1.1 on 2022-09-24 04:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clinicaAPI', '0013_alter_medico_registro'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='enfermeroauxiliar',
            name='registro',
        ),
        migrations.RemoveField(
            model_name='jefeenfermeria',
            name='registro',
        ),
        migrations.AlterField(
            model_name='familiar',
            name='id',
            field=models.BigIntegerField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='medico',
            name='id',
            field=models.BigIntegerField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='paciente',
            name='id',
            field=models.BigIntegerField(primary_key=True, serialize=False),
        ),
        migrations.DeleteModel(
            name='Registro',
        ),
    ]
