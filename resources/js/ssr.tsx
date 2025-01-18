import ReactDOMServer from 'react-dom/server';
import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { RouteContext } from '@/Hooks/useRoute';
import { ThemeProvider } from '@/Components/ThemeProvider';
import route from 'ziggy-js';

const appName = 'Laravel';

createServer(page =>
  createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    title: title => `${title} - ${appName}`,
    resolve: name =>
      resolvePageComponent(
        `./Pages/${name}.tsx`,
        import.meta.glob('./Pages/**/*.tsx'),
      ),
    setup: ({ App, props }) => {
      // @ts-ignore - Ziggy types are not perfect with SSR
      const routeFn = (name?: string, params?: any) => route(name, params);
      return (
        <RouteContext.Provider value={routeFn}>
          <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <App {...props} />
          </ThemeProvider>
        </RouteContext.Provider>
      );
    },
  }),
); 