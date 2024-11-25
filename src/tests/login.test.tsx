import {render, screen, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom';
import Login from '../components/Login';
import { toast } from "react-toastify";
import { Provider } from "react-redux";
import { store } from '../redux/store';
import { GoogleOAuthProvider } from "@react-oauth/google";

const setUp = (screenType: string) => {
  const setScreenTypeMock = jest.fn();
  const KEY = "123456testkey"
  return render(
    <Provider store={store}>
      <GoogleOAuthProvider clientId={KEY}>
      <Login screenType={screenType} setScreenType={setScreenTypeMock} />
      </GoogleOAuthProvider>
    </Provider>
  )
};

describe("Login Tests.", () => { 

  setUp("login");

  const email = screen.getByPlaceholderText('Type email here');
  const password = screen.getByPlaceholderText('Type password here');
  const normalButton = screen.getByTestId('normalSignBtn');
  
  test("Empty values test.", () => {
    //@ts-ignore
    jest.spyOn(toast, "error").mockImplementation(() => {});
    fireEvent.click(normalButton);
    expect(toast.error).toHaveBeenCalledWith("Email and password is required.");
    toast.dismiss();
  });

  test("Wrong credentials test.", () => {
    //@ts-ignore
    jest.spyOn(toast, "error").mockImplementation(() => {});
    fireEvent.change(password, { target: { value: '123456' } });
    fireEvent.change(email, { target: { value: 'test@email.com' } });
    expect(password).toHaveValue('123456')
    expect(email).toHaveValue('test@email.com')
    fireEvent.click(normalButton);
    expect(toast.error);
    toast.dismiss();
  });

  test("Correct credentials test.", () => {
    //@ts-ignore
    jest.spyOn(toast, "success").mockImplementation(() => {});
    fireEvent.change(password, { target: { value: '1234567' } });
    fireEvent.change(email, { target: { value: 'test@email.com' } });
    expect(password).toHaveValue('1234567')
    expect(email).toHaveValue('test@email.com')
    fireEvent.click(normalButton);
    expect(toast.success);
    toast.dismiss();
  });

})
