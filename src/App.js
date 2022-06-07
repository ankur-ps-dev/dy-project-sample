import { Component, lazy, Suspense, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Header from "./components/header/header.components";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { GlobalStyle } from "./global.styles";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selectors";
import Spinner from "./components/spinner/spinner.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";

import {setDYContext, getPageName} from "./utils"

const HomePage = lazy(() => import("./pages/homepage/homepage.components"));
const ShopPage = lazy(() => import("./pages/shop/shop.component"));
const SignInAndSignUpPage = lazy(() =>
  import("./pages/sign-in-and-sign-up/sign-in-and-sign-up.components")
);
const CheckoutPage = lazy(() => import("./pages/checkout/checkout.components"));

const WrapRoute = ( {location: {pathname}} ) => {
  useEffect(()=> setDYContext(getPageName(pathname)), [pathname])
  
  return (<div>
<Route exact={true} path="/" component={HomePage} />
<Route path="/shop" component={ShopPage} />
<Route exact={true} path="/checkout" component={CheckoutPage}  />
</div>)};

class App extends Component {
  unsubscriptFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }

      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscriptFromAuth();
  }

  render() {
    return (
      <div>
        <GlobalStyle />
        <Header />
        <Switch>
          <ErrorBoundary>
            <Suspense fallback={<Spinner />}>
              <Route path="/" component={WrapRoute} />
              <Route
                path="/signin"
                render={() =>
                  this.props.currentUser ? (
                    <Redirect to="/" />
                  ) : (
                    <SignInAndSignUpPage />
                  )
                }
              />
            </Suspense>
          </ErrorBoundary>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
