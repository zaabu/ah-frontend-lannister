import React from "react";
import { mount} from "enzyme";
import UserEmail,{PasswordReset} from "../../components/auth/passwordReset/passwordResetPage";

import { Provider } from "react-redux";
import InvokeReset from "../../actions/authActions/passswordResetAction";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../../reducers/rootReducer";
import Button from "../../components/common/button";
import Input from "../../components/common/input";

const store = createStore(rootReducer, applyMiddleware(thunk));

describe("send email to user", () => {
  let component;

  beforeEach(() => {
    component = mount(
      <Provider store={store}>
        <UserEmail
          dispatch={InvokeReset({ user: { email: "", url: "sdfgds" } })}
        />
      </Provider>
    );
  });

  it("should submit user email without failing", () => {
    component.find("form").simulate("submit", {
      target: { email: { value: "dsfdghfdsfwerg" } }
    });
  });
});

describe("after sending email",()=>{
  let component;
  const newProps = jest.fn();
  const push=jest.fn();
  const url={history:{push}};
  beforeEach(() => {
    component = mount(<PasswordReset componentWillReceiveProps={newProps} {...url}/>);
  });
  it("should render a success div", () => {
    testRender(component, newProps,200);
  });
  it("should render a fail div", () => {
    testRender(component, newProps,404);

  });
  it("should render to signup on clicking on the fail div", () => {
    component.setProps({user:{status:404}});
    component.update();
    component.find("button").simulate("click", {});
  });
});
it("test  button", () => {
  let component=mount(<Button/>);
  component.setProps({user:{status:404}});
  component.update();
  component.find("button").simulate("click", {});
});
it("test input ", () => {
  let component=mount(<Input btnClass={"primary"}/>);
  component.update();
});
export function testRender(component, newProps,status) {
  component.setProps({ user: { status} });
  component.update();
  expect(newProps).toBeCalled;
}

