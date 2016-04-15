/**
 * Created by juandavidcatano on 6/04/16.
 */

export var ES_LANG = [];

let appName = 'CoreApp';

ES_LANG['connectivity'] = {
    'alert' : {
        'title_no_connection' : 'Sin conexión',
        'description_no_connection' : 'Verifique que se encuentre conectado a internet',
        'title_data_connection' : 'Datos Móviles',
        'description_data_connection' : 'Esta consumiendo datos, puede intentar conectarse a internet'
    }
};

ES_LANG['server-data'] = {
    'app' :appName,
    'title' : 'Configurando el ',
    'description' : 'Necesitamos algunos datos para configurar su aplicación',
    'server_url' : 'Servidor (URL)',
    'user' : 'Usuario',
    'password' : 'Contraseña',
    'button' : 'Configurar',
    'errors' : {
        'server_url_empty' : 'La URL del servidor es requerida',
        'user_empty' : 'El usuario es requerido',
        'password_empty' : 'La contraseña es requerida'
    },
    'alert' : {
        'title' : 'Descargando..',
        'message' : 'Estamos descargando información para la configuración',
        'title_error' : 'Ops!',
        'message_error' : 'No se podido establecer la conexión con el servidor'
    }
 };

 ES_LANG['tutorial'] = {
     'app' : appName,
     'title' : 'Bienvenido al ',
     'description' : 'El '+appName+' es una practica herramienta que le permite gestionar sus clientes, ventas, servicios y mucho mas!',
     'ready' : 'Listo para comenzar?',
     'configure' : 'Configurar'
 };