import { describe, it, expect, beforeEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import App from './App';

// App mounts its own BrowserRouter, so routes are driven through window.history
// rather than MemoryRouter.
const renderAt = (path: string) => {
  window.history.pushState({}, '', path);
  return render(<App />);
};

describe('App routing', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/');
  });

  it('serves the Countries section at /countries/canada', async () => {
    renderAt('/countries/canada');

    await waitFor(() => {
      expect(window.location.pathname).toBe('/countries/canada');
    });
  });

  it('redirects the legacy /canada URL into the Countries section', async () => {
    renderAt('/canada');

    await waitFor(() => {
      expect(window.location.pathname).toBe('/countries/canada');
    });
  });

  it('redirects the Countries index to Canada until an index page exists', async () => {
    renderAt('/countries');

    await waitFor(() => {
      expect(window.location.pathname).toBe('/countries/canada');
    });
  });

  it('serves the regulation tracker at its new /regulation path', async () => {
    renderAt('/regulation');

    await waitFor(() => {
      expect(window.location.pathname).toBe('/regulation');
    });
  });

  it('redirects legacy /countries/:code links for codes no country claims', async () => {
    // 'jp' has a regulation entry but no country dataset, so it still forwards.
    renderAt('/countries/jp');

    await waitFor(() => {
      expect(window.location.pathname).toBe('/regulation/jp');
    });
  });

  it('serves the US country page now that a US dataset exists', async () => {
    // /countries/us previously forwarded to /regulation/us. Adding the dataset
    // transfers ownership of the URL to the Countries section, by design.
    renderAt('/countries/us');

    await waitFor(() => {
      expect(window.location.pathname).toBe('/countries/us');
    });
  });

  it('keeps an explicit country page ahead of the legacy redirect', async () => {
    // /countries/canada must resolve to the country page, not fall through to
    // the legacy /countries/:code redirect that catches every other code.
    renderAt('/countries/canada');

    await waitFor(() => {
      expect(window.location.pathname).not.toBe('/regulation/canada');
    });
  });
});
