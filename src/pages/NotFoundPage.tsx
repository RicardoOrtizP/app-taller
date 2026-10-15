export const NotFoundPage = () => {
  return (
    <section className="py-20 px-4 dark:bg-gray-900 min-h-screen flex items-center justify-center p-4">
      <div className="py-20 px-4 text-center">
        {/* Codigo de error */}
        <div className="text-9xl font-bold text-blue-600 dark:text-blue-400 mb-4">
          404
        </div>
        {/* titulo */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Pagina No Encontrada
        </h1>
        {/* Descripcion */}
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Sorry, we couldn't find the page you're looking for.
        </p>
        {/* Botón de accion */}
        <a
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go back home
        </a>
      </div>
    </section>
  );
};
