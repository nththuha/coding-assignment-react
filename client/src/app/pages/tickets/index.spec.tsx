import { MantineProvider } from "@mantine/core";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Tickets from ".";

class ResizeObserver {
  observe() {
    return;
  }
  unobserve() {
    return;
  }
  disconnect() {
    return;
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).ResizeObserver = ResizeObserver;

const mockGetTickets = jest.fn();
const mockCreateTicket = jest.fn();
const mockOpen = jest.fn();
const mockCloseAll = jest.fn();

jest.mock("@/services/domain", () => ({
  getTickets: () => mockGetTickets(),
  createTicket: (desc: string) => mockCreateTicket(desc),
}));

jest.mock("@mantine/modals", () => ({
  modals: {
    open: (...args: unknown[]) => mockOpen(...args),
    closeAll: () => mockCloseAll(),
  },
}));

jest.mock("@/configs/notifications", () => ({
  NotificationType: { SUCCESS: "SUCCESS" },
  pushNotification: jest.fn(),
}));

const renderWithProviders = (ui: React.ReactNode) => {
  return render(
    <MemoryRouter>
      <MantineProvider>{ui}</MantineProvider>
    </MemoryRouter>
  );
};

describe("Tickets", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render successfully", async () => {
    mockGetTickets.mockResolvedValueOnce([]);
    renderWithProviders(<Tickets />);
    expect(await screen.findByText(/tickets/i)).toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: /add ticket/i })
    ).toBeInTheDocument();
  });

  it("should open modal when clicking Add Ticket", async () => {
    mockGetTickets.mockResolvedValueOnce([]);
    renderWithProviders(<Tickets />);
    const addBtn = await screen.findByRole("button", { name: /add ticket/i });
    fireEvent.click(addBtn);
    expect(mockOpen).toHaveBeenCalled();
  });

  it("should render ticket list when tickets exist", async () => {
    mockGetTickets.mockResolvedValueOnce([
      { id: "1", description: "First ticket", completed: false },
      { id: "2", description: "Second ticket", completed: true },
    ]);
    renderWithProviders(<Tickets />);
    expect(await screen.findByText(/first ticket/i)).toBeInTheDocument();
    expect(await screen.findByText(/second ticket/i)).toBeInTheDocument();
  });
});
