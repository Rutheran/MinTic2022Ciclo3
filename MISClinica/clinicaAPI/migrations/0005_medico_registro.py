# Generated by Django 4.1.1 on 2022-09-12 02:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('clinicaAPI', '0004_alter_registro_signosvitales'),
    ]

    operations = [
        migrations.AddField(
            model_name='medico',
            name='registro',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='clinicaAPI.registro'),
            preserve_default=False,
        ),
    ]
