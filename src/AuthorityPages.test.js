import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AuthorityPage from './components/pages/AuthorityPage';
import authorityPages from './data/authorityPages.json';

test('defines a unique, substantive set of authority pages', () => {
  const paths = authorityPages.map((page) => page.path);

  expect(authorityPages).toHaveLength(10);
  expect(new Set(paths).size).toBe(paths.length);
  expect(paths).toContain('/ai-development-company-mumbai/');
  expect(paths).toContain('/ai-agent-development/');
  expect(paths).toContain('/case-studies/proofit-property-inspection/');

  authorityPages.forEach((page) => {
    expect(page.title.length).toBeGreaterThan(12);
    expect(page.description.length).toBeGreaterThan(80);
    expect(page.sections.length).toBeGreaterThanOrEqual(3);
    expect(page.faqs.length).toBeGreaterThanOrEqual(2);
  });
});

test('renders the Mumbai landing page with metadata and internal links', async () => {
  render(
    <MemoryRouter initialEntries={['/ai-development-company-mumbai/']}>
      <AuthorityPage />
    </MemoryRouter>
  );

  expect(screen.getByRole('heading', { name: 'AI Development Company in Mumbai', level: 1 })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'AI agent development' })).toHaveAttribute('href', '/ai-agent-development/');
  expect(screen.getByRole('link', { name: /Guided property inspection experience/i })).toHaveAttribute(
    'href',
    '/case-studies/proofit-property-inspection/'
  );

  await waitFor(() => {
    expect(document.title).toBe('AI Development Company in Mumbai | AlphaCodeAI');
    expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://www.alphacodeai.com/ai-development-company-mumbai/'
    );
  });
});
