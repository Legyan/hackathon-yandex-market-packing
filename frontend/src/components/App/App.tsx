import { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import MainPage from '../../pages/MainPage/MainPage';
import TableSelectionPage from '../../pages/TableSelectionPage/TableSelectionPage';
import PrinterSelectionPage from '../../pages/PrinterSelectionPage/PrinterSelectionPage';
import OrderPage from '../../pages/OrderPage/OrderPage';
import OrderCompletedPage from '../../pages/OrderCompletedPage/OrderCompletedPage';
import ProblemsPage from '../../pages/ProblemsPage/ProblemsPage';
import AnotherProblemsPage from '../../pages/AnotherProblemsPage/AnotherProblemsPage';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const App: FC = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path='/' exact>
          <MainPage />
        </Route>
        <Route path='/table' exact>
          <TableSelectionPage />
        </Route>
        <Route path='/printer' exact>
          <PrinterSelectionPage />
        </Route>
        <Route path='/order' exact>
          <OrderPage />
        </Route>
        <Route path='/order/completed' exact>
          <OrderCompletedPage />
        </Route>
        <Route path='/problems' exact>
          <ProblemsPage />
        </Route>
        <Route path='/problems/another' exact>
          <AnotherProblemsPage />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
