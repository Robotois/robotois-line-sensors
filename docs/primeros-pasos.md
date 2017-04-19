# Primeros Pasos con el Módulo de Sensores de Línea
El módulo de Sensores de Línea consiste en un arreglo de 5 sensores ópticos reflectivos (**QRE1113**), los cuales funcionan como entradas digitales. Este módulo se comunica con el **Shield** usando el puerto **IIC**, por lo que no es necesario especificar el puerto al cual se conecta.

El objetivo de este módulo es proporcionar el mecanismo necesario para detectar trayectorias o pistas sobre una plataforma. Con ello se tiene la posibilidad de construir robots **Seguidores de Línea**, que resuelven **laberintos**, o que buscan algún patrón en una plataforma. Con esto se proporcionan elementos fundamentales para aprendizaje de electrónica y programación, ya que en el diseño de este tipo de robots normalmente se implementan algoritmos para búsqueda.

## Instalación de la librería
La instalación de la librería se puede realizar usando el gestor de paquetes [**npm**](https://www.npmjs.com/package/robotois-line-sensor) o descargando la última versión disponible en el repositorio de [**GitHub**](https://github.com/Robotois/robotois-line-sensors):

* Usando *npm* se debe ejecutar el siguiente comando:

```shell
npm install robotois-line-sensor
```

* Para descargar la última versión en *GitHub* se ejecuta la siguiente línea en el *shell*:

```shell
git clone https://github.com/Robotois/robotois-line-sensors.git
```
Para este caso es necesario instalar las dependencias de la librería, lo cual se realiza con lo siguiente (en la ruta del repositorio): `npm install`.

<!-- # Conexión al Shield -->

## Configurar la plataforma
El primer paso es definir la plataforma sobre la cual se moverá el robot, para lo cual se han considerado dos posibles escenarios: la plataforma es blanca y la trayecoria es negra, o una plataforma negra y la trayectoria blanca.

Para configurar el módulo se usa la función `setBackground()`, a la cual se le pasa como parámetro el texto con el fondo de la plataforma:

```javascript
const LineSensors = require('robotois-line-sensors');

const lineSensors = new LineSensors();

lineSensors.setBackground("white");
```
ó:

```javascript
const LineSensors = require('robotois-line-sensors');

const lineSensors = new LineSensors();

lineSensors.setBackground("black");
```
No obstante, el valor por default del color de fondo de la plataforma es `white`, así que solo será necesario usar esta función cuando el color de fondo sea negro.

## Mediciones
Para obtener mediciones de manera sencilla, en esta librería se cuenta con mediciones por eventos, es decir que se cada vez que se tenga una nueva medición se dispara un evento con las mediciones actuales.

Para comprender el funcionamiento de este módulo, se considerará que las mediciones se realizan sobre una plataforma blanca y una trayectoria de color negro.

Para utilizar las mediciones por eventos, éstos se deben habilitar con la función `enableEvents()`. En el siguiente ejemplo se muestra cómo utilizar los eventos de mediciones:

```javascript
const LineSensors = require('robotois-line-sensors');

const lineSensors = new LineSensors();

lineSensors.enableEvents();

lineSensors.on('medicion', (_line, _sensors) => {
  console.log(`Linea: ${_line}, Sensores: ${_sensors.toString(16)}`);
});
```
El resultado del ejemplo anterior es similar al siguiente:
```text
Linea: 0, Sensores: 1
Linea: 50, Sensores: 3
Linea: 100, Sensores: 2
Linea: 100, Sensores: 2
Linea: 200, Sensores: 4
Linea: 200, Sensores: 4
Linea: 200, Sensores: 4
Linea: 300, Sensores: 8
Linea: 300, Sensores: 8
Linea: 300, Sensores: 8
Linea: 350, Sensores: 18
Linea: 400, Sensores: 10
Linea: 400, Sensores: 10
```
Como se puede observar, el estado de los sensores se obtienen a través de dos tipos de valores `line` y `sensors`. El valor de línea (`line`), considera un rango de `0-400` en donde los valores mas cercanos a `0` indican que la trayectoria se encuentra del lado izquierdo y los valores cercanos a `400` indican que la trayectoria está a la derecha. Consecuentemente, el valor `200` implica que la trayectoria se encuentra justo en el centro del módulo.

El valor medido, que en el ejemplo se llama `sensors`, proporciona el valor hexadecimal equivalente a el estado actual de los sensores, en donde se considera que los sensores son un arreglo binario y cuyo estado puede ser `0-1`. En este caso el estado de los sensores se representan a través de **5 bits**. Para obtener una representación más intuitiva, se cambiará el código que imprime en consola los valores de la medición:

```javascript
const LineSensors = require('robotois-line-sensors');

const lineSensors = new LineSensors();

lineSensors.enableEvents();

lineSensors.on('medicion', (_line, _sensors) => {
  console.log(`Linea: ${_line}, Sensores: ${lineSensors.sensorsToString(_sensors)}`);
});
```

```text
Linea: 0, Sensores: 00001
Linea: 100, Sensores: 00010
Linea: 100, Sensores: 00010
Linea: 150, Sensores: 00110
Linea: 200, Sensores: 00100
Linea: 200, Sensores: 00100
Linea: 200, Sensores: 00100
Linea: 300, Sensores: 01000
Linea: 300, Sensores: 01000
Linea: 300, Sensores: 01000
Linea: 350, Sensores: 11000
Linea: 350, Sensores: 11000
Linea: 400, Sensores: 10000
Linea: 400, Sensores: 10000
```
Por todo lo anterior, este método para obtener mediciones de los sensores es muy útil para diversas aplicaciones, ya que es posible implementar sistemas de control tipo **PI** o **PID** que son muy comunes en robots de competencias, es posible implementar algoritmos para realizar búsquedas específicas como la resolución de laberintos, solo por mencionar algunos casos.
