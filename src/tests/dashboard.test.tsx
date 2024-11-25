import {render, screen, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from '../redux/store';
import DashBoard from '../pages/DashBoard';
import ViewQuiz from '../pages/ViewQuiz';
import CreateQuiz from '../pages/CreateQuiz';
import MyQuestions from '../pages/MyQuestions';
import '../assets/kidImg.webp'



describe("Dashboard Tests.", () => { 

    beforeEach(() => {
        render(
            <Provider store={store}>
          <MemoryRouter initialEntries={["/dashboard"]}>
            <Routes>
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/quiz" element={<ViewQuiz />} />
              <Route path="/create-quiz" element={<CreateQuiz />} />
              <Route path="/my-question" element={<MyQuestions />} />
            </Routes>
          </MemoryRouter>
          </Provider>
        );
      });

test("Dashboard view test", () => {
    expect(screen.getByText("My Dashboard")).toBeInTheDocument();
    expect(screen.getByTestId("Home")).toBeInTheDocument();
    expect(screen.getByTestId("Browse All Quiz")).toBeInTheDocument();
    expect(screen.getByTestId("Create Quiz")).toBeInTheDocument();
    expect(screen.getByTestId("My Questions")).toBeInTheDocument();
});

  test("All quiz page redirect test.", async() => {
    fireEvent.click(screen.getByTestId("Browse All Quiz"));
    await new Promise(resolve => setTimeout(resolve, 1))
    expect(screen.getByText("All Quiz")).toBeInTheDocument();
  });

})
