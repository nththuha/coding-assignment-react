import { MantineProvider } from "@mantine/core";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TicketDetail from ".";

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

// mock useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ id: "123" }),
  useNavigate: () => mockNavigate,
}));

// mock domain services
const mockGetTicketById = jest.fn();
const mockMarkComplete = jest.fn();
const mockMarkIncomplete = jest.fn();
const mockAssign = jest.fn();
const mockUnassign = jest.fn();

jest.mock("@/services/domain", () => ({
  getTicketById: (id: number) => mockGetTicketById(id),
  markTicketAsComplete: (id: number) => mockMarkComplete(id),
  markTicketAsIncomplete: (id: number) => mockMarkIncomplete(id),
  assignUserToTicket: (ticketId: number, userId: number) =>
    mockAssign(ticketId, userId),
  unassignUserFromTicket: (ticketId: number) => mockUnassign(ticketId),
}));

// wrapper để có Mantine + Router
const renderWithProviders = (ui: React.ReactNode) => {
  return render(
    <MemoryRouter>
      <MantineProvider>{ui}</MantineProvider>
    </MemoryRouter>
  );
};

describe("TicketDetail", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders ticket detail", async () => {
    mockGetTicketById.mockResolvedValueOnce({
      id: 123,
      description: "My first ticket",
      completed: false,
    });

    renderWithProviders(<TicketDetail />);

    expect(await screen.findByText(/my first ticket/i)).toBeInTheDocument();
  });

  it("navigates back when clicking back button", async () => {
    mockGetTicketById.mockResolvedValueOnce({
      id: 123,
      description: "Back test",
      completed: false,
    });

    renderWithProviders(<TicketDetail />);

    const backBtn = await screen.findByRole("button", { name: "" });
    fireEvent.click(backBtn);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("marks ticket as complete", async () => {
    mockGetTicketById.mockResolvedValueOnce({
      id: 123,
      description: "Complete test",
      completed: false,
    });

    renderWithProviders(<TicketDetail />);

    await screen.findByText(/complete test/i);

    const completeBtn = screen.getByText(/mark as complete/i).closest("button");
    expect(completeBtn).toBeInTheDocument();

    if (completeBtn) {
      fireEvent.click(completeBtn);
    }

    await waitFor(() => {
      expect(mockMarkComplete).toHaveBeenCalledWith(123);
    });
  });
});
