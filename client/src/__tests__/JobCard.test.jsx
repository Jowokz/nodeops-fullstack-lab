import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import JobCard from '../components/JobCard.jsx';

it('renders job details and handles selection', async () => {
  const onSelect = vi.fn();
  render(<JobCard job={{ id: '123', status: 'completed', progress: 100 }} onSelect={onSelect} />);

  expect(screen.getByText('Job #123')).toBeInTheDocument();
  await userEvent.click(screen.getByRole('button', { name: /view details/i }));
  expect(onSelect).toHaveBeenCalledWith('123');
});
