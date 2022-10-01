# Generated by Django 4.1.1 on 2022-09-28 02:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clinicaAPI', '0016_remove_medico_paciente_medico_especialidad'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='enfermeroauxiliar',
            name='paciente',
        ),
        migrations.AddField(
            model_name='enfermeroauxiliar',
            name='password',
            field=models.CharField(default=1, max_length=30),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='medico',
            name='id',
            field=models.BigIntegerField(primary_key=True, serialize=False),
        ),
    ]