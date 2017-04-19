# Mediciones Específicas
En la sección anterior se mostró la manera de tomar mediciones de los sensores usando eventos, lo cual puede ser útil como base para proyectos sencillos. Sin embargo, para ciertas aplicaciones se requiere realizar mediciones en determinados escenarios. Por lo que en esta librería se proporcionan las funciones de medición de manera individual.

## Función `readSensors()`
Esta función obtiene el estado actual de los sensores en forma digital, el cual se representa en un valor numérico entero. El valor numérico se forma considerando los sensores como un arreglo binario cuyo estado puede ser `0-1`. De hecho, esta función es utilizada cuando se obtienen mediciones por eventos, en donde se considera un arreglo con **5 bits**. Por ello el siguiente ejemplo arroja valores similares al ejemplo mostrado en la sección anterior:

```javascript
const LineSensors = require('robotois-line-sensors');

const lineSensors = new LineSensors();

setInterval(() => {
  console.log(`Sensores: ${lineSensors.sensorsToString(lineSensors.readSensors())}`);
},500);
```

El resultado de ejecutar este ejemplo muestra el valor de los sensores en forma binaria, en donde el valor `1` indica que ese sensor ha detectado la trayectoria o simplemente esta activo, y el valor `0` indica que ese sensor no esta detectando nada. El siguiente resultado se obtuvo al mover el módulo de sensores de izquierda a derecha y viceversa sobre una línea negra en una plataforma de color blanco:
```text
Sensores: 10000
Sensores: 01000
Sensores: 01100
Sensores: 00100
Sensores: 00010
Sensores: 00001
Sensores: 00001
Sensores: 00010
Sensores: 00010
Sensores: 00100
Sensores: 00100
Sensores: 01000
Sensores: 01000
Sensores: 11000
Sensores: 10000
```

## Función `readLine()`

Esta función permite obtener el estado de los sensores, pero en este caso el valor numérico que devuelve tiene un rango de `0-400`, en donde los valores cercanos a `0` indican que la trayectoria o línea se encuentra a la izquierda del módulo y los valores cercanos a `400` indican que la trayectoria está a la derecha del módulo. Cuando se tiene el valor `200` implica que la trayectoria se encuentra en el centro del módulo.

Normalmente, en aplicaciones donde se tiene que seguir una trayectoria, el objetivo principal es que el módulo siempre se mantenga centrado sobre la trayectoria para no perder la ruta. Un ejemplo de cómo utilizar esta función es el siguiente:

```javascript
const LineSensors = require('robotois-line-sensors');

const lineSensors = new LineSensors();

setInterval(() => {
  console.log(`Sensores: ${lineSensors.readLine()}`);
},500);
```
En el resultado obtenido, nuevamente se movió el módulo de izquierda a derecha y viceversa, con el objetivo de mostrar cómo cambia el valor que devuelve la función `readLine()`:

```text
Sensores: 0
Sensores: 100
Sensores: 200
Sensores: 300
Sensores: 300
Sensores: 400
Sensores: 400
Sensores: 400
Sensores: 400
Sensores: 300
Sensores: 300
Sensores: 250
Sensores: 200
Sensores: 150
Sensores: 100
Sensores: 100
Sensores: 100
Sensores: 50
Sensores: 0
```

Este resultado es muy útil en el sentido que debido a que se tiene un valor numérico acotado en un rango, es posible implementar algoritmos de control de manera fácil, por ejemplo para que el robot siga una trayectoria.

## Función `readSensor()`
Esta función obtiene el estado actual de un sensor en particular, el valor obtenido del estado del sensor, que puede ser `0-1` que indica si se está detectando la trayectoria o no. Un ejemplo simple sería el siguiente:

```javascript
const LineSensors = require('robotois-line-sensors');

const lineSensors = new LineSensors();

setInterval(() => {
  console.log(`Sensor #1: ${lineSensors.readSensor(1)}`);
}, 1000);

```

En este ejemplo el resultado es similar al siguiente:

```text
Sensor #1: 0
Sensor #1: 0
Sensor #1: 1
Sensor #1: 1
Sensor #1: 1
Sensor #1: 0
Sensor #1: 0
Sensor #1: 0
```
Como se observa, esta función es muy útil para evaluar el estado de un sensor en particular, sin embargo no se recomienda usarlo para evaluar el estado de varios sensores al mismo tiempo por razones de rendimiento y redundancia. Esto debido a que internamente la función `readSensor()` obtiene el estado de todos los sensores y posteriormente evalúa el estado del sensor que se ha especificado. Por lo que, para evaluar el estado de varios sensores, se recomienda usar operaciones a nivel de bits en combinación con la función **`readSensors()`**.

Una manera sencilla de resolver este problema es la siguiente:

```javascript
const LineSensors = require('robotois-line-sensors');

const lineSensors = new LineSensors();

function sensorStatus(i, sensors) {
  return (sensors >> (i - 1 )) & 0x01;
}

setInterval(() => {
  const sensors = lineSensors.readSensors();
  console.log(`Sensor #1: ${sensorStatus(1, sensors)}`);
}, 1000);
```
