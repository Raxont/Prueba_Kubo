**¿Cuál es el propósito de module.exports?**
Es una forma en Node.js de exportar funciones, objetos o variables desde un archivo para que puedan ser importados en otros módulos mediante **require()** o **import**.

**¿Qué es un middleware?**
Es una función que se ejecuta entre la petición del cliente y la respuesta del servidor. 

**¿Cuál es la diferencia entre código bloqueante y código no bloqueante?**

- **Código bloqueante:** Detiene la ejecución hasta que la operación finaliza.
- **Código no bloqueante:** Permite continuar la ejecución sin esperar que termine una operación.

**¿Qué biblioteca de JavaScript usaría para manejar datos en tiempo real?**
La más común es **Socket.io**, que permite comunicación bidireccional en tiempo real mediante WebSockets. Este lo use para crear un chat a tiempo real en una pagina de ventas artesanales.

**¿Cuál es la principal ventaja de trabajar un proyecto dockerizado?**
La portabilidad y consistencia entre entornos, ya que el código se ejecuta en un contenedor aislado que funciona igual en cualquier máquina.

**¿Cuál es la diferencia entre una imagen y un volumen en Docker?**

- **Imagen:** Es la plantilla inmutable que se usa para crear contenedores.
- **Volumen:** Es el almacenamiento persistente para que los datos sigan ahi cuando el contenedor se detiene o se elimina.

**¿Con qué herramienta se puede orquestar un proyecto con múltiples imágenes en Docker?**
Docker Compose o Kubernetes. Docker Compose es más simple para entornos de desarrollo, mientras que Kubernetes es para producción a gran escala.

**¿Cuál es la principal ventaja de trabajar con un clúster de Kubernetes?**
La escalabilidad automática. Kubernetes administra múltiples contenedores en varios nodos, asegurando que las aplicaciones se mantengan en ejecución incluso si algunos fallan.

