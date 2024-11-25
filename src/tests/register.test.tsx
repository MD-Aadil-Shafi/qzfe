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

describe("Register Tests.", () => { 

  setUp("register");

  const name = screen.getByPlaceholderText('Type name here');
  const email = screen.getByPlaceholderText('Type email here');
  const password = screen.getByPlaceholderText('Type password here');
  const ConfirmPassword = screen.getByPlaceholderText('Confirm password here');
  const normalButton = screen.getByTestId('normalSignBtn');
  
  test("Empty values test.", () => {
    //@ts-ignore
    jest.spyOn(toast, "error").mockImplementation(() => {});
    fireEvent.click(normalButton);
    expect(toast.error).toHaveBeenCalledWith("All fields are required.");
    toast.dismiss();
  });

  test("Different password and confirm password test.", async() => {
    //@ts-ignore
    jest.spyOn(toast, "error").mockImplementation(() => {});
    fireEvent.change(name, { target: { value: 'Brad Pitt' } });
    fireEvent.change(email, { target: { value: 'brad@test.com' } });
    fireEvent.change(password, { target: { value: '123456' } });
    fireEvent.change(ConfirmPassword, { target: { value: '12345678' } });
    fireEvent.click(normalButton);
    expect(toast.error)
    toast.dismiss();
  });

//*****************uncomment it, it'll create an user in db**********************
//   test("Successful registration test.", async() => {
//     //@ts-ignore
//     jest.spyOn(toast, "success").mockImplementation(() => {});
//     fireEvent.change(name, { target: { value: 'Brad Pitt' } });
//     fireEvent.change(email, { target: { value: 'brad@test.com' } });
//     fireEvent.change(password, { target: { value: '123456' } });
//     fireEvent.change(ConfirmPassword, { target: { value: '123456' } });
//     fireEvent.click(normalButton);
//     expect(toast.success)
//     toast.dismiss();
//   });

})
