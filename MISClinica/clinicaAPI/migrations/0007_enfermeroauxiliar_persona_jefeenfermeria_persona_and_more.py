# Generated by Django 4.1.1 on 2022-09-12 03:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('clinicaAPI', '0006_enfermeroauxiliar_registro_jefeenfermeria_registro_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='enfermeroauxiliar',
            name='persona',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='clinicaAPI.persona'),
        ),
        migrations.AddField(
            model_name='jefeenfermeria',
            name='persona',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='clinicaAPI.persona'),
        ),
        migrations.AddField(
            model_name='medico',
            name='persona',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='clinicaAPI.persona'),
        ),
    ]